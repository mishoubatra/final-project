import React from "react";
import { StyleSheet, View, Text, Button, FlatList } from "react-native";
import BtrButton from '../Components/BtrButton';

const HomeScreen = (props) => {
  const {
    email,
    name,
    classes
  } = props.route.params; 
  console.log(classes)

  const onSignOut = () => {
    props.navigation.navigate("SignIn");
  }

  const renderClass = ({ item }) => (
    <View style={styles.class}>
      <Text style={styles.className}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title} >Hello, {name}!</Text>
      <View style={styles.body}>
        <FlatList 
          data={classes}
          renderItem={renderClass}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.addClassBtnContainer}>
        <BtrButton onPress={onSignOut} viewStyle={styles.addClassBtn} textStyle={styles.addClassBtnTxt} >Sign Out</BtrButton>
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
    flex: 1
  },
  addClassBtnContainer: {
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20
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
    bottom: 0
  },
  addClassBtnTxt: {
    color: "white",
    fontWeight: "bold"
  },
  title: {
    // fontFamily: "Arial",
    margin: 10,
    fontWeight: "bold",
    fontSize: 40
  }
});

export default HomeScreen;
