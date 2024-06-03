import {View, Text, Image, TouchableOpacity} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import Placeholder from "../../assets/images/card-placeholder.jpg";
import styles from "./style";
import TagIcon from "../TagIcon/TagIcon";
import TagPercentage from "../TagPercentage/TagPercentage";
import {getNavigationRedux} from "../../redux/navigation/navigationSlice";
import {getOfferRedux} from "../../redux/offer/offerSlice";

export default function CardItem(props) {
    const {
        title,
        description,
        navigate,
        tag,
        promo,
        percentage,
        image,
        offerId,
    } = props;

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const handleItem = () => {
        navigation.navigate(navigate);
        dispatch(getOfferRedux(offerId));
        dispatch(getNavigationRedux(null));
    };

    return (
        <TouchableOpacity style={styles.item} onPress={handleItem}>
            <View>
                {image && (
                    <Image
                        style={styles.image}
                        source={{
                            uri: image,
                        }}
                    />
                )}
                {!image && <Image source={Placeholder} style={styles.image} />}
                {tag && <Text style={styles.tagNew}>Novo</Text>}
            </View>

            <View style={styles.itemDescriptionContainer}>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text style={styles.itemDescription}>{description}</Text>

                <View style={styles.itemTags}>
                    {promo && <TagIcon />}
                    {percentage && <TagPercentage />}
                </View>
            </View>
        </TouchableOpacity>
    );
}
