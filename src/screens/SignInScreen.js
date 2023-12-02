import axios from "axios";
import React, { useState } from "react";
import { View, Text, Button, Image, Alert } from "react-native";
import Logo from "../../assets/adaptive-icon.png";
import Input from "../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";

/** Structure:
 * - some logo
 * - email field
 * - password field
 * - login button
 * */

const SignInScreen = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    //make sure both fields are filled
    //try/
    //fetch request to login endpoint (send email and password for authentication)
    //if successful - try/
    //                save in local storage
    //                catch/ errors
    //catch/ if not - display errors
    //clear inputs

    if (!password.trim() || !username.trim()) {
      Alert.alert("Enter your username and password");
      return;
    }

    try {
      let res = await axios.post("http://192.168.1.143:3000/auth/login", {
        username,
        password,
      });
      setToken(res.data.token);
      try {
        await AsyncStorage.setItem("token", res.data.token);
        console.log("Token is saved to local storage");
      } catch (e) {
        console.error(e);
      }
      //clear inputs
      setUsername("");
      setPassword("");
    } catch (e) {
      Alert.alert("Username and password don't match");
    }

    //clear inputs
    setUsername("");
    setPassword("");
  };

  const logout = async () => {
    //removing token from storage
    try {
      await AsyncStorage.removeItem("token");
      console.log("Token removed, you are logged out");
      setToken(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={tw`items-center pt-30 px-10 bg-slate-200 h-full`}>
      {token ? (
        <>
          <Text style={tw`text-lg mt-20 mb-2`}>You are now logged in.</Text>
          <Text style={tw`m-5`}>Here is your authorization token: </Text>
          <Text style={tw`text-blue-800`}>{token}</Text>
          <View style={tw`bg-blue-300 w-50 my-8 rounded-xl h-10`}>
            <Button title="Logout" onPress={logout} />
          </View>
        </>
      ) : (
        <>
          <Image source={Logo} style={tw`w-40 h-40 mt-10 mb-8`} />
          <Input
            placeholder="Enter your username"
            value={username}
            setValue={setUsername}
          />
          <Input
            placeholder="Enter your password"
            value={password}
            setValue={setPassword}
            secureTextEntry
          />
          <View style={tw`bg-blue-300 w-10/12 mt-6 rounded-xl h-10`}>
            <Button onPress={handleSubmit} title="Login" />
          </View>
        </>
      )}
    </View>
  );
};

export default SignInScreen;
