import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, FlatList } from "react-native";
import BtrButton from "../Components/BtrButton";

const HomeScreen = (props) => {
  const { email, name, classes } = props.route.params;
  const [search, setSearch] = useState("");

  const onSignOut = () => {
    props.navigation.navigate("SignIn");
  };

  const renderClass = ({ item }) => (
    <View style={styles.class}>
      <Text style={styles.className}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Hello, {name}!</Text>
      <View style={styles.body}>
        <TextInput
          style={styles.search}
          value={search}
          placeholder="Search Classes"
          onChangeText={(val) => setSearch(val)}
        />
        <FlatList
          data={classes.filter((classModel) =>
            classModel.name
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())
          )}
          renderItem={renderClass}
          keyExtractor={(item) => item.id}
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
  search: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#0f4d92",
    paddingHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
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
