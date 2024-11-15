import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import {db, auth} from '../firebase/Config'
import firebase from "firebase";


class Posts extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    
    this.state = {
        posts: []
    };
  }

  componentDidMount(){
    db.collection('posts').onSnapshot(
        docs =>{
                let posts = [];
           docs.forEach( doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
        })
               this.setState({
                posts: posts,
                loading: false
           })
        })
    })
}
handleLike(index){
  // console.log(this.state.posts[index].data);
  
  const uEmail = auth.currentUser.email;
  const id = this.state.posts[index].id
  const likes = this.state.posts[index].data.likes
    if (likes.includes(uEmail)) {
      db.collection('posts').doc(id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(uEmail)
      });
    } else {
      db.collection('posts').doc(id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(uEmail)
      });
    }
}

  render() {
    return (
      <View style={styles.container}>
        <FlatList
        data={ this.state.posts }
        keyExtractor={ item => item.id.toString() }
        renderItem={ ({item, index}) => 
        <View style={styles.postContainer}> 
          <Text>{item.data.email}: {item.data.message} </Text>
          <Text>Likes: {item.data.likes.length}</Text>
          <TouchableOpacity onPress={() => this.handleLike(index)}> <Text style={styles.likeButtonText}>{item.data.likes.includes(auth.currentUser.email) ? "Quitar Like" : "Like"}</Text></TouchableOpacity>
        </View> 
        }
        />        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  postContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  likeButtonText: {
    color: '#007bff',
    marginTop: 10,
    fontSize: 16,
  },
  
});

export default Posts;
