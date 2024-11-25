import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import firebase from "firebase";
import AntDesign from '@expo/vector-icons/AntDesign';


import { auth, db } from "../firebase/Config";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      posteos: [],
    };
  }
  componentDidMount() {
    db.collection('users').onSnapshot(
      docs => {
        let usuarios = [];
        docs.forEach(doc => {
          usuarios.push({
            id: doc.id,
            data: doc.data()
          })
          this.setState({
            usuarios: usuarios,
          })
        })
      })
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
      docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })})
          this.setState({
            posteos: posts,
          })
      })
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
        // console.log('Documento eliminado correctamente');
      })
      .catch((error) => {
        console.error('Error al eliminar el documento:', error);
      });
  }



  render() {
    
    // console.log(this.state.usuarios);
    
    
    const uEmail = auth.currentUser.email
    const cantidadPosteos = this.state.posteos.filter(
      posteo => posteo.data.email === uEmail).length;

    const filteredUsers = this.state.usuarios.filter(user => user.data.email === uEmail);
    

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Mi perfil</Text>
        <View style={styles.profileInfo}>

          <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text style={styles.profileText}>Nombre: {item.data.usuario} </Text> 
          }
        />
        <Text style={styles.profileText}>Email: {auth.currentUser.email}</Text>
        <Text style={styles.profileText}>Cantidad de posteos: {cantidadPosteos}</Text>
        </View>
        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
            item.data.email === auth.currentUser.email ? (
              <View style={styles.postContainer}>
                <Text style={styles.postText}>Posteo: {item.data.message}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => this.handleDelete(item.id, item.data)}
                >
                  <Text style={styles.deleteText}>Eliminar</Text>
                  <AntDesign name='delete' size = {20} color="black" />
                </TouchableOpacity>
              </View>
            ) : null
          }
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "darkgray",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    color: "white",
    alignSelf: "center"
  },
  profileInfo: {
    borderWidth: 4,
    borderColor: "#44aa26",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    
  },
  profileText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  postContainer: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  postText: {
    fontSize: 18,
    color: "#333",
    // alignSelf: "flex-start"
  },
  deleteButton: {
    backgroundColor: "#ff4444", 
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: "#ff9e00",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Profile;