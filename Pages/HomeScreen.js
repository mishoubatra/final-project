import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import BtrButton from "../Components/BtrButton";
import Axios from "axios";

const HomeScreen = (props) => {
  const { email, name, classes: myClasses } = props.route.params;
  const [search, setSearch] = useState("");
  const [people, setPeople] = useState([]);

  const onSignOut = () => {
    props.navigation.navigate("SignIn");
  };

  const onPerson = (email) => {
    const person = people.find((person) => person.email == email);
    props.navigation.navigate("PersonView", { ...person });
  };

  const renderPerson = ({ item }) => (
    <TouchableOpacity onPress={() => onPerson(item.email)}>
      <View style={styles.person}>
        <Text style={styles.personName}>{item.name}</Text>
        {/* <Text style={styles.numClasses}>{item.classes.length} classes</Text> */}
      </View>
    </TouchableOpacity>
  );

  // const getPeopleFromDB =
  // ONLY RUNS ONCE IN THIS COMPONENT (When it is born)
  useEffect(async () => {
    const response = await Axios.get(
      `https://final-project-2f61a-default-rtdb.firebaseio.com/users.json`
    );
    const { data } = response;
    const listOfPpl = Object.values(data);
    setPeople(listOfPpl);
  }, []);
  // const getPeople = () => {
  //   console.log("RUNS ONCE");
  // };

  // getPeople();
  const emailToId = (email) => {
    return email.replace(".", "").trim();
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Hello, {name}!</Text>
      <View style={styles.body}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.search}
            value={search}
            placeholder="Search People"
            onChangeText={(val) => setSearch(val)}
          />
        </View>
        {/* <FlatList
          data={myClasses.filter((classModel) =>
            classModel.name
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())
          )}
          renderItem={renderPerson}
          keyExtractor={(item) => item.id}
        /> */}
        <FlatList
          style={styles.people}
          data={people.filter((person) =>
            person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )}
          renderItem={renderPerson}
          keyExtractor={(item) => emailToId(item.email)}
        />
      </View>
      <View style={styles.addClassBtnContainer}>
        <BtrButton
          onPress={onSignOut}
          viewStyle={styles.addClassBtn}
          textStyle={styles.addClassBtnTxt}
        >
          Sign Out
        </BtrButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    flex: 1,
  },
  body: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 10,
  },
  search: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#0f4d92",
    paddingHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  people: {
    padding: 10,
  },
  person: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 25,
    marginBottom: 10,
    borderRadius: 10,
  },
  personName: {
    fontWeight: "700",
    fontSize: 18,
  },
  numClasses: {
    color: "#0f4d92",
  },
  addClassBtnContainer: {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
    // flexDirection: 'row'
  },
  addClassBtn: {
    backgroundColor: "#0f4d92",
    flex: 1,
    borderRadius: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 20,
    marginBottom: 10,
    bottom: 0,
  },
  addClassBtnTxt: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    // fontFamily: "Arial",
    margin: 10,
    fontWeight: "bold",
    fontSize: 40,
  },
});

export default HomeScreen;
