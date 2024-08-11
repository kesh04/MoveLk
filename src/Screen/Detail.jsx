import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

const Detail = ({ route, navigation }) => {
  const { uid } = route.params; // Retrieve uid from route parameters
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!name || !email) {
      Alert.alert("Validation Error", "Please enter both name and email.");
      return;
    }

    try {
      await firestore().collection("user").doc(uid).set({
        name,
        email,
      });
      Alert.alert("Success", "Your details have been saved.");
      navigation.navigate("TabNavigation");
    } catch (error) {
      console.log("Error saving user details", error);
      Alert.alert("Error", "There was an error saving your details. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#BEBDB8",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#FED339",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default Detail;
