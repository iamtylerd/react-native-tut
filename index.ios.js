/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import ReactNative from 'react-native';
import * as firebase from 'firebase';
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const styles = require('./styles.js');

const {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} = ReactNative;



// Initialize Firebase
const firebaseConfig = {
  apiKey: "",
  authDomain: "react-native-tutorial-9f3b0.firebaseapp.com",
  databaseURL: "https://react-native-tutorial-9f3b0.firebaseio.com",
  storageBucket: "",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

//App
class GroceryApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  componentDidMount() {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
      })
    }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />

        <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} style={styles.listview} />

        <ActionButton title="Add" />

      </View>
    );
  }

  _renderItem(item) {
      return (
        <ListItem item={item}  />
      );
  }
};

AppRegistry.registerComponent('GroceryApp', () => GroceryApp);
