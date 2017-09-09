import React, {Component} from 'react';
import {
    View, Text, StyleSheet, TextInput,
    Dimensions, Image,
    LayoutAnimation, Platform,
    UIManager, Animated, KeyboardAvoidingView, Keyboard,
    TouchableOpacity, FlatList
} from 'react-native';
import {getXmlDoc} from '../Utils/SearchUtils';


const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

const appLogo = require('../../images/umaru.png');
const noResult = require('../../images/noresult.png');
const loading = require('../../images/loading.gif');

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hiddenView: true,
            listFilms: [],
            searchQuery: '',
            appImg: appLogo,
            isLoading: false,
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillMount() {
        // Get keyboard event
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        // remove event when close app
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardDidShow() {
        // animation when show keyboard
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }

    keyboardDidHide() {
        // animation when hide keyboard
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }

    onSearchPress = async () => {
        Keyboard.dismiss();
        this.setState({
            isLoading: true,
            listFilms: [],
        });
        try {
            if (this.state.searchQuery !== null && !this.state.isLoading) {
                const data = await getXmlDoc(this.state.searchQuery);
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                if (data.length === 0) {
                    this.setState({appImg: noResult});
                } else {
                    this.setState({appImg: appLogo});
                }
                this.setState({
                    listFilms: data,
                });
            }
        } catch (e) {
            console.log(e);
        }
        this.setState({isLoading: false});
    }

    mButton = () => {
        if (this.state.isLoading) {
            return (
                <View style={styles.buttonSearch}>
                    <Image source={loading}
                           style={styles.imgLoading}/>
                </View>
            );
        } else {
            return (
                <TouchableOpacity focusedOpacity={0.8} activeOpacity={0.8} style={styles.buttonSearch}
                                  onPress={this.onSearchPress.bind(this)}>
                    <Text style={styles.buttonSearchText}>Search</Text>
                </TouchableOpacity>
            );
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Animated.View style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding">
                    <View style={styles.viewSearch}>
                        <Image source={this.state.appImg} style={styles.logoStyle}/>
                        <TextInput
                            onChangeText={(value) => this.setState({searchQuery: value})}
                            placeholder="Enter Anime's Name"
                            style={styles.input}
                            underlineColorAndroid={'transparent'}

                            onSubmitEditing={this.onSearchPress.bind(this)}
                        />
                        {this.mButton()}
                    </View>
                </KeyboardAvoidingView>
                <View style={this.state.listFilms.length === 0 ? styles.viewResultHide : styles.viewResultShow}>
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={this.state.listFilms}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => navigate('Detail', {data: item})} style={styles.itemContainer}>
                                <Text style={styles.textTitleFilm}>{item.title}</Text>
                                <Text style={{fontFamily: 'IndieFlower', fontSize: 12, color: '#303030'
                                }}>Episodes: {item.number}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Animated.View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: w - 50,
        height: 50,
        fontFamily: 'IndieFlower',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 20,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#CECECE',
        marginBottom: 10,
        marginTop: 10
    },
    viewResultShow: {
        flex: 1
    },
    viewResultHide: {
        flex: 0,
        width: 0,
        height: 0
    },
    viewSearch: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoStyle: {
        width: w / 3,
        height: w / 3 + 20,
        resizeMode: 'stretch'
    },
    buttonSearch: {
        backgroundColor: '#00AEEF',
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'hidden'
    },
    buttonSearchText: {
        fontFamily: 'IndieFlower',
        fontSize: 16,
        color: '#FFFFFF'
    },
    itemContainer: {
        width: w,
        padding: 5,
        paddingBottom: 15,
        paddingTop: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEEEEE',
    },
    imgLoading: {
        width: 195,
        height: 35,
        resizeMode: 'cover',
        borderRadius: 5,
        overflow: 'hidden'
    },
    textTitleFilm: {
        fontFamily: 'IndieFlower',
        fontSize: 16,
        color: '#1E88E5',
    }
});

export default Home;
