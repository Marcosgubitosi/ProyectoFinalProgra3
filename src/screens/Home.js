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
  render() {
    return (
      <View style={styles.container}>
        <Posts />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "darkgray",
  },
});

export default Home;