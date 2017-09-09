/**
 * Created by Jic on 19-Jul-17.
 */
//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, Button, Image} from 'react-native';
import {Video} from 'expo';
import {getLink} from '../Utils/WatchUtils';

const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '...buffering...';

class Watch extends Component {

    constructor(props) {
        super(props)
        this.playbackInstance = null;
        this.state = {
            videoLink: '',
            w: Dimensions.get('screen').width,
            h: Dimensions.get('screen').height,
            muted: false,
            duration: 0.0,
            currentTime: 0.0,
            isPlaying: false,
            isLoading: true,
            volume: 1.0,
            rate: 1.0,
            shouldPlay: false,
            showVideo: false,
            isBuffering: false,
            playbackInstanceDuration: null,
            playbackInstancePosition: null,
            playbackInstanceName: LOADING_STRING,
        }
    }

    async componentWillMount() {

    }

    async componentDidMount() {
        const {params} = this.props.navigation.state;
        try{
            const data = await getLink(params.data.link);
            this.setState({videoLink: data});
        }catch (e) {
            console.log(e);
        }
    }

    _onLoad = status => {

    }

    _mountVideo = component => {
        this._video = component;
        this._loadNewPlaybackInstance(false);
    }

    async _loadNewPlaybackInstance(playing) {
        if (this.playbackInstance !== null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance.setCallback(null);
            this.playbackInstance = null;
        }

        const source = { uri: 'https://www.youtube.com/embed/?autoplay=1&amp;docid=0B-1zzSPflUMQTjhuRHk3RXhYRWc&amp;partnerid=30&amp;html5=1&amp;controls=1&amp;showinfo=0&amp;rel=0&amp;modestbranding=0&amp;playsinline=1&amp;enablejsapi=1&amp;widgetid=1' };
        const initStatus = {
            shouldPlay: playing,
            rate: this.state.rate,
            volume: this.state.volume,
            isMuted: this.state.muted,
        }
        this._video.setCallback(this._callback);
        await this._video.loadAsync(source, initStatus);
        this.playbackInstance = this._video;
        const status = await this._video.getStatusAsync();
        this._updateScreenForLoading(false);
    }

    _updateScreenForLoading(isLoading) {
        if (isLoading) {
            this.setState({
                showVideo: false,
                isPlaying: false,
                playbackInstance: LOADING_STRING,
                playbackInstanceDuration: null,
                playbackInstancePosition: null,
                isLoading: true,
            });
        } else {
            this.setState({
                playbackInstanceName: '',
                showVideo: true,
                isLoading: false,
            });
        }
    }

    _onError = error => {

    }

    _onLoadStart = () => {

    }

    _onReadyForDisplay = event => {

    }

    _callback = status => {
        if (status.isLoaded) {
            this.setState({
                playbackInstancePosition: status.positionMillis,
                playbackInstanceDuration: status.positionMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                isBuffering: status.isBuffering,
                rate: status.rate,
                muted: status.muted,
                volume: status.volume,
            });
        } else {
            if (status.error) {
                console.log('FATAL PLAYER ERROR: ' + status.error);
            }
        }
    }

    _getCurrentTimePercentage = () => {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    }

    _onLayout = () => {
        this.setState({
            w: Dimensions.get('screen').width,
            h: Dimensions.get('screen').height,
        });
    }

    _Video(){
        console.log(this.state.videoLink.length > 0)
        if (this.state.videoLink.length > 0) {
            return (
                <Video
                    ref={this._mountVideo}
                    onLoad={this._onLoad}
                    onError={this._onError}
                    onLoadStart={this._onLoadStart}
                    onReadyForDisplay={this._onReadyForDisplay}
                    callback={this._callback}
                    useNativeControls={true}
                    resizeMode={Video.RESIZE_MODE_CONTAIN}
                    style={styles.fullScreen}>
                </Video>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={styles.container} onLayout={() => this._onLayout()}>
                {this._Video()}
                <TouchableOpacity
                    style={{
                        backgroundColor: 'transparent',
                        width: 40,
                        height: 40,
                        position: 'absolute',
                        top: 5,
                        left: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => this.props.navigation.goBack()}>
                    <Image source={require('../../images/ic_back.png')} style={{width: 30, height: 30}}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        height: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: 'red',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
});

export default Watch;
