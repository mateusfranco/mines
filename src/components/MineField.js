import React from 'react'
import { View, StyleSheet } from 'react-native';
import Field from './Fields'


export default props => {
    const rows = props.board.map((row, r)=>{
        const coluns = row.map((field, c) => {
            return <Field {...field} key={c} onOpen={() => props.onOpenField(r,c)} onSelect={e => props.onSelectField(r,c)}/>
        })
        return <View key={r}>{coluns}</View>
    })
    return <View style={styles.container}>{rows}</View>
}

const styles =StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: '#EEE',
    }
})