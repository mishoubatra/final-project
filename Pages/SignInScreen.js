import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import BtrButton from "../Components/BtrButton";
import Axios from "axios";
import yaleLogo from "../assets/yaleLogo.png";

const initialForm = {
  email: "",
  password: "",
};

const SignInScreen = (props) => {
  const [form, setForm] = useState(initialForm);

  const onSignIn = async () => {
    // console.log('ON SIGN IN');
    const uniqIdEmal = form.email.replace(".", "");

    try {
      const response = await Axios.get(
        `https://final-project-2f61a-default-rtdb.firebaseio.com/users/${uniqIdEmal}.json`
      );
      const { name, classes, password } = response.data;
      console.log("SIGNED IN");
      if (form.password == password) {
        // SIGNED IN
        props.navigation.navigate("Home", {
          name,
          classes,
        });
        console.log("USER AND PASSWORD MATCH");
        setForm(initialForm);
      }
    } catch (e) {
      console.log("Email Does Not Exist");
    }
  };

  const signup = () => {
    props.navigation.navigate("SignUp");
  };

  return (
    <View style={styles.screen}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 35,
          color: "#0f4d92",
          paddingBottom: 5,
        }}
      >
        Course Companion
      </Text>
      <Image
        source={yaleLogo}
        style={{
          width: 310,
          height: 330,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        autoCapitalize="none"
        value={form.email}
        textContentType="username"
        onChangeText={(val) => setForm({ ...form, email: val })}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        autoCapitalize="none"
        value={form.password}
        textContentType="password"
        secureTextEntry={true}
        onChangeText={(val) => setForm({ ...form, password: val })}
      />
      {/* <Button title="Sign In" onPress={onSignIn} />
      <Button title="Sign Up" onPress={signup} /> */}
      <BtrButton
        onPress={onSignIn}
        viewStyle={styles.addClassBtn}
        textStyle={styles.addClassBtnTxt}
      >
        Sign In
      </BtrButton>
      <BtrButton
        onPress={signup}
        viewStyle={styles.addClassBtn}
        textStyle={styles.addClassBtnTxt}
      >
        Sign Up
      </BtrButton>
      <Text>Not already a user? Sign up now!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#0f4d92",
    paddingHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  addClassBtn: {
    backgroundColor: "#0f4d92",
    height: 40,
    width: 315,
    borderRadius: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 2,
    marginBottom: 10,
  },
  addClassBtnTxt: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SignInScreen;
