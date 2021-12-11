import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorageStatic,
} from "react-native";
import Axios from "axios";
import { saveCredentialsToStorage } from "../util";
import BtrButton from '../Components/BtrButton';

const initialForm = {
  email: "",
  name: "",
  // class_1: "",
  // class_2: "",
  // class_3: "",
  // class_4: "",
  // class_5: "",
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
        const uniqIdEmal = form.email.replace('.', '');
        const response =  await Axios.patch(
          `https://final-project-2f61a-default-rtdb.firebaseio.com/users/${uniqIdEmal}.json`,
          {
            ...form,
          }
        ); 
        
        setForm(initialForm);
        props.navigation.navigate("Home", {
          ...form,
          password: "",
          confirmPassword: ""
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

  const onAddClass = () => {
    const copyClasses = [...form.classes];
    if(className == "" || copyClasses.includes(className)) {
      return;
    }
    const classModel = {
      id: Math.random().toString(),
      name: className,
      days: [],
      times: [],
      color: "black"
    }
    copyClasses.push(classModel);
    setForm({...form, classes: copyClasses});
    // Once added the class erases form value
    setClassName("");
  }

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
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
          {form.classes.map(element => (
            <Text key={element.id}>Class: {element.name}</Text>
          ))}
      </View>

      <View style={styles.classRow}>
        <TextInput
          style={styles.textInput}
          placeholder="Classes"
          value={className}
          onChangeText={(val) => setClassName(val)}
        />
        <BtrButton onPress={onAddClass} viewStyle={styles.addClassBtn} textStyle={styles.addClassBtnTxt}>+</BtrButton>
      </View>

      
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={form.password}
        secureTextEntry={true}
        onChangeText={(val) => setForm({ ...form, password: val })}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Confirm Password"
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
  classRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between'
  },
  addClassBtn: {
    backgroundColor: "#0f4d92",
    height: 40,
    // flex: 1,
    width: 50,
    // marginLeft: 10,
    borderRadius: 7,
    justifyContent: "center", 
    alignItems: "center", 
    flex: 1,
    marginBottom: 10

  },
  addClassBtnTxt: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
 
  },
  classView: {

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
