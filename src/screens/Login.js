import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator
} from "react-native";
import {auth} from '../firebase/Config'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      logued: false,
      error: "",
    };
  }

  // componentDidMount(){
  //   auth.onAuthStateChanged(user => console.log('El usuario es:', JSON.stringify(user,null,4)))
  // }

  handleSubmit() {
    
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => this.setState({ logued: true }))
      .then( ()=>  this.props.navigation.navigate("HomeMenu"))
      .catch((error) => this.setState({ error: "El email o contraseña son incorrectos" }));    
  }

  render() {
    
    return (

      <View style={styles.cont}>
      {this.state.logued ? (<ActivityIndicator size='large' color='green' />
      ): (
      <View style={styles.container}>
        <Text style={styles.heading}>Ingresar</Text>
        <TextInput style= {styles.input}
          keyboardType="email-address"
          placeholder="Ingrese su email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput style= {styles.input}
          placeholder="Ingrese su contrasena"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        {this.state.error != '' ?  <Text> {this.state.error} </Text>: <Text> </Text>}
        
        <TouchableOpacity onPress={() => this.handleSubmit() }  style={[styles.button, styles.buttonSecondary]}>
          <Text>Acceder</Text>
        </TouchableOpacity>
        {/* <Text>Navegación cruzada a Register: </Text> */}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
          style={styles.button}
        >
          <Text>No tengo cuenta</Text>
        </TouchableOpacity>     
      </View>
    ) }
    </View>
    )}
  }

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'darkgray'
  },
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

export default Login;