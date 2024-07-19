

// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Pressable,
//   TextInput,
//   Image,
//   StyleSheet,
// } from "react-native";
// import React, { useLayoutEffect } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { EvilIcons } from "@expo/vector-icons";
// import Bus from "../../assets/images/bus.png";

// export default function Search() {
  // const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     title: " MOVELK",
  //     headerTitleStyle: {
  //       color: "white",
  //       fontSize: 20,
  //       fontWeight: "bold",
  //       paddingHorizontal: "30%",
  //     },
  //     headerStyle: {
  //       backgroundColor: "#FED339",
  //       height: 100,
  //     },
  //     headerLeft: () => (
  //       <Image
  //         source={Bus}
  //         style={{
  //           width: 40,
  //           height: 40,
  //           marginLeft: 10,
  //           borderRadius: 50,
  //           backgroundColor: "red",
  //         }}
  //       />
  //     ),
  //   });
  // }, [navigation]);

//   return (
//     <ScrollView>
//       <View style={styles.inputContainer}>
//         <View>
//           <TextInput
//             style={[styles.input, { paddingLeft: 40 }]}
//             keyboardType="email-address"
//             placeholder="TO"
//           />
//           <EvilIcons
//             style={{ position: "absolute", left: 26, top: 17.8 }}
//             name="location"
//             size={24}
//             color="black"
//           />
//           <View style={{ marginTop: 15 }}>
//             <TextInput
//               style={[styles.input, { paddingLeft: 40 }]}
//               keyboardType="email-address"
//               placeholder="WHERE"
//             />

            // <EvilIcons
            //   style={{ position: "absolute", left: 26, top: 17.8 }}
            //   name="location"
            //   size={24}
            //   color="black"
            // />
//           </View>

//           <TouchableOpacity
//             style={{
//               marginHorizontal: 20,
//               marginTop: 20,
//               borderRadius: 10,
//               borderColor: "#FED339",
//               borderWidth: 0,
//               paddingVertical: 10,
//               backgroundColor: "#FED339",
//             }}
//           >
//             <Text
//               style={{
//                 textAlign: "center",
//                 fontSize: 16,
              
//                 color: "black",
//               }}
//             >
//               Search
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }
// const styles = StyleSheet.create({
//   signInImage: {
//     width: "60%",
//     height: 250,
//     alignSelf: "center",
//     marginTop: 50,
//   },
//   welcomeText: {
//     textAlign: "center",
//     fontSize: 24,
//   },
//   learningText: {
//     textAlign: "center",
//     color: "#575757",
//     fontSize: 15,
//     marginTop: 5,
//   },
//   inputContainer: {
//     marginHorizontal: 16,
//     marginTop: 30,
//     rowGap: 30,
//   },
//   input: {
//     height: 55,
//     marginHorizontal: 16,
//     borderRadius: 10,
//     fontSize: 16,
//     backgroundColor: "white",
//     borderColor: "#FED339",
//     borderWidth: 2,
//   },
//   visibleIcon: {
//     position: "absolute",
//     left: 30,
//     top: 15,
//   },
//   icon2: {
//     position: "absolute",
//     left: 23,
//     top: 17.8,
//     marginTop: -2,
//   },
//   forgotSection: {
//     marginHorizontal: 16,
//     textAlign: "right",
//     fontSize: 16,
//     marginTop: 10,
//   },
//   signupRedirect: {
//     flexDirection: "row",
//     marginHorizontal: 16,
//     justifyContent: "center",
//     marginBottom: 20,
//     marginTop: 20,
//   },
//   errorContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 16,
//     position: "absolute",
//     top: 60,
//   },
// });

import React, { useLayoutEffect, useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Button, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Bus from "../../assets/images/bus.png";
import data from '../../data.json';

import BusSearch from "./BusSearch";

export default function Search() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "MOVELK",
      headerTitleStyle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        paddingHorizontal: "30%",
      },
      headerStyle: {
        backgroundColor: "#FED339",
        height: 100,
      },
      // headerLeft: () => (
      //   <Image
      //     source={Bus}
      //     style={{
      //       width: 40,
      //       height: 40,
      //       marginLeft: 10,
      //       borderRadius: 50,
      //       backgroundColor: "red",
      //     }}
      //   />
      // ),
    });
  }, [navigation]);

  const [from, setFrom] = useState('');
  const [to, setTO] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSearchPress = () => {
    if (!from || !to) {
      setErrorMessage('Please enter your starting and destination locations.');
      return;
    }

    setIsLoading(true);
    setSearchResults([]);
    setErrorMessage('');

    const filteredData = data.filter(item =>
      item.from.toLowerCase().includes(from.toLowerCase()) &&
      item.to.toLowerCase().includes(to.toLowerCase())
    );

    if (filteredData.length === 0) {
      setErrorMessage('No available data for the entered locations.');
    } else {
      setSearchResults(filteredData);
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Search</Text>

        <TextInput
          value={from}
          onChangeText={setFrom}
          placeholder="From"
          style={styles.input}
        />

        <TextInput
          value={to}
          onChangeText={setTO}
          placeholder="To"
          style={styles.input}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <Button title="Search" onPress={onSearchPress} />
      </View>

      {isLoading && <Text>Loading...</Text>}

      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <BusSearch flight={item} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  card: {
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  title: {
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 16,
    marginVertical: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  list: {
    marginHorizontal: 10,
  },
});
