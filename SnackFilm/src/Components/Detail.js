/**
 * Created by Jic on 19-Jul-17.
 */
//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Image, Dimensions, TouchableOpacity} from 'react-native';
import {getDetail} from '../Utils/GetDetailUtils';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

class Detail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            film: {}
        }
    }

    async componentWillMount() {
        const {params} = this.props.navigation.state;
        this.setState({data: params.data});
    }

    async componentDidMount() {
        try {
            const data = await getDetail(this.state.data.link);
            this.setState({film: data});
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <Image source={{uri: this.state.film.img}}
                           style={styles.bigImg}>
                        <View style={styles.smallImg}>
                            <Image source={{uri: this.state.data.img}}
                                   style={{
                                       width: w / 4, height: h / 6, resizeMode: 'stretch'
                                   }}/>
                        </View>
                    </Image>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.buttonBack}
                                      onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.textBtnBack}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonWatch}
                        onPress={() => navigate('Watch', {data: this.state.film})}>
                        <Text style={styles.textBtnWatch}>Watch</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF'
    },
    bigImg: {
        width: w,
        height: h / 3.5,
        resizeMode: 'stretch',
        justifyContent: 'flex-end'
    },
    smallImg: {
        width: w / 4 + 6,
        height: h / 6 + 6,
        backgroundColor: '#FFFFFF',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginBottom: 5
    },
    content: {
        flex: 2.5,
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonWatch: {
        width: w / 2 - 30,
        height: 35,
        backgroundColor: '#00AEEF',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonBack: {
        width: w / 2 - 30,
        height: 35,
        backgroundColor: '#e74c3c',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtnWatch: {
        fontFamily: 'IndieFlower',
        color: '#FFFFFF',
        fontSize: 16
    },
    textBtnBack: {
        fontFamily: 'IndieFlower',
        color: '#FFFFFF',
        fontSize: 16
    }
});

export default Detail;
