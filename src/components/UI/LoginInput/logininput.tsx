import React from "react";
import {View, TextInput, StyleSheet} from "react-native";

type InputProps = {
    value: string,
    placeholder: string,
    onChange: (text: string) => void,
    label?: string,
    secureTextEntry?: boolean,
};

const CustomInput: React.FC<InputProps> = ({ value, placeholder, onChange, label, secureTextEntry }) => (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
        />
    </View>
);

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});