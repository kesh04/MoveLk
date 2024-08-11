import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Map = () => {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        onPress={(data, details = null) => {
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
        query={{
          key: 'env.GOOGLE_MAP',
          language: 'en',
        }}
        styles={{
          container: { flex: 0 },
          listView: { backgroundColor: 'white' },
        }}
      />
      {region && (
        <MapView
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
        >
          <Marker coordinate={region} />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
