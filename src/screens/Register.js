import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebase/Config";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      registered: false,
      error: "",
    };
  }

  handleSubmit() {
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(db.collection('users').add({
        email: this.state.email,
        usuario: this.state.userName,
        createdAt: Date.now(),
    }))
      .then(() => this.props.navigation.navigate("Login"))
      .catch((error) => this.setState({ error: "Fallo el registro" }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Registro</Text>
        <TextInput style= {styles.input}
          keyboardType="default"
          placeholder="Ingrese su usuario"
          onChangeText={(text) => this.setState({ userName: text })}
          value={this.state.userName}
        />
        <TextInput style= {styles.input}
          keyboardType="email-address"
          placeholder="Ingrese su email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput style= {styles.input}
          placeholder="Ingrese su contraseña"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={[styles.button, styles.buttonSecondary]}
        >
        <Text>Acceder</Text>
        </TouchableOpacity>
        {/* <Text>Navegación cruzada a Login: </Text> */}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={styles.button}
        >
        <Text>Ya tengo cuenta</Text>
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
});

export default Register;