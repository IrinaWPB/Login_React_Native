import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import tw from "twrnc";

const Input = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <View
      style={tw`bg-slate-100 w-11/12 h-10 rounded-xl mb-5 p-2 justify-center`}
    >
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;
