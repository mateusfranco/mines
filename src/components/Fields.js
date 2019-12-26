import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import Mine from './Mine'
import params from '../params'
import Flag from './Flag'

export default props=>{
    const {mined, opened, nearMines, exploded, flagged} = props

    let styleField = [styles.field]
    if(opened) styleField.push(styles.opened)
    if(exploded) styleField.push(styles.exploded)
    if(flagged) styleField.push(styles.flagged)
    if(!opened && !exploded) styleField.push(styles.regular) 

    let color = null
    if(nearMines > 0){
        if(nearMines == 1) color = '#448844'
        if(nearMines == 2) color = '#119911'
        if(nearMines > 2 && nearMines < 6 ) color = '#3333AA'
        if(nearMines >= 6 ) color = '#FF1111' 
    }


    return(
        <TouchableWithoutFeedback onPress={props.onOpen} onLongPress={props.onSelect}>
            <View style={styleField}>
                {!mined && opened && nearMines > 0 ? 
                    <Text style={[styles.label, {color:color}]}>{nearMines}</Text> : false
                }
                {mined && opened ? <Mine/> : false}
                {flagged && !opened ? <Flag/> : false}            
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize,
        borderRadius: 13,
        borderLeftColor: '#d7e6f1',
        borderRightColor: '#d7e6f1',
        borderTopColor: '#d7e6f1',
        borderBottomColor: '#d7e6f1',
    },
    regular:{
        backgroundColor: '#bfd3e2',
        
    },
    opened:{
       alignItems: "center",
       justifyContent: "center",

    },
    label:{
        fontWeight: "bold",
        fontSize: params.fontSize,
    },
    exploded:{
        backgroundColor: 'red',
        borderColor: 'red',
        borderTopColor: 'red',
        borderBottomColor: 'red',
    }
})