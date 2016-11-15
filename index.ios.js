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
    this.itemsRef = firebaseApp.database().ref();
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />

        <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} style={styles.listview} />

        <ActionButton title="Add" onPress={this._addItem.bind(this)}></ActionButton>

      </View>
    );
  }

  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

  _renderItem(item) {

    const onPress = () => {
      AlertIOS.prompt(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
        'default'
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }
};

AppRegistry.registerComponent('GroceryApp', () => GroceryApp);
