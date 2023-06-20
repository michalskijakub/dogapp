import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import axios from "axios";

const DogListScreen = () => {
  const [dogs, setDogs] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    try {
      const response = await axios.get("https://dog.ceo/api/breeds/list/all");
      const data = response.data.message;
      const dogList = Object.keys(data);
      setDogs(dogList);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchImage = async (breed) => {
    try {
      const response = await axios.get(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );
      const imageUrl = response.data.message;
      setImageUrl(imageUrl);
      setModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setImageUrl(null);
  };

  const renderDogItem = ({ item }) => (
    <TouchableOpacity onPress={() => fetchImage(item)} style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dogs}
        renderItem={renderDogItem}
        keyExtractor={(item) => item}
        onEndReached={fetchDogs}
        onEndReachedThreshold={0.5}
      />

      <Modal visible={isModalVisible} onRequestClose={closeModal}>
        <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
          {imageUrl && (
            <Image source={{ uri: imageUrl }} style={styles.modalImage} />
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: "white",
  },
  itemText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  modalImage: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
});

export default DogListScreen;
