import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import MapViewDirections from 'react-native-maps-directions';
import { Key } from "../../constants/key";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { requestSlice } from '../../redux/features/request/requestSlice';
import { services } from '../../services';
import { responseStatus } from '../../utils/responseStatus';
import { cistern } from '../../services/cistern';


const { width, height } = Dimensions.get('window');

const SelectWaterScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [selectedWaterIndex, setselectedWaterIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const [userLocation, setUserLocation] = useState(null);

    const login = useSelector((state) => state.login);
    const loggedUser = login.loggedUser;

    const request = useSelector((state) => state.request);
    const requestInfo = request.requestInfo;

    console.log("Cisterna: ", requestInfo.cistern);
    console.log("Water: ", selectedWaterIndex);

    const getInitialData = async () => {
        
    }

    useEffect(() => {
        getInitialData();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {waterInfo()}
                {selectWaterSheet()}
            </View>
        </SafeAreaView>
    )

    function selectWaterSheet() {
        return (
            <Animatable.View
                animation="slideInUp"
                iterationCount={1}
                duration={1500}
                style={{ ...styles.bottomSheetWrapStyle }}
            >
                
                {bookRideButton()}
            </Animatable.View>
        )
    }

    function indicator() {
        return (
            <View style={{ ...styles.sheetIndicatorStyle }} />
        )
    }

    function waterInfo() {
        return (
            <View style={styles.row}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {setselectedWaterIndex(0); }}
                    style={styles.cabInfoWrapStyle}
                >
                    <Image
                        source={require('../../assets/images/cabs/cab5.png')}
                        style={styles.cabImageStyle}
                    />
                    <View style={{ marginLeft: Sizes.fixPadding}}>
                        <Text style={{ ...Fonts.blackColor15Bold, marginTop: Sizes.fixPadding * 4.5 }}>
                            Água Potável
                        </Text>
                        <View
                            style={{
                                backgroundColor: selectedWaterIndex == 0 ? Colors.lightBlackColor : Colors.shadowColor,
                                ...styles.selectedCabIndicatorStyle,
                            }}
                        >
                            <MaterialIcons
                                name='check'
                                color={Colors.whiteColor}
                                size={14}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { setselectedWaterIndex(1) }}
                    style={styles.cabInfoWrapStyle}
                >
                    <Image
                        source={require('../../assets/images/cabs/cab5.png')}
                        style={styles.cabImageStyle}
                    />
                    <View style={{ marginLeft: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.blackColor15Bold, marginTop: Sizes.fixPadding * 4.5 }}>
                            Água Não Potável
                        </Text>
                        <View
                            style={{
                                backgroundColor: selectedWaterIndex == 1 ? Colors.lightBlackColor : Colors.shadowColor,
                                ...styles.selectedCabIndicatorStyle,
                            }}
                        >
                            <MaterialIcons
                                name='check'
                                color={Colors.whiteColor}
                                size={14}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }

    function bookRideButton() {
        const sendRequest = async () => {

            setIsLoading(true);

            console.log("[debug]: Chegou",loggedUser?.id);

            console.log("Cisterna: ", requestInfo);

            const waterType = selectedWaterIndex === 0 ? "Potável" : "Não Potável";
            const response = await services.request.registerRequest(
                {
                    date: new Date(),
                    status: "nulo",
                    location: JSON.stringify(userLocation),
                    id_client: loggedUser?.id,//loggedUser.id,
                    id_cistern: requestInfo.cistern,
                    waterType: waterType, 
                }
            );

            console.log("[debug]: resposta do pedido ", response);

            setIsLoading(false);

            if (response?.status == 201) {
                console.log("resposta ",response?.data)

                const newData = {waterType: waterType}
                dispatch(requestSlice.actions.setRequestInfo({data: {...response?.data?.data, ...newData}}));
                navigation.push("SearchingForDrivers");
            }
            
        };

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={sendRequest} // Chama a função para enviar a solicitação
                style={styles.buttonStyle}
            >{isLoading ? (
                <ActivityIndicator color="#ffff" />
            ) : (
                <Text style={{ ...Fonts.whiteColor18Bold }}>Continuar</Text>
            )}
            </TouchableOpacity>
        );
    }

    // ================================================ Termina Aqui =============================================================


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
                    Escolha o Tipo de Água
                </Text>
            </View>
        )
    }
}

export default SelectWaterScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        top: 20.0,
        left: 15.0,
        right: 15.0,
    },
    row:{    
        marginTop: (width) / 1.5, 
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        
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
        maxHeight: height - 150.0,
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
    },
    sheetIndicatorStyle: {
        width: 50,
        height: 5.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        alignSelf: 'center',
        marginVertical: Sizes.fixPadding * 2.0,
    },
    buttonStyle: {
        marginTop: Sizes.fixPadding * 3.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 2.0
    },
    cabTypesInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding + 5.0
    },
    cabInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.shadowColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        width: (width/2.5),
        height: (height/ 4)
       
    },
    cabImageStyle: {
        top: (width / 10),
        alignSelf: 'center',
        width: width / 6.3,
        height: width / 3.5,
        resizeMode: 'stretch',
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    selectedCabIndicatorStyle: {
        marginTop: -Sizes.fixPadding / 2.0,
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        right: -0.50,
    },
    cabTypeTextStyle: {
        maxWidth: width / 3.5,
        flex: 1,
        textAlign: 'center'
    }
})