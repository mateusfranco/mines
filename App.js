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
import Header from './src/components/Header'
import Level from './src/screen/LevelSelection'

import { createMinedBoard, cloneBoard, hasExplosion, openfield, wonGame, showMines, invertFlag, flagsUsed  } from './src/logic'
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
      showLevel: false,
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

  onLevelSelect = level =>{
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render(){
    return <View style={styles.container}>
      <Level visible={this.state.showLevel}
       onLevelSelected={this.onLevelSelect} 
       onCancel={()=>this.setState({showLevel: false})}></Level>
      <Header flagsLeft={this.MinesBoard() - flagsUsed(this.state.board)}
        onNewGame={()=>this.setState(this.createState())}
        onFlagPress={()=>this.setState({showLevel: true})}
      ></Header>
      <View style={styles.board}>
        <MineField onSelectField={this.onSelectField} onOpenField={this.onOpenField} board={this.state.board} />
      </View>
    </View>
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
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
