import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Font} from 'expo';
import {} from 'react-navigation';
import AppRouter from './src/Routers/AppRouter';
import Expo from 'expo';

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoadingFont: false,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'DellaRespia': require('./assets/fonts/DellaRespira-Regular.ttf'),
            'IndieFlower': require('./assets/fonts/IndieFlower.ttf')
        });
        this.setState({ isLoadingFont: true });
    }

    componentDidMount() {

    }

    render() {
        if (!this.state.isLoadingFont) {
            return < Expo.AppLoading />
        }
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <AppRouter/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
});

Expo.registerRootComponent(App);