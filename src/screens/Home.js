import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Posts from "../components/Posts";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {
    return (
      <View>
        <Posts/>
      </View>
    );
  }
}

export default Home;