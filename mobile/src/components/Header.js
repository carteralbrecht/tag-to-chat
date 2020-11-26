import React, { Component } from 'react';
 
import { StyleSheet, Text, View } from 'react-native';
 
const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}> { props.title }</Text>
        </View>
    )
}
 
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#5102A1',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '55%'
    },
    title: {
        color: '#F3F3F3',
        fontSize: 28,
        fontWeight: '700',
    }
});
 
export default Header;