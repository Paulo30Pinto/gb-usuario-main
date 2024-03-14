import { SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const RatingScreen = ({ navigation }) => {

    const [rate1, setRate1] = useState(true);
    const [rate2, setRate2] = useState(true);
    const [rate3, setRate3] = useState(true);
    const [rate4, setRate4] = useState(true);
    const [rate5, setRate5] = useState(false);
    const [compliment, setCompliment] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}>
                    {driverInfo()}
                    {ratingInfo()}
                    {complimentInfo()}
                    {submitButton()}
                </ScrollView>
            </View>
            <Text
                onPress={() => { navigation.push('Home') }}
                style={{ margin: Sizes.fixPadding, textAlign: 'center', ...Fonts.primaryColor18Bold }}
            >
                Voltar Iniciar
            </Text>
        </SafeAreaView>
    )

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('Home') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Enviar
                </Text>
            </TouchableOpacity>
        )
    }

    function complimentInfo() {
        return (
            <TextInput
                value={compliment}
                onChangeText={(value) => setCompliment(value)}
                style={styles.textFieldStyle}
                placeholder='Give a compliment'
                placeholderTextColor={Colors.grayColor}
                cursorColor={Colors.primaryColor}
            />
        )
    }

    function ratingInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 3.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, textAlign: 'center', ...Fonts.grayColor16Regular }}>
                    Adicionaste 4 Estrelas
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    <AntDesign
                        name="star"
                        size={22}
                        color={rate1 ? Colors.orangeColor : Colors.shadowColor}
                        onPress={() => {
                            if (rate1) {
                                setRate2(false)
                                setRate3(false)
                                setRate4(false)
                                setRate5(false)
                            }
                            else {
                                setRate1(true)
                            }
                        }}
                        style={{ marginHorizontal: Sizes.fixPadding - 5.0, }}
                    />
                    <AntDesign
                        name="star"
                        size={22}
                        color={rate2 ? Colors.orangeColor : Colors.shadowColor}
                        onPress={() => {
                            if (rate2) {
                                setRate1(true)
                                setRate3(false)
                                setRate4(false)
                                setRate5(false)
                            }
                            else {
                                setRate2(true)
                                setRate1(true)
                            }
                        }}
                        style={{ marginHorizontal: Sizes.fixPadding - 5.0, }}
                    />
                    <AntDesign
                        name="star"
                        size={22}
                        color={rate3 ? Colors.orangeColor : Colors.shadowColor}
                        onPress={() => {
                            if (rate3) {
                                setRate4(false)
                                setRate5(false)
                                setRate2(true)
                            }
                            else {
                                setRate3(true)
                                setRate2(true)
                                setRate1(true)
                            }
                        }}
                        style={{ marginHorizontal: Sizes.fixPadding - 5.0, }}
                    />
                    <AntDesign
                        name="star"
                        size={22}
                        color={rate4 ? Colors.orangeColor : Colors.shadowColor}
                        onPress={() => {
                            if (rate4) {
                                setRate5(false)
                                setRate3(true)
                            }
                            else {
                                setRate4(true)
                                setRate3(true)
                                setRate2(true)
                                setRate1(true)
                            }
                        }}
                        style={{ marginHorizontal: Sizes.fixPadding - 5.0, }}
                    />
                    <AntDesign
                        name="star"
                        size={22}
                        color={rate5 ? Colors.orangeColor : Colors.shadowColor}
                        onPress={() => {
                            if (rate5) {
                                setRate4(true)
                            }
                            else {
                                setRate5(true)
                                setRate4(true)
                                setRate3(true)
                                setRate2(true)
                                setRate1(true)
                            }
                        }}
                        style={{ marginHorizontal: Sizes.fixPadding - 5.0, }}
                    />
                </View>
            </View>
        )
    }

    function driverInfo() {
        return (
            <View style={{ alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('../../assets/images/users/user2.png')}
                        style={styles.driverImageStyle}
                    />
                    <View style={styles.ratingInfoWrapStyle}>
                        <Text numberOfLines={1} style={{ maxWidth: width / 12.0, ...Fonts.whiteColor12Bold }}>
                            4.7
                        </Text>
                        <MaterialIcons
                            name='star'
                            color={Colors.orangeColor}
                            size={16}
                            style={{ marginLeft: Sizes.fixPadding - 5.0 }}
                        />
                    </View>
                </View>
                <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.blackColor17SemiBold }}>
                    Joaquim Zumbuca
                </Text>
            </View>
        )
    }

    function backArrow() {
        return (
            <AntDesign
                name="arrowleft"
                size={24}
                color={Colors.blackColor}
                onPress={() => navigation.pop()}
                style={{ marginHorizontal: Sizes.fixPadding + 5.0, marginVertical: Sizes.fixPadding * 2.0, }}
            />
        )
    }
}

export default RatingScreen

const styles = StyleSheet.create({
    ratingInfoWrapStyle: {
        position: 'absolute',
        bottom: 5.0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    driverImageStyle: {
        width: width / 4.0,
        height: width / 4.0,
        borderRadius: (width / 4.0) / 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    textFieldStyle: {
        ...Fonts.blackColor14Regular,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        borderColor: Colors.shadowColor,
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
})