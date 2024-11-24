import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";

import { auth, db } from "../firebase/Config";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      error: "",
      usuarios: []
    };
  }

componentDidMount() {
    console.log(this.state.message);
    db.collection('users')
        .onSnapshot(docs => {
            let usuarios = [];
            docs.forEach(doc => {
                // console.log(doc.data);
                usuarios.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            console.log(usuarios);
            this.setState({
                usuarios: usuarios,
            });
        }, error => {
            console.error("Error al obtener los documentos:", error);
        });

}

  render() {
    const usuariosFiltrados = this.state.usuarios.filter((usuario) =>
      usuario.data.email.toLowerCase().includes(this.state.message.toLowerCase())
    );
    // {console.log(usuariosFiltrados)}    
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Search</Text>
        <TextInput style={styles.input}
          keyboardType="default"
          placeholder="Ingrese el email"
          onChangeText={(text) => this.setState({ message: text })}
          value={this.state.message}
        />
        <TouchableOpacity
          // onPress={() => this.handleSubmit()}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text style = {styles.submitText}>Search</Text>
        </TouchableOpacity>

        <View style={styles.listContainer}>
        {usuariosFiltrados.length > 0 ? ( 
          (this.state.message == '' ? 
            <View style={styles.escribaContainer}>
              <Text style={styles.searchText}>Escriba algo por favor</Text>
            </View> 
          : 
          (<FlatList
            data={usuariosFiltrados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.searchContainer}>
                <Text style={styles.searchText}>Email: {item.data.email}</Text>
                <Text style={styles.searchText}>Usuario: {item.data.usuario}</Text>
              </View>
          )}
          />) 
        )
        ) : (
            <View style={styles.neContainer}>
              <Text style={styles.neText}>No se encontraron usuarios con ese email</Text>
            </View>
  )}
  </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
    justifyContent: "flex-start", 
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
    fontSize: 25,
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
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  searchContainer: {
    borderWidth: 4,
    borderColor: "#44aa26",
    flexDirection: "column", 
    // justifyContent: "space-between", 
    alignItems: "flex-start", 
    marginBottom: 15,
    marginTop: 30,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  searchText: {
    fontSize: 18,
    color: "#333",
  },
  neContainer: {
    borderWidth: 4,
    borderColor: "red",
    flexDirection: "column", 
    alignItems: "flex-start", 
    marginBottom: 15,
    marginTop: 30,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  neText: {
    fontSize: 18,
    color: "red",
  },
  escribaContainer: {
    borderWidth: 4,
    borderColor: "#ff9e00",
    flexDirection: "column", 
    alignItems: "flex-start", 
    marginBottom: 15,
    marginTop: 30,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  listContainer: {
    flex: 1, 
    width: "50%",
  },
});

export default Search;