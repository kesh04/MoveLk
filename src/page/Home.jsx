import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
  TextInput,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { EvilIcons } from "@expo/vector-icons";

export default function Home() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: " MOVELK",
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
  }, []);
  const search = () => {
    navigation.navigate("Map");
  };

  return (
   
    <View style={styles.container}>
      <View style={styles.header}>
      
        <Text style={styles.text1}>Select Your Loaction </Text>

        <Pressable style={styles.inputContainer} onPress={search}>
          <View style={{ marginTop: 15 }}>
            <TextInput
              style={[styles.input, { paddingLeft: 40 }]}
              keyboardType="text"
              placeholder="Location"
              onPress={search}
            />

            <EvilIcons
              style={{ position: "absolute", right: 26, top: 17.8 }}
              name="search"
              size={24}
              color="black"
             
            />
          </View>
        </Pressable>
      </View>

        <Pressable onPress={search} style={styles.home}>
          <Image
            source={require("../../assets/images/bus.png")}
            style={styles.img1}
          />
          <Text style={{ padding:10,textAlign:"center", fontSize:30}}>D.S. PVT </Text>
        </Pressable>
     
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    
  },
  header: {
    height: "30%",
    borderRadius: 10,
  },
  input: {
    height: 55,
    marginHorizontal: 5,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#C0C0C0",
    borderColor: "#F7F7F7",
    borderWidth: 2,
  },
  text1: {
    color: "black",
    fontSize: 30,
    marginHorizontal: 20,
  textAlign:"center"
  },
  img1: {
    width: "100%",
    height: 170,
    bottom:-20
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: -10,
    marginLeft: 5,
    backgroundColor: "#FED339",
    width: "45%",
    height: "20%",
    flexDirection: "row",
  },
  text: {
    fontSize: 15,
    color: "white",
  },
  inputContainer: {
    marginHorizontal: 16,

    
  },
  home:{
    backgroundColor:"#FED339",
    borderRadius: 30,
    marginHorizontal:30,
    marginTop: -50,
    
  }
});
