import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

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



  render() {
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
          item.data.email === auth.currentUser.email ? <Text>Posteo: {item.data.message}</Text>  : null }
        />
        
      </View>
    );
  }
}

export default Profile;