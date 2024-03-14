import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { AntDesign } from '@expo/vector-icons';
import { CreditCardInput } from "../../components/creditCard/expo-credit-card";

const AddPaymentMethodScreen = ({ navigation }) => {

    const [state, setState] = useState({
        cardNumberStatus: 'invalid',
        cardExpiryStatus: 'invalid',
        cardCvcStatus: 'invalid',
        cardHolderStatus: 'invalid',
        saveCard: true,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        cardNumberStatus,
        cardExpiryStatus,
        cardCvcStatus,
        cardHolderStatus,
        saveCard
    } = state;

    const _onChange = (formData) => {
        updateState({
            cardNumberStatus: formData.status.number,
            cardExpiryStatus: formData.status.expiry,
            cardCvcStatus: formData.status.cvc,
            cardHolderStatus: formData.status.name,
        })
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: Sizes.fixPadding }}>
                    {cardDetails()}
                </ScrollView>
            </View>
            {addButton()}
        </SafeAreaView>
    )

    function addButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.pop() }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Adicionar
                </Text>
            </TouchableOpacity>
        )
    }

    function cardDetails() {
        return (
            <CreditCardInput
                autoFocus={true}
                requiresName
                requiresCVC
                labelStyle={{ fontSize: 16.0, color: Colors.grayColor }}
                inputStyle={styles.cardInputFieldStyle}
                inputContainerStyle={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}
                cardFontFamily={'NunitoSans_SemiBold'}
                cardScale={1.0}
                validColor={"black"}
                invalidColor={"red"}
                placeholderColor={Colors.lightGrayColor}
                onChange={_onChange}
            />
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
                <Text style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0, ...Fonts.blackColor20ExtraBold }}>
                    Método de pagamento
                </Text>
            </View>
        )
    }
}

export default AddPaymentMethodScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    cardInputFieldStyle: {
        ...Fonts.blackColor16Bold,
        backgroundColor: Colors.whiteColor,
        borderBottomColor: Colors.shadowColor,
        borderBottomWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
})