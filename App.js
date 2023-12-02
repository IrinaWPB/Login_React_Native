import { useState, useEffect } from "react";
import { View } from "react-native";
import SignInScreen from "./src/screens/SignInScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    checkIfLoggedIn();
  });

  const checkIfLoggedIn = async () => {
    try {
      let savedToken = await AsyncStorage.getItem("token");

      //logger
      if (savedToken) {
        console.log("Token: ", savedToken);
      } else {
        console.log("No token in storage, please log in");
      }

      setToken(savedToken);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <SignInScreen token={token} setToken={setToken} />
    </View>
  );
}

export default App;
