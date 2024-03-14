import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, TouchableOpacity, FlatList, Image, BackHandler } from 'react-native'
import React, { useState, useCallback, createRef, } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {

    const onboardingScreenList = [
        {
            id: '1',
            onboardingImage: require('../../assets/images/onboarding/3.png'),
            onboardingTitle: 'Selecione a localização que pretende',
            onboardingDescription: 'Iremos até seu local de escolha',
        },
        {
            id: '2',
            onboardingImage: require('../../assets/images/onboarding/5.png'),
            onboardingTitle: 'Escolha de acordo as suas dimensões',
            onboardingDescription: 'Faremos questão de obedecer a seu pedido',
        },
        {
            id: '3',
            onboardingImage: require('../../assets/images/onboarding/1.png'),
            onboardingTitle: 'Acompanhe sua entrega',
            onboardingDescription: 'Terá o direito de acompanhar seu pedido em tempo real',
        },
    ];

   

    const listRef = createRef();
    const [currentScreen, setCurrentScreen] = useState(0);

    const scrollToIndex = ({ index }) => {
        listRef.current.scrollToIndex({ animated: true, index: index });
        setCurrentScreen(index);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {onboardingScreenContent()}
            </View>
            {indicators()}
            {skipAndNextInfo()}
            
        </SafeAreaView>
    )

    function skipAndNextInfo() {
        return (
            <View style={{ ...styles.skipAndNextWrapStyle, }}>
                <Text
                    onPress={() => currentScreen == 2 ? null : navigation.push('Phone')}
                    style={{ ...Fonts.primaryColor16Bold }}
                >
                    {currentScreen == 2 ? '' : 'Pular'}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { currentScreen == 2 ? navigation.push('Phone') : scrollToIndex({ index: currentScreen + 1 }) }}
                    style={styles.arrowForwardButtonStyle}
                >
                    <MaterialIcons name="arrow-forward" size={25} color={Colors.primaryColor} />
                </TouchableOpacity>
            </View>
        )
    }

    function indicators() {
        return (
            <View style={{ ...styles.indicatorWrapStyle, }}>
                {
                    onboardingScreenList.map((item, index) => {
                        return (
                            <View
                                key={`${item.id}`}
                                style={{
                                    ...currentScreen == index ? styles.selectedIndicatorStyle : styles.indicatorStyle,
                                }}
                            />
                        )
                    })
                }
            </View>
        )
    }

    function onboardingScreenContent() {
        const renderItem = ({ item }) => {
            return (
                <View style={styles.onboardingContentStyle}>
                    <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 3.0, }}>
                        <Image
                            source={item.onboardingImage}
                            style={styles.onboardingImageStyle}
                        />
                        <Text
                            numberOfLines={1}
                            style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.blackColor18Bold }}
                        >
                            {item.onboardingTitle}
                        </Text>
                        <Text style={{ textAlign: 'center', ...Fonts.grayColor14Regular }}>
                            {item.onboardingDescription}
                        </Text>
                    </View>
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    ref={listRef}
                    data={onboardingScreenList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    scrollEventThrottle={32}
                    pagingEnabled
                    onMomentumScrollEnd={onScrollEnd}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    function onScrollEnd(e) {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        setCurrentScreen(pageNum);
    }

    
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    exitInfoWrapStyle: {
        backgroundColor: Colors.lightBlackColor,
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedIndicatorStyle: {
        marginHorizontal: Sizes.fixPadding - 7.0,
        width: 25.0,
        height: 10.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.primaryColor
    },
    indicatorStyle: {
        marginHorizontal: Sizes.fixPadding - 7.0,
        width: 10.0,
        height: 10.0,
        borderRadius: 5.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.5,
    },
    indicatorWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    skipAndNextWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 4.0,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    onboardingContentStyle: {
        flex: 1,
        width: width,
        height: '100%',
        overflow: 'hidden',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    onboardingImageStyle: {
        width: width / 1.5,
        height: width / 1.8,
        resizeMode: 'contain',
        marginBottom: Sizes.fixPadding * 5.0,
        alignSelf: 'center',
    },
    arrowForwardButtonStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})