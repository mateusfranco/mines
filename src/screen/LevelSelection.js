import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'

export default props => {
    return (
        <Modal onRequestClose={props.onCancel}
            visible={props.visible} animationType='slide' transparent={true}>
            <View style={styles.frame}>
                <View style={styles.container}>
                    <Text> Selecione o nivel</Text>
                    <TouchableOpacity
                        style={[styles.button, styles.bgEasy]}
                        onPress={()=> props.onLevelSelected(0.1)}
                    >
                        <Text style={styles.buttonLabel}>facil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.bgMid]}
                        onPress={()=> props.onLevelSelected(0.2)}
                    >
                        <Text style={styles.buttonLabel}>medio</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.bgHard]}
                        onPress={()=> props.onLevelSelected(0.4)}
                    >
                        <Text style={styles.buttonLabel}>dificil</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.frame}>
                <Text style={styles.title}>Criado por Mateus Franco</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    frame:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#777'
    },
    container:{
        backgroundColor: '#EEE',
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
    },
    title:{
        fontSize: 30,
        fontWeight: "500",
    },
    button:{
        marginTop: 10,
        padding: 5,
    },
    buttonLabel:{
        fontSize: 20,
        color: '#EEE',
        fontWeight: '100',
    },
    bgEasy:{
        backgroundColor: '#128921',
    },
    bgMid:{
        backgroundColor: '#122189',
    },
    bgHard:{
        backgroundColor: '#891221',
    },

})