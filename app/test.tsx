import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelloWorldScreen = () => {
    return (
        <View style={styles.container}>
            <Text onPress={() => handleDismiss()} style={styles.text}>Hello World</Text>
        </View>
    );
};

const handleDismiss = (count: number) => {
    if (router.canDismiss()) {
      router.dismiss(count)
    }
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
    },
});

export default HelloWorldScreen;
