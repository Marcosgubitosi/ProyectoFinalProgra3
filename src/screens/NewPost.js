import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth, db } from "../firebase/Config";

class NuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      error: "",
    };
  }

  handleSubmit() {
        db.collection('posts').add({
        email: auth.currentUser.email,
        message: this.state.message,
        likes: [],
        createdAt: Date.now()})
      .then(() => this.props.navigation.navigate("Home"))
      .catch((error) => this.setState({ error: "Fallo el nuevo posteo" }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>New Post</Text>
        <TextInput style={styles.input}
          keyboardType="default"
          placeholder="Ingrese su posteo"
          onChangeText={(text) => this.setState({ message: text })}
          value={this.state.message}
        />
        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text style = {styles.postText}>Post</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "darkgray", 
  },
  input: {
    width: "50%", 
    height: 45,
    marginBottom: 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#44aa26",
    paddingHorizontal: 15,
    backgroundColor: "white", 
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    color: "white",
  },
  button: {
    backgroundColor: "#ff9e00",
    borderRadius: 5,
    padding: 10,
    width: "50%", 
    alignItems: "center",
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: "#44aa26",
  },
  postText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default NuevoPost;