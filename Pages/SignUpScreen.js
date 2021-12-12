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
  const [form, setForm] = useState(initialForm);
  const [className, setClassName] = useState("");

  const onSignUp = async () => {
    if (form.password == form.confirmPassword && form.password.length > 4) {
      try {
        const uniqIdEmal = form.email.replace(".", "");
        const response = await Axios.patch(
          `https://final-project-2f61a-default-rtdb.firebaseio.com/users/${uniqIdEmal}.json`,
          {
            ...form,
            confirmPassword: "",
          }
        );

        setForm(initialForm);
        props.navigation.navigate("AddClass", {
          ...form,
          password: "",
          confirmPassword: "",
        });

        // saveCredentialsToStorage(

        // );
      } catch (e) {
        console.log(e);
      }
    } else {
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
