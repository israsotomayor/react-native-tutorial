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
  View, Button
} from 'react-native';
import ComponenteTexto from './ComponenteTexto'

const instructions = Platform.select({
  ios: 'Presiona Cmd+R  para recargar,\n' +
    'Cmd+D o agita el celular para dev menu',
  android: 'Presiona doble R en tu teclado para recargar,\n' +
    'Agita o presiona el boton de menu for dev menu',
});

export class Loading extends Component {
    render(){
        return(
            <Text>Loading...</Text>
        )
    }
}

export class ChildComponent extends Component{
    render(){
        if(this.props.result){
          var rest = this.props.result.map((item, i) =>{
                return(
                    <Text key = {i}>{item.title}</Text>
                )
            })
        }
        return(
            <View>
                {this.props.result ? rest : <Loading/>}
                <View style={this.props.status ? styles.on : styles.off}/>
            </View>
        )
    }
}

type Props = {};
export default class App extends Component<Props> {
  constructor(){
      super()
      this.state = {
          status: false,
          data: null
      }
      }
      componentDidMount(){
        fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) =>{
                this.setState({
                    data: responseJson.movies
                })
            })
      }
  clicked(){
    this.setState({
        status: !this.state.status
    })
  }
  render() {
    return (
      <View style={styles.container}>
          <ChildComponent status={this.state.status} result = {this.state.data}/>
          <Button
              onPress={this.clicked.bind(this)}
              title = 'Click Here'
              color = 'red'
          />
        <ComponenteTexto/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
    on:{
      width: 100,
        height: 100,
        backgroundColor: 'yellow'
    },
    off:{
        width:100,
        height:100,
        backgroundColor: 'black'
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