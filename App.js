/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import params from './src/params'
import Field from './src/components/Fields'
class App extends Component{

  render(){
    return <View style={styles.container}>
      <Text style={styles.welcome}> MINES </Text>
      <Text style={styles.welcome}> have {params.getRowsAmount()} X {params.getColumnsAmount()} </Text>
      <Field></Field>
      <Field opened></Field>
      <Field opened nearMines={1}></Field>
      <Field opened nearMines={2}></Field>
      <Field opened nearMines={5}></Field>
      <Field opened nearMines={8}></Field>

      <Field mined></Field>
      <Field mined opened></Field>
      <Field mined opened exploded></Field>
    </View>
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
})

export default App;
