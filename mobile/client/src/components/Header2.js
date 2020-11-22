import React, { Component } from 'react';
 
import { StyleSheet, Text, View } from 'react-native';
 
const Header2 = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}> { props.title }</Text>
        </View>
    )
}
 
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#303030',
        height: 50,
        justifyContent: 'center',
        width: '40%',
        paddingLeft: 10
    },
    title: {
        color: '#F3F3F3',
        fontSize: 22,
        fontWeight: '700',
    }
});
 
export default Header2;