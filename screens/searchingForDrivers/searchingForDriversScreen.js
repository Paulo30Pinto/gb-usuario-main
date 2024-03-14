import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import MapViewDirections from 'react-native-maps-directions';
import { Key } from "../../constants/key";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { Alert } from 'react-native';
import { useEffect } from 'react'
import { services } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { requestSlice } from '../../redux/features/request/requestSlice';
import { loginSlice } from '../../redux/features/login/loginSlice';
import { useState } from 'react';
import * as Location from 'expo-location';
import * as Geolib from 'geolib';
import messaging from '@react-native-firebase/messaging';
import  io from 'socket.io-client';

const { width } = Dimensions.get('window');

const SearchingForDriversScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const request = useSelector((state) => state.request);
    const requestInfo = request.requestInfo?.data;

    console.log("REQINFO", requestInfo);

    const [screen, setScreen] = useState("SelectCab");
    const [userLocation, setUserLocation] = useState(null);
    const [nearbyCoordinates, setNearbyCoordinates] = useState([]);
    const [message, setMessage] = useState('');
  const [receiveMessage, setReceivedMessage] = useState('');
  const [driverList, setDriverList] = useState([]);
  const [orderedList, setOrderedList] = useState([]);

  const login = useSelector((state) => state.login);
  const loggedUser = login.loggedUser;
  const socket = io('http://192.168.1.3:4000');
    
      const allCoordinates = [
        { 
          driverId: 1,
          latitude: 37.7749,
          longitude: -122.4194
        },
        { 
            driverId: 2,
            latitude: 52.516272,
            longitude: 13.377722
          },
          { 
            driverId: 3,
            latitude: 51.518,
            longitude: 7.45425
          }, 
          {
            driverId: 4,
            latitude: -8.958333,
            longitude: 13.214444,
          }
      ];

      const maxDistance = 5000; // 5 Kilometers

       async function filterNearbyCoordinates(userCoordinates, allCoordinates) {
        const nearbyCoordinates = Geolib.orderByDistance(userCoordinates, allCoordinates);
        setOrderedList(nearbyCoordinates);
        console.log('Nearby Coordinates: ', nearbyCoordinates);
        return nearbyCoordinates;
      }
    
      //filterNearbyCoordinates(userLocation, allCoordinates);

      async function getLocation() {
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        const coords = {lat:currentLocation.coords.latitude, lng: currentLocation.coords.longitude};
    
        return coords;
      }

      

    useEffect(() => {
        if(requestUserPermission())
              {
                  messaging().getToken().then(token => {
                      console.log(token);
                  });
              }
              else
              {
                  console.log("Failed token status", authStatus);
              }
      

        socket.on('initialDriverList', (initialList) => {
            setDriverList(initialList);
            console.log("Initial List", initialList);
          });

          

        getLocation().then((coords) => {

            socket.emit('sendCoordinates', { driverId: loggedUser.id, lat: coords.lat, lng: coords.lng, token: 'dSG1eBKISAyKs2R8VileMm:APA91bHIOTUfIqa_NgyIUb1Cq4AdSXXbjDtp6mtH-PR2SKDMO5QORRJCwvnJXt5uSvKfDDO4rtOkjY_aoQ-4zl9BO44LLff6xMhS2TPfUwO-CMYdvnPVwS0XNtT10PJBUMP2TAYKfEi5'  });

            socket.on("updatedDriverList", (updateList) => {
                setDriverList(updateList);
                console.log("Update List", updateList);
              })


              setInterval(() => {
                filterNearbyCoordinates(coords, driverList).then((nearbyCoordinates)=> {
                    nearbyCoordinates.forEach(async function(arrayItem){
                        console.log(arrayItem.token);
                        const response = await services.notify.notify({
                            "token": arrayItem.token,
                        });
                
                    })
                })
              }, 2000);
              
            setUserLocation(coords);

            Alert.alert("Coordenadas: ", JSON.stringify(coords));
            console.log("User Location ", coords);
        })
              // Check whether an initial notification is available
          messaging()
          .getInitialNotification()
          .then(async (remoteMessage) => {
            if (remoteMessage) {
              console.log(
                'Notification caused app to open from quit state:',
                remoteMessage.notification,
              ); 
            }
          });
      
          messaging().onNotificationOpenedApp(async (remoteMessage) => {
              console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
              );
              navigation.navigate(remoteMessage.data.type);
            });
      
            // Register background handler
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
          console.log('Message handled in the background!', remoteMessage);
        });
        
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
          console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
          navigation.navigate("RideStarted");
        });
      
      
          return () => {
              socket.disconnect();
          }

        /*const stopCounter = () => {
            clearInterval(myinterval);
        }*/

        
        /*return () => stopCounter();*/
        return unsubscribe;
    }, []);

    const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

    /*const intervalId = setInterval(() => {
        console.log('Procurando por motoristas');
        Alert.alert("Localizar Motoristas", "Nenhum motorista encontrado");
        stopCounter();
    }, 120000);*/


    /*const stopCounter = () => {
        console.log("Parou");
        clearInterval(myinterval);
        return navigation.navigate("SelectCab");
    }*/

    const cancelRide = async() => {

        const response = await services.request.updateRequestInfo(requestInfo?.id,
            {
                date: new Date(),
                status: "cancelado",
                location: "353534543",
                id_client: requestInfo.id_client,//loggedUser.id,
                id_cistern: requestInfo.id_cistern,
                waterType: requestInfo.waterType,
                id_driver: null
                
            }
        );

        if (response?.status == 200) {
            console.log("REQUEST INFO", response?.data?.data);
            dispatch(requestSlice.actions.setRequestInfo(response?.data?.data));
             // Redireciona para a tela de início da corrida
        }

        navigation.navigate("SelectCab");

    }

    const checkRequeststatus = async () => {

        console.log(requestInfo);

        const response = await services.request.getRequest({
            "id": requestInfo?.id
        });

        if (response?.status == 200) {
            if (response?.data?.data?.status === "aceite") {
                setScreen("RideStarted");

                stopCounter();
            }
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {/*{directionInfo()}*/}
                {header()}
            </View>
            {searchingDriverSheet()}
        </SafeAreaView>
    )

    

    function searchingDriverSheet() {
        return (
            <Animatable.View
                animation="slideInUp"
                iterationCount={1}
                duration={1500}
                style={{ ...styles.bottomSheetWrapStyle, }}
            >

                {searchingInfo()}
                {indicator()}
                {loadingRequest()}
                {cancelRideAndContinueButton()}
            </Animatable.View>
        )
    }

    function indicator() {
        return (
            <View style={{ ...styles.sheetIndicatorStyle }} />
        )
    }

    function cancelRideAndContinueButton() {
        return (

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { cancelRide() }}
                style={{ ...styles.buttonStyle, marginRight: Sizes.fixPadding - 8.5, }}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Cancelar corrida
                </Text>
            </TouchableOpacity>
        )
    }

    function progressInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 5.0, marginVertical: Sizes.fixPadding, }}>
                <Progress.Bar
                    progress={0.5}
                    width={null}
                    color={Colors.lightBlackColor}
                    height={8.0}
                    unfilledColor={Colors.shadowColor}
                    borderWidth={0}
                />
            </View>
        )
    }

    function searchingInfo() {
        return (
            <View style={{ alignItems: 'center', marginTop: Sizes.fixPadding + 5.0 }}>
                <Image
                    source={require('../../assets/images/onboarding/onboarding1.png')}
                    style={{ width: '100%', height: width / 2.5, resizeMode: 'contain' }}
                />
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'center', margin: Sizes.fixPadding * 2.0, }}>
                    Estamos trabalhando para{`\n`} mais próximo de ti.
                </Text>
            </View>
        )
    }

    function loadingRequest() {
        return (
            <View style={{ alignItems: 'center', marginTop: Sizes.fixPadding }}>

                <Text style={{ ...Fonts.blackColor16Regular, textAlign: 'center', margin: Sizes.fixPadding * 2.0, }}>
                    Procurando por motoristas...
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <AntDesign
                    name="arrowleft"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
            </View>
        )
    }

    function directionInfo() {
        const currentCabLocation = {
            latitude: -8.958333,
            longitude: 13.214444,
        }
        const userLocation = {
            latitude: -8.948333,
            longitude: 13.454444,
        }
        return (
            <MapView
                region={{
                    latitude: -8.838333,
                    longitude: 13.234444,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
                style={{ height: '100%', }}
                provider={PROVIDER_GOOGLE}
                mapType="terrain"
            >
                <MapViewDirections
                    origin={userLocation}
                    destination={currentCabLocation}
                    apikey={Key.apiKey}
                    strokeColor={Colors.primaryColor}
                    strokeWidth={3}
                />
                <Marker coordinate={currentCabLocation}>
                    <Image
                        source={require('../../assets/images/icons/marker2.png')}
                        style={{ width: 50.0, height: 50.0, resizeMode: 'stretch', }}
                    />
                    <Callout>
                        <View style={styles.calloutWrapStyle}>
                            <View style={styles.kilometerInfoWrapStyle}>
                                <Text style={{ ...Fonts.whiteColor10Bold }}>
                                    10km
                                </Text>
                            </View>
                            <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.blackColor14SemiBold }}>
                                1655 Island Pkwy, Kamloops, BC V2B 6Y9
                            </Text>
                        </View>
                    </Callout>
                </Marker>
                <Marker coordinate={userLocation}>
                    <Image
                        source={require('../../assets/images/icons/marker3.png')}
                        style={{ width: 23.0, height: 23.0, }}
                    />
                    <Callout>
                        <Text style={{ width: width / 1.5, ...Fonts.blackColor14SemiBold }}>
                            9 Bailey Drive, Fredericton, NB E3B 5A3
                        </Text>
                    </Callout>
                </Marker>
            </MapView>
        )
    }
}

export default SearchingForDriversScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        position: 'absolute',
        top: 20.0,
        left: 15.0,
        right: 15.0,
    },
    calloutWrapStyle: {
        width: width / 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor
    },
    kilometerInfoWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.lightBlackColor,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding - 5.0
    },
    bottomSheetWrapStyle: {
        borderTopLeftRadius: Sizes.fixPadding * 2.5,
        borderTopRightRadius: Sizes.fixPadding * 2.5,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: 0.0,
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0
    },
    sheetIndicatorStyle: {
        width: 50,
        height: 5.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 2.0,
        alignSelf: 'center'
    },
    buttonStyle: {
        flex: 1,
        marginTop: Sizes.fixPadding * 3.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 2.0,
        borderColor: Colors.whiteColor,
    },
})