import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Axios from "axios";
import BtrButton from "../Components/BtrButton";

const AddClassPage = (props) => {
  // The structure of a single class
  const initialClass = {
    name: "",
    days: [],
    color: "black",
  };

  // The structure of days and time
  const initialDays = {
    M: { yes: false, time: "" },
    T: { yes: false, time: "" },
    W: { yes: false, time: "" },
    Th: { yes: false, time: "" },
    F: { yes: false, time: "" },
  };
  // Gets the parameters that were sent from the Previous page (SignUpPage) everything but the password and confirm password
  const { params } = props.route;
  // The list of classes
  const [myClasses, setMyClasses] = useState([]);
  // The current class that will be added to [myClasses]
  const [myClass, setMyClass] = useState(initialClass);
  // Handles what day and time the [myClass] will be
  const [days, setDays] = useState(initialDays);

  // When the add class button is clicked execute
  const onAddClass = () => {
    // Makes a copy of [myClass]
    const copyClass = { ...myClass };
    // Makes a uniqe id for it
    copyClass.id = Math.random().toString();
    // Adds the days object to the myClass so that it is linked to it
    copyClass.days = days;

    // Clear the days form
    setDays(initialDays);
    // Clear the myClass form
    setMyClass(initialClass);
    // Add the new class to the myClasses list
    setMyClasses(myClasses.concat(copyClass));
  };

  // When finished you click done and this executes
  const onDone = async () => {
    // Removes period from the email
    const uniqIdEmal = params.email.replace(".", "");

    // Finds the user using the uniqIdEmail and then adds the classes that you just added
    const response = Axios.patch(
      `https://final-project-2f61a-default-rtdb.firebaseio.com/users/${uniqIdEmal}.json`,
      { classes: myClasses }
    );

    // Clear the my Classes list
    setMyClasses([]);
    // * Forward all the form data from sign up screen to Home screen [params]
    props.navigation.navigate("Home", { ...params });
  };

  // When a day buttons is pressed execute this
  const onDay = (day) => {
    // Make a copy of days
    const copyDays = { ...days };
    // Toggle the day (enabled/disabled)
    copyDays[day].yes = !copyDays[day].yes;
    // Update the days state object
    setDays(copyDays);
  };

  // When time is being written in the input execute this
  const onTime = (day, time) => {
    // Copy days
    const copyDays = { ...days };
    // Set the time to the current value of the input
    copyDays[day].time = time;
    // Update the days state object
    setDays(copyDays);
  };

  // Creates the buttons for M,T,W,Th,F
  const renderDaysOfTheWeek = () => {
    const buttons = [];
    for (let day of Object.keys(initialDays)) {
      buttons.push(
        <View key={day}>
          <BtrButton
            viewStyle={{
              ...styles.dayBtn,
              backgroundColor: days[day].yes ? "#0f4d92" : "grey",
            }}
            textStyle={styles.dayBtnTxt}
            onPress={() => onDay(day)}
          >
            {day}
          </BtrButton>
        </View>
      );
    }

    return buttons.map((button) => button);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.classForm}>
        <TextInput
          style={styles.textInput}
          placeholder="Class Name"
          value={myClass.name}
          onChangeText={(val) => setMyClass({ ...myClass, name: val })}
        />

        <View style={styles.dayBtns}>{renderDaysOfTheWeek()}</View>
        <BtrButton
          onPress={onAddClass}
          viewStyle={styles.addClassBtn}
          textStyle={styles.addClassBtnTxt}
        >
          Add Class
        </BtrButton>
        {Object.keys(days).map(
          (day) =>
            days[day].yes && (
              <TextInput
                key={day}
                placeholder={`${day} from XX:XX PM to XX:XX pm`}
                style={styles.textInput}
                onChangeText={(val) => onTime(day, val)}
                value={days[day].time}
              />
            )
        )}

        {myClasses.map((aClass) => (
          <View key={aClass.id}>
            <Text>{aClass.name}</Text>
          </View>
        ))}
        <Button style={styles.doneBtn} title="Done" onPress={onDone} />
      </View>
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
  classForm: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "center",
  },
  addClassBtn: {
    backgroundColor: "#0f4d92",
    height: 40,
    // flex: 1,
    paddingHorizontal: 10,
    // marginLeft: 10,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },
  dayBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  dayBtn: {
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 5,
  },
  dayBtnTxt: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  addClassBtnTxt: {
    color: "white",
    // fontSize: 30,
    fontWeight: "700",
  },
  classView: {},
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#0f4d92", // yale blue #0f4d92
    paddingHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
  },

  doneBtn: {
    marginBottom: 15,
  },
});

export default AddClassPage;
