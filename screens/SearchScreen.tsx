import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";

const SearchScreen = () => {
  const [breed, setBreed] = useState("");
  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!breed) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );
      const { message } = response.data;
      setDogImage(message);
      setError("");
    } catch (error) {
      setDogImage("");
      setError("Nie znaleziono takiej rasy psa");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Wyszukiwanie rasy psa</Text>
      <TextInput
        style={styles.input}
        placeholder="Wpisz nazwę rasy"
        value={breed}
        onChangeText={setBreed}
      />
      <Button title="Szukaj" onPress={handleSearch} />
      {loading ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="#0000ff"
        />
      ) : (
        <>
          {dogImage ? (
            <Image source={{ uri: dogImage }} style={styles.image} />
          ) : (
            <Text style={styles.errorText}>{error}</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
});

export default SearchScreen;
