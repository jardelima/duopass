import React, {useRef, useState} from "react";
import {
    Animated,
    FlatList,
    Image,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";

// Icons
import Icons from "react-native-vector-icons/AntDesign";

import {useDispatch} from "react-redux";
import styles from "./style";

// Images
import Onboarding1 from "../../assets/images/onboarding-1.png";
import {getNavigationRedux} from "../../redux/navigation/navigationSlice";

const slides = [
    {
        id: 0,
        // eslint-disable-next-line global-require
        image: Onboarding1,
        title: "Encontre experiências",
        description:
            "Explore as melhores ofertas e descontos exclusivos em sua cidade com o Duopass - onde economia encontra diversão",
    },
];

function OnboardingItem({item}) {
    const {width, height} = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            <Image
                source={item.image}
                style={[styles.onboardingItemImage, {width, height}]}
            />
        </View>
    );
}

export default function Onboarding({navigation}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const dispatch = useDispatch();

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const scrollTo = () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({index: currentIndex + 1});
            return;
        }

        dispatch(getNavigationRedux("Home"));
        navigation.navigate("Home");
    };

    const outOnboarding = () => {
        dispatch(getNavigationRedux("Home"));
        navigation.navigate("Home");
    };

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="rgba(0,0,0,0)"
                barStyle="light-content"
            />
            <View style={styles.container}>
                <View style={{flex: 3}}>
                    <TouchableOpacity
                        style={styles.closeOnboarding}
                        onPress={outOnboarding}>
                        <Icons name="close" size={30} color="#fff" />
                    </TouchableOpacity>

                    <FlatList
                        data={slides}
                        renderItem={({item}) => <OnboardingItem item={item} />}
                        horizontal
                        showsHorizontalScrollIndicator
                        pagingEnabled
                        bounces={false}
                        keyExtractor={item => item.id}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {x: scrollX}}}],
                            {useNativeDriver: false},
                        )}
                        scrollEventThrottle={32}
                        onViewableItemsChanged={viewableItemsChanged}
                        viewabilityConfig={viewConfig}
                        ref={slidesRef}
                    />

                    <View style={styles.onboardingItemContent}>
                        <Text style={styles.onboardingItemTitle}>
                            {slides[currentIndex].title}
                        </Text>

                        <Text style={styles.onboardingItemDescription}>
                            {slides[currentIndex].description}
                        </Text>

                        <View style={styles.paginationContainer}>
                            {/* <View style={styles.pagination}>
                                {slides.map(slide => {
                                    const {width} = useWindowDimensions();

                                    const inputRange = [
                                        (slide.id - 1) * width,
                                        slide.id * width,
                                        (slide.id + 1) * width,
                                    ];

                                    const dotWidth = scrollX.interpolate({
                                        inputRange,
                                        outputRange: [6, 16, 6],
                                        extrapolate: "clamp",
                                    });

                                    const opacity = scrollX.interpolate({
                                        inputRange,
                                        outputRange: [0.3, 1, 0.3],
                                        extrapolate: "clamp",
                                    });

                                    return (
                                        <Animated.View
                                            style={[
                                                styles.paginationDot,
                                                {
                                                    width: dotWidth,
                                                    opacity,
                                                },
                                            ]}
                                            key={slide.id}
                                        />
                                    );
                                })}
                            </View> */}

                            <TouchableOpacity
                                onPress={scrollTo}
                                style={styles.nextButton}>
                                <Icons
                                    name="arrowright"
                                    size={20}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}
