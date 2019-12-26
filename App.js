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
  Alert,
} from 'react-native';

import params from './src/params'
import MineField from './src/components/MineField'
import { createMinedBoard, cloneBoard, hasExplosion, openfield, wonGame, showMines, invertFlag  } from './src/logic'
class App extends Component{

  constructor(props){
    super(props)
    this.state = this.createState()
  }

  MinesBoard =()  => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  } 

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(cols,rows,this.MinesBoard()),
      won: false,
      lost: false,
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openfield(board, row, column)
    const lost = hasExplosion(board)
    const won = wonGame(board)

    if(lost) {
      showMines(board)
      Alert.alert('tente de novo... da proxima voce vai conseguir :(')
    }else if(won){
      Alert.alert('Parabens voce e incrivel ;)')
    }

    this.setState({board, lost, won})
  }

  onSelectField = (row, column) =>{
    const board = cloneBoard(this.state.board)
    invertFlag(board,row,column)
    const won = wonGame(board)
    if(won){
      Alert.alert('Parabens voce e incrivel ;)')
    }

    this.setState({board, won})
  }

  render(){
    return <View style={styles.container}>
      <Text style={styles.welcome}> MINES </Text>
      <Text style={styles.welcome}> have {params.getRowsAmount()} X {params.getColumnsAmount()} </Text>
      <View style={styles.board}>
        <MineField onSelectField={this.onSelectField} onOpenField={this.onOpenField} board={this.state.board} />
      </View>
    </View>
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  board:{
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#bfd3e2",
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: '#aaa',
  }
})

export default App;
