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
        <TextInput
          keyboardType="default"
          placeholder="Ingrese su posteo"
          onChangeText={(text) => this.setState({ message: text })}
          value={this.state.message}
        />
        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text>Post</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#51b9e9",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: "#ffa500",
  },
});

export default NuevoPost;