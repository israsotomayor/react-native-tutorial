/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Button,
    ListView,
    TouchableHighlight,
    Alert
} from 'react-native';

const instructions = Platform.select({
  ios: 'Presiona Cmd+R  para recargar,\n' +
    'Cmd+D o agita el celular para dev menu',
  android: 'Presiona doble R en tu teclado para recargar,\n' +
    'Agita o presiona el boton de menu for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(){
      super()

      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
      this.state = {
          dataSource: ds.cloneWithRows([])
      }
      }
      componentDidMount(){
        var titles =[];
        fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) =>{
                var movies = responseJson.movies;
                for (var i = 0; i < movies.length; i++) {
                    titles.push(movies[i].title);
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(titles)
                })
            })
      }
  render() {
    return (
      <View style={styles.container}>
          <ListView
              enableEmptySections = {true}
              dataSource = {this.state.dataSource}
            renderRow = {this.renderRow}
          />
      </View>
    );
  }
  static pressCell(dataRow){
    Alert.alert('Pelicula es: ', dataRow);
  }
  renderRow(dataRow){
      return(
      <TouchableHighlight onPress={() => App.pressCell(dataRow)}>
          <View style={styles.cell}>
              <Text>{dataRow}</Text>
          </View>
      </TouchableHighlight>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
      paddingTop: 30
  },
    cell: {
      borderBottomWidth:1,
        borderBottomColor: 'grey',
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center'
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'purple',
    marginBottom: 5,
  },
});