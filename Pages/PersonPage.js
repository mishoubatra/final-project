import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const PersonPage = (props) => {
  const { email, classes, name } = props.route.params;

  const renderDays = (myClass) => {
    const days = [];

    for (const day of Object.keys(myClass.days)) {
      if (myClass.days[day].yes) {
        days.push(
          <Text>
            {day} - {myClass.days[day].time}
          </Text>
        );
      }
    }

    return days.map((day) => day);
  };

  const MyClass = ({ item }) => (
    <View style={styles.myClass} key={item.id}>
      <Text style={styles.myClassName}>{item.name}</Text>
      {renderDays(item)}
    </View>
  );

  return (
    <View style={styles.screen}>
      {/* {classes.map((myClass) => (
        <View key={myClass.id}>
          <Text>{myClass.name}</Text>
        </View>
      ))} */}
      <FlatList
        style={styles.classes}
        data={classes}
        renderItem={MyClass}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  classes: {
    padding: 10,
  },
  myClass: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#0f4d92",
  },
  myClassName: {
    fontWeight: "700",
    fontSize: 18,
  },
});

export default PersonPage;
