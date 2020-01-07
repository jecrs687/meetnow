import { Linking } from 'expo'
import PropTypes from 'prop-types'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native'
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Video } from 'expo-av';

import { View,Text, Image } from 'react-native'


export default class CustomView extends React.Component {
  static propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    mapViewStyle: ViewPropTypes.style,
  }

  static defaultProps = {
    currentMessage: {},
    containerStyle: {},
    mapViewStyle: {},
  }

  openMapAsync = async () => {
    const { currentMessage: currentMessage } = this.props
    const {location } = currentMessage
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${location.latitude},${location.longitude}`,
      default: `http://maps.google.com/?q=${location.latitude},${location.longitude}`,
    })

    try {
      const supported = await Linking.canOpenURL(url)
      if (supported) {
        return Linking.openURL(url)
      }
      alert('Opening the map is not supported.')
    } catch ({ message }) {
      alert(message)
    }
  }

  render() {
    const { currentMessage, containerStyle, mapViewStyle } = this.props;
    if(currentMessage.video){
      return(

        <View style={[styles.videoView, {overflow:'hidden'}]}>
        <Video
          source={{ uri: currentMessage.video }}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay={false}
          isLooping={false}
          useNativeControls={true}
          posterSource={{uri:'https://firebasestorage.googleapis.com/v0/b/meetnow-c6097.appspot.com/o/assets%2Floading.gif?alt=media&token=45c85754-4293-4116-8508-52a5c64c14bb'}}
          style={{ width: 240, height: 240 }}
        />
      </View>
      )
    }
    // if(currentMessage.image){
    //   return(
    //     <TouchableOpacity
    //     style={[styles.container, containerStyle]}
    //     onPress={null}
    //   >
    //   <View style={[styles.videoView, {overflow:'hidden'}]}>
    //     <Image 
    //     style={{ width: 240, height: 240 }}
        
    //     source={{uri:currentMessage.image, cache:'force-cache'}} 
    //     defaultSource={{uri: 'https://firebasestorage.googleapis.com/v0/b/meetnow-c6097.appspot.com/o/assets%2Floading.gif?alt=media&token=45c85754-4293-4116-8508-52a5c64c14bb', height:150, width:150}, 1}/>
    //   </View>
    //   </TouchableOpacity>
    //   )
    // }
    if (currentMessage.location) {
      return (
        <TouchableOpacity
          style={[styles.container, containerStyle]}
          onPress={this.openMapAsync}
        >
          <MapView
            style={[styles.mapView, mapViewStyle]}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            scrollEnabled={true}
            zoomEnabled={true}
          >
            <Marker coordinate={currentMessage.location} title='você está aqui!'>
              <View style={{backgroundColor:'#11ffff', height:15,width:15, borderRadius:8, borderWidth:1,borderStyle:'solid', borderColor:'white'}}/>
            </Marker>          
          </MapView>
        </TouchableOpacity>
      )
    }
    return null
  }
}

const styles = StyleSheet.create({
  container: {},
  mapView: {
    width: 200,
    height: 200,
    borderRadius: 13,
    margin: 3,
  },
  videoView:{
    width:240,
    height:240,
    borderRadius: 13,
    margin: 3,
  }
})
