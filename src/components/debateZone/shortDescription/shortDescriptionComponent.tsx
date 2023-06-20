import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

interface ShortDescriptionComponentProps {
    shortDescription: string;
    isOnlyShow?: boolean;
}

export const ShortDescriptionComponent = (
    props: ShortDescriptionComponentProps,
) => {
    const [isShow, setIsShow] = useState(false);

    const toggleShow = () => {
        setIsShow(!isShow);
    };

    if (props.shortDescription && props.shortDescription.length > 0) {
        if (props.isOnlyShow) {
            return (
                <View>
                    <Text style={styles.shortDescription}>
                        {props.shortDescription}
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Pressable onPress={toggleShow}>
                        <View>
                            <Text style={styles.detailsShowHide}>
                                {isShow ? 'Details Λ' : 'Details V'}
                            </Text>
                        </View>
                    </Pressable>
                    <View
                        style={{
                            display: isShow ? 'flex' : 'none',
                            marginTop: 10,
                        }}
                    >
                        <Text style={styles.shortDescription}>
                            {props.shortDescription}
                        </Text>
                    </View>
                </View>
            );
        }
    } else {
        return null;
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shortDescription: {
        padding: 10,
        fontSize: 15,
    },
    detailsShowHide: {
        fontSize: 20,
        color: '#FFFFFF',
    },
});
