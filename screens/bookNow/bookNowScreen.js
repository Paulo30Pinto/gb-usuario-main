import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
//import MapViewDirections from 'react-native-maps-directions';
//import { Key } from "../../constants/key";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useRoute } from "@react-navigation/native"; // Importe useRoute


const { width, height } = Dimensions.get('window');




const BookNowScreen = ({ navigation,route }) => {

    console.log(route);

const { selectedLocation } = route.params;


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {directionInfo()}
                {header()}
                {addressesInfoSheet()}
            </View>
        </SafeAreaView>
    )

    function addressesInfoSheet() {
        return (
            <Animatable.View
                animation="slideInUp"
                iterationCount={1}
                duration={1500}
                style={{ ...styles.bottomSheetWrapStyle, }}
            >
                {indicator()}
                {/*currentLocationInfo()*/}
                {/*currentToDropLocDivider()*/}
                {dropLocationInfo()}
                {continueButton()}
            </Animatable.View>
        )
    }

    function indicator() {
        return (
            <View style={{ ...styles.sheetIndicatorStyle }} />
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('SelectCab') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Continuar
                </Text>
            </TouchableOpacity>
        )
    }

    function dropLocationInfo() {
        const route = useRoute(); // Inicialize a rota
        const { selectedLocation } = route.params || {}; // Obtenha os parâmetros
      
        return (
          <View style={styles.dropLocationInfoWrapStyle}>
              <View style={{ width: 24.0, alignItems: 'center' }}>
                  <MaterialIcons name="location-pin" size={24} color={Colors.primaryColor} />
               </View>
               <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor15SemiBold }}>
                  {selectedLocation ? selectedLocation.address : 'Local de entrega não selecionado'}
               </Text>
          </View>
        );
      }

    {/*function currentToDropLocDivider() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 24.0, alignItems: "center" }}>
                    <Text style={{ ...Fonts.blackColor8SemiBold, lineHeight: 6 }}>
                        •{`\n`}
                        •{`\n`}
                        •{`\n`}
                        •{`\n`}
                        •{`\n`}
                        •{`\n`}
                        •
                    </Text>
                </View>
                <View style={styles.currentToDropLocationInfoDividerStyle} />
            </View>
        )
    }

    function currentLocationInfo() {
        return (
            <View style={styles.currentLocationInfoWrapStyle}>
                <View style={{ width: 24, alignItems: 'center' }}>
                    <View style={styles.currentLocationIconStyle}>
                        <View style={{ width: 7.0, height: 7.0, borderRadius: 3.5, backgroundColor: Colors.blackColor }} />
                    </View>
                </View>
                <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding + 5.0, flex: 1, ...Fonts.blackColor15SemiBold }}>
                      Centralidade Do Kilamba, Y12
                </Text>
            </View>
        )
    }*/}

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <AntDesign
                    name="arrowleft"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0, ...Fonts.blackColor20ExtraBold }}>
                    Reservar seu pedido
                </Text>
            </View>
        )
    }

    function directionInfo() {
        const { selectedLocation } = route.params;
      
        return (
          <MapView
            region={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
              latitudeDelta: 0.5, // Ajuste o valor conforme desejado
              longitudeDelta: 0.5, // Ajuste o valor conforme desejado
            }}
            style={{ height: '100%' }}
            provider={PROVIDER_GOOGLE}
            mapType="terrain"
          >
            <Marker coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }}>
              <Image
                source={require('../../assets/images/icons/marker2.png')}
                style={{ width: 50.0, height: 50.0, resizeMode: 'stretch' }}
              />
              <Callout>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                  {selectedLocation.name}
                </Text>
              </Callout>
            </Marker>
          </MapView>
        );
      }
      
}

export default BookNowScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
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
        maxHeight: height - 150.0,
        left: 0.0,
        bottom: 0.0,
        right: 0.0,
    },
    currentToDropLocationInfoDividerStyle: {
        backgroundColor: Colors.shadowColor,
        height: 1.0,
        flex: 1,
        marginRight: Sizes.fixPadding * 2.5,
        marginLeft: Sizes.fixPadding
    },
    currentLocationIconStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.blackColor,
        borderWidth: 2.0,
    },
    sheetIndicatorStyle: {
        width: 50,
        height: 5.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 2.0,
        alignSelf: 'center'
    },
    currentLocationInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dropLocationInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -(Sizes.fixPadding - 5.0)
    },
    buttonStyle: {
        marginTop: Sizes.fixPadding * 3.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 3.0
    },
})