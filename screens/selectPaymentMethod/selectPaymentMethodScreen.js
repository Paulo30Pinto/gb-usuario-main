import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import MapViewDirections from "react-native-maps-directions";
import { Key } from "../../constants/key";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "react-native-simple-bottom-sheet";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("window");

const paymentmethods = [
  // {
  //     id: '1',
  //     paymentIcon: require('../../assets/images/paymentMethods/visa.png'),
  //     paymentType: 'card',
  //     cardNumber: '**** **** **56 7896',
  //     cardExpiry: '04/25',
  // },
  // {
  //     id: '2',
  //     paymentIcon: require('../../assets/images/paymentMethods/masterCard.png'),
  //     paymentType: 'card',
  //     cardNumber: '**** **** **56 7896',
  //     cardExpiry: '04/25',
  // },
  {
    id: "3",
    paymentIcon: require("../../assets/images/paymentMethods/cash.png"),
    paymentType: "cash",
    paymentMethod: "Dinheiro em mão",
  },
  {
    id: "4",
    paymentIcon: require("../../assets/images/paymentMethods/wallet.png"),
    paymentType: "outro",
    paymentMethod: "Transferência",
  },
];

const SelectPaymentMethodScreen = ({ navigation }) => {
  const [selectedPaymentMethodIndex, setSelectedPaymentMethodIndex] =
    useState(2);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {/*{directionInfo()}*/}
        {header()}
        {paymentSheet()}
        {bookRideButton()}
      </View>
    </SafeAreaView>
  );

  function paymentSheet() {
    return (
      <BottomSheet
        isOpen={false}
        sliderMinHeight={300}
        sliderMaxHeight={height - 150.0}
        lineContainerStyle={{
          height: 0.0,
          marginVertical: Sizes.fixPadding + 5.0,
        }}
        lineStyle={styles.sheetIndicatorStyle}
        wrapperStyle={{ ...styles.bottomSheetWrapStyle }}
      >
        {(onScrollEndDrag) => (
          <ScrollView
            onScrollEndDrag={onScrollEndDrag}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
          >
            <Animatable.View
              animation="slideInUp"
              iterationCount={1}
              duration={1500}
              style={{ flex: 1 }}
            >
              {/*{currentLocationInfo()}
              {currentToDropLocDivider()}
        {dropLocationInfo()}*/}
              {paymentMethodsInfo()}
            </Animatable.View>
          </ScrollView>
        )}
      </BottomSheet>
    );
  }

  function bookRideButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push(" ");
        }}
        style={{
          ...styles.buttonStyle,
          position: "absolute",
          bottom: 0.0,
          right: 0.0,
          left: 0.0,
        }}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Avançar</Text>
      </TouchableOpacity>
    );
  }

  function paymentMethodsInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Bold }}
        >
          Método de pagamento
        </Text>
        {paymentmethods.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setSelectedPaymentMethodIndex(index);
            }}
            key={`${item.id}`}
            style={styles.paymentMethodWrapStyle}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <Image
                source={item.paymentIcon}
                style={{ width: 40.0, height: 40.0, resizeMode: "contain" }}
              />
              {item.paymentType == "card" ? (
                <View style={{ marginLeft: Sizes.fixPadding + 5.0, flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    style={{ ...Fonts.blackColor16SemiBold }}
                  >
                    {item.cardNumber}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ ...Fonts.grayColor12SemiBold }}
                  >
                    Expires 04/25
                  </Text>
                </View>
              ) : (
                <Text
                  numberOfLines={1}
                  style={{
                    marginLeft: Sizes.fixPadding + 5.0,
                    flex: 1,
                    ...Fonts.blackColor16SemiBold,
                  }}
                >
                  {item.paymentMethod}
                </Text>
              )}
            </View>
            <View
              style={{
                ...styles.selectedMethodIndicatorStyle,
                backgroundColor:
                  selectedPaymentMethodIndex == index
                    ? Colors.lightBlackColor
                    : Colors.shadowColor,
              }}
            >
              <MaterialIcons name="check" color={Colors.whiteColor} size={14} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  function dropLocationInfo() {
    return (
      <View style={styles.dropLocationInfoWrapStyle}>
        <View style={{ width: 24.0, alignItems: "center" }}>
          <MaterialIcons
            name="location-pin"
            size={24}
            color={Colors.primaryColor}
          />
        </View>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor15SemiBold,
          }}
        >
          1655 Island Pkwy, Kamloops, BC V2B 6Y9
        </Text>
      </View>
    );
  }

  function currentToDropLocDivider() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ width: 24.0, alignItems: "center" }}>
          <Text style={{ ...Fonts.blackColor8SemiBold, lineHeight: 6 }}>
            •{`\n`}•{`\n`}•{`\n`}•{`\n`}•{`\n`}•{`\n`}•
          </Text>
        </View>
        <View style={styles.currentToDropLocationInfoDividerStyle} />
      </View>
    );
  }

  function currentLocationInfo() {
    return (
      <View style={styles.currentLocationInfoWrapStyle}>
        <View style={{ width: 24, alignItems: "center" }}>
          <View style={styles.currentLocationIconStyle}>
            <View
              style={{
                width: 7.0,
                height: 7.0,
                borderRadius: 3.5,
                backgroundColor: Colors.blackColor,
              }}
            />
          </View>
        </View>
        <Text
          numberOfLines={1}
          style={{
            marginLeft: Sizes.fixPadding + 5.0,
            flex: 1,
            ...Fonts.blackColor15SemiBold,
          }}
        >
          9 Bailey Drive, Fredericton, NB E3B 5A3
        </Text>
      </View>
    );
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
        <Text
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding + 2.0,
            ...Fonts.blackColor20ExtraBold,
          }}
        >
          Pagamento
        </Text>
      </View>
    );
  }

  function directionInfo() {
    const currentCabLocation = {
      latitude: -8.538333,
      longitude: 13.034444,
    };
    const userLocation = {
      latitude: -8.808333,
      longitude: 13.204444,
    };
    return (
      <MapView
        region={{
          latitude: -8.838333,
          longitude: 13.234444,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        style={{ height: "100%" }}
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
            source={require("../../assets/images/icons/marker2.png")}
            style={{ width: 50.0, height: 50.0, resizeMode: "stretch" }}
          />
          <Callout>
            <View style={styles.calloutWrapStyle}>
              <View style={styles.kilometerInfoWrapStyle}>
                <Text style={{ ...Fonts.whiteColor10Bold }}>10km</Text>
              </View>
              <Text
                style={{
                  marginLeft: Sizes.fixPadding,
                  flex: 1,
                  ...Fonts.blackColor14SemiBold,
                }}
              >
                1655 Island Pkwy, Kamloops, BC V2B 6Y9
              </Text>
            </View>
          </Callout>
        </Marker>
        <Marker coordinate={userLocation}>
          <Image
            source={require("../../assets/images/icons/marker3.png")}
            style={{ width: 23.0, height: 23.0 }}
          />
          <Callout>
            <Text style={{ width: width / 1.5, ...Fonts.blackColor14SemiBold }}>
              9 Bailey Drive, Fredericton, NB E3B 5A3
            </Text>
          </Callout>
        </Marker>
      </MapView>
    );
  }
};

export default SelectPaymentMethodScreen;

const styles = StyleSheet.create({
  paymentMethodWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 5.0,
  },
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 20.0,
    left: 15.0,
    right: 15.0,
  },
  calloutWrapStyle: {
    width: width / 1.5,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
  },
  kilometerInfoWrapStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.lightBlackColor,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding - 5.0,
  },
  bottomSheetWrapStyle: {
    paddingTop: Sizes.fixPadding + 5.0,
    borderTopLeftRadius: Sizes.fixPadding * 2.5,
    borderTopRightRadius: Sizes.fixPadding * 2.5,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 0.0,
    elevation: 0.0,
    marginBottom: Sizes.fixPadding * 4.5,
  },
  currentToDropLocationInfoDividerStyle: {
    backgroundColor: Colors.shadowColor,
    height: 1.0,
    flex: 1,
    marginRight: Sizes.fixPadding * 2.5,
    marginLeft: Sizes.fixPadding,
  },
  currentLocationIconStyle: {
    width: 18.0,
    height: 18.0,
    borderRadius: 9.0,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.blackColor,
    borderWidth: 2.0,
  },
  sheetIndicatorStyle: {
    width: 50,
    height: 5.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
  },
  currentLocationInfoWrapStyle: {
    marginTop: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },
  dropLocationInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    marginTop: -(Sizes.fixPadding - 5.0),
  },
  buttonStyle: {
    marginTop: Sizes.fixPadding + 5.0,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding + 2.0,
  },
  selectedMethodIndicatorStyle: {
    width: 20.0,
    height: 20.0,
    borderRadius: 10.0,
    alignItems: "center",
    justifyContent: "center",
  },
});
