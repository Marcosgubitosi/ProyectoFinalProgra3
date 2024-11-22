import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import firebase from "firebase";

import { auth, db } from "../firebase/Config";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      usuarios: [],
      posteos: [],
      loading: true

    };
  }
  componentDidMount() {    
    db.collection('users').onSnapshot(
        docs =>{
                let posts = [];
           docs.forEach( doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
        })
               this.setState({
                usuarios: posts,
                loading: false
           })
        })})
    db.collection('posts').onSnapshot(
        docs =>{
                let posts = [];
           docs.forEach( doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
        })
               this.setState({
                posteos: posts,
                loading: false
           })
        })})
  }
  logout() {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => console.log(error));
  }
  handleDelete(id, data) {
      db.collection('posts').doc(id).delete()
      .then(() => {
        console.log('Documento eliminado correctamente');
      })
      .catch((error) => {
        console.error('Error al eliminar el documento:', error);
      });
  }



  render() {
    // console.log(this.state.posteos);

    const uEmail = auth.currentUser.email
    const cantidadPosteos = this.state.posteos.filter(
      posteo => posteo.data.email === uEmail).length;
    
    return (
      <View>
        <Text> Mi perfil </Text>
        <FlatList
          data={this.state.usuarios}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => item.data.email === auth.currentUser.email ? <Text>nombre:{item.data.usuario}</Text> : null }
        />
        <Text>Email: {auth.currentUser.email}</Text>
        <Text>Cantidad de posteos: {cantidadPosteos}</Text>
        <FlatList
          data={this.state.posteos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => 
          item.data.email === auth.currentUser.email ? 
          <View>
          <Text>Posteo: {item.data.message}</Text>
          <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => this.handleDelete(item.id, item.data)}
                >
                  <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
          : null }
        />
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => this.logout()}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  logoutText: {
    color: "white",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default Profile;