import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Axios from "axios";

const initialForm = {
  email: "",
  name: "",
  classes: [],
  password: "",
  confirmPassword: "",
};

const SignUpScreen = (props) => {
  // The form saved in a state object so that it can save the values in the inputs and be accessed
  const [form, setForm] = useState(initialForm);

  // Function handling sign up (Asynchronous Function)
  const onSignUp = async () => {
    // Checks if the password and confirm password match and the password length is 5 or more
    if (form.password == form.confirmPassword && form.password.length > 4) {
      // Try-catch, if an error the goes to catch block
      try {
        // The email is the uniqe id of the user, remove the period because the url will not work
        const uniqIdEmal = form.email.replace(".", "");
        // Creates the user in the database (users/...@gmailcom)
        const response = await Axios.patch(
          `https://final-project-2f61a-default-rtdb.firebaseio.com/users/${uniqIdEmal}.json`,
          {
            // Creates a copy of the form object
            ...form,
            // We dont want to save confirm password in the database that is stupid
            confirmPassword: "",
          }
        );
        // Sets the form to empty
        setForm(initialForm);
        // Navigates to the Add Class page
        props.navigation.navigate("AddClass", {
          ...form,
          // Password and Confirm Password is not passed to the next page
          password: "",
          confirmPassword: "",
        });
      } catch (e) {
        // You do not want to end up here
        console.log(e);
      }
    } else {
      // As the console.log() suggests
      console.log("Passwords don't match");
    }
  };

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(val) => setForm({ ...form, email: val })}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Full Name"
        value={form.name}
        onChangeText={(val) => setForm({ ...form, name: val })}
      />
      <View style={styles.classView}>
        {form.classes.map((element) => (
          <Text key={element.id}>Class: {element.name}</Text>
        ))}
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Password"
        autoCapitalize="none"
        value={form.password}
        secureTextEntry={true}
        onChangeText={(val) => setForm({ ...form, password: val })}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Confirm Password"
        autoCapitalize="none"
        value={form.confirmPassword}
        secureTextEntry={true}
        onChangeText={(val) => setForm({ ...form, confirmPassword: val })}
      />
      <Button title="Sign Up" onPress={onSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#0f4d92", // yale blue #0f4d92
    paddingHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default SignUpScreen;
