import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Axios from "axios";
import BtrButton from "../Components/BtrButton";

const AddClassPage = (props) => {
  const initialClass = {
    name: "",
    days: [],
    color: "black",
  };

  const initialDays = {
    M: { yes: false, time: "" },
    T: { yes: false, time: "" },
    W: { yes: false, time: "" },
    Th: { yes: false, time: "" },
    F: { yes: false, time: "" },
  };
  const { params } = props.route;
  const [myClasses, setMyClasses] = useState([]);
  const [myClass, setMyClass] = useState(initialClass);
  const [days, setDays] = useState(initialDays);

  const onAddClass = () => {
    const copyClass = { ...myClass };
    copyClass.id = Math.random().toString();
    copyClass.days = days;

    setDays(initialDays);
    setMyClass(initialClass);
    setMyClasses(myClasses.concat(copyClass));
    console.log(myClasses);
  };

  const onDone = async () => {
    const uniqIdEmal = params.email.replace(".", "");
    console.log(uniqIdEmal);
    const response = Axios.patch(
      `https://final-project-2f61a-default-rtdb.firebaseio.com/users/${uniqIdEmal}.json`,
      { classes: myClasses }
    );
    // * Forward all the form data from sign up to Home [params]
    props.navigation.navigate("Home", { ...params });
  };

  const onDay = (day) => {
    const copyDays = { ...days };
    copyDays[day].yes = !copyDays[day].yes;
    setDays(copyDays);
  };

  const onTime = (day, time) => {
    const copyDays = { ...days };
    copyDays[day].time = time;
    setDays(copyDays);
  };

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
