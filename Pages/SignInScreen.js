import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import BtrButton from "../Components/BtrButton";
import Axios from "axios";
import yaleLogo from "../assets/yaleLogo.png";

// The two inputs initial value
// Also used for clearing the inputs once done
const initialForm = {
  email: "",
  password: "",
};

const SignInScreen = (props) => {
  // The form saved in a state object so that it can save the values in the inputs and be accessed
  const [form, setForm] = useState(initialForm);

  // Function handling sign in (Asynchronous Function)
  const onSignIn = async () => {
    // Removes the period in the email because having a period breaks the url
    // Email used as the unique id of the user
    const uniqIdEmal = form.email.replace(".", "");

    // The try-catch block, if the call to the database fails like the user does not exist then it goes to the catch block
    try {
      // The API call to the data base
      const response = await Axios.get(
        `https://final-project-2f61a-default-rtdb.firebaseio.com/users/${uniqIdEmal}.json`
      );
      // The data that should be coming back for the user
      const { name, classes, password } = response.data;
      console.log("SIGNED IN");
      // Checks if the password the user wrote in the text input is the same as the password in the database
      if (form.password == password) {
        // Navigate to home, and send the user's name and classes to the next screen. So that you can say Hi Michael!
        props.navigation.navigate("Home", {
          name,
          classes,
        });
        console.log("USER AND PASSWORD MATCH");
        // Clears the form so that it is empty
        setForm(initialForm);
      } else {
        console.log("PASSWORD DOES NOT match");
      }
    } catch (e) {
      console.log("Email Does Not Exist");
    }
  };

  // If buttons sign up is pressed then navigate to the Sign Up Page
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
