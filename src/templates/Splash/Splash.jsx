import React, {useEffect, useState} from "react";
import {Image, Linking, StatusBar, View} from "react-native";
import {useDispatch} from "react-redux";
import splashImage from "../../assets/images/splash.png";
import {getFilterRedux} from "../../redux/filter/filterSlice";
import {getNewPasswordRedux} from "../../redux/newPassword/newPasswordSlice";

export default function Splash({navigation}) {
    const dispatch = useDispatch();

    // DEEP LINK FOR RESET PASSWORD
    const [url, setUrl] = useState(null);

    const getUrlAsync = async () => {
        const initialUrl = await Linking.getInitialURL();

        setUrl(initialUrl);
    };

    useEffect(() => {
        getUrlAsync();
    }, []);

    setTimeout(() => {
        if (url) {
            if (url.split("/").includes("duopass-newpassword")) {
                navigation.navigate("NewPassword");

                dispatch(
                    getNewPasswordRedux(url.split("duopass-newpassword/")[1]),
                );

                dispatch(getFilterRedux({category: ""}));

                return;
            }
        }

        navigation.navigate("Onboarding");
        dispatch(getFilterRedux({category: ""}));
    }, 3000);

    return (
        <View>
            <StatusBar
                backgroundColor="rgba(0,0,0,0)"
                barStyle="light-content"
                translucent
            />
            <Image source={splashImage} />
        </View>
    );
}
