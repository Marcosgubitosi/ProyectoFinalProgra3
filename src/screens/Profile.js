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

    };
  }



  render() {
    const uEmail = auth.currentUser
    console.log(uEmail);
    
    return (
      <View>
        
      </View>
    );
  }
}

export default Profile;