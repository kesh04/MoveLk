import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Profile() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "MOVELK",
      headerTitleStyle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        paddingHorizontal: "35%",
      },
      headerStyle: {
        backgroundColor: "#FED339",
        height: 100,
      },
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userDoc = await firestore()
            .collection("user")
            .doc(user.uid)
            .get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            if (userData) {
              setName(userData.name || "");
              setEmail(userData.email || "");
            } else {
              console.log("No user data found");
            }
          } else {
            console.log("User document does not exist");
          }
        }
      } catch (error) {
        console.log("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log("ERROR ", error);
    }
  };
  const handleDeleteAccount = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        await firestore().collection("user").doc(user.uid).delete();
        await user.delete();
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    } catch (error) {
      console.log("Error deleting account: ", error);
      Alert.alert("Error", "Failed to delete account. Please try again.");
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          onPress: handleLogout,
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  const confirmDeleteAccount = () => {
    Alert.alert(
      "Confirm Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: handleDeleteAccount,
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={{ marginHorizontal: 20, marginTop: 10, rowGap: 10 }}>
      <View
       
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          borderRadius: 10,
          borderColor: "#FED339",
          borderWidth: 0,
          paddingVertical: 10,
          backgroundColor: "#FED339",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          name="user"
          size={20}
          color="black"
          style={{ marginRight: 20 }}
        />
        <Text
          style={{
            fontSize: 20,
            color: "black",
            marginRight: 40,
          }}
        >
          {name}
        </Text>
      </View>
      <View
       
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          borderRadius: 10,
          borderColor: "#FED339",
          borderWidth: 0,
          paddingVertical: 10,
          backgroundColor: "#FED339",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          name="envelope-o"
          size={20}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text
          style={{
            fontSize: 20,
            color: "black",
          }}
        >
          {email}
        </Text>
      </View>
      
      <TouchableOpacity
        onPress={confirmDeleteAccount}
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          borderRadius: 10,
          borderColor: "#FED339",
          borderWidth: 0,
          paddingVertical: 10,
          backgroundColor: "#FED339",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          name="trash-o"
          size={20}
          color="black"
          style={{ marginRight: 20 }}
        />
        <Text
          style={{
            fontSize: 20,
            color: "black",
            marginRight: 30,
          }}
        >
          Delete Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={confirmLogout}
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          borderRadius: 10,
          borderColor: "#FED339",
          borderWidth: 0,
          paddingVertical: 10,
          backgroundColor: "#FED339",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          name="sign-out"
          size={20}
          color="black"
          style={{ marginRight: 20 }}
        />
        <Text
          style={{
            fontSize: 20,
            color: "black",
            marginRight: 40,
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
