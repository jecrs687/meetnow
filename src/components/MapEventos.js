import React,{ Component } from 'react';
import { Platform,Text, View,StyleSheet, Dimensions, Animated} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Carousel,{Pagination} from 'react-native-snap-carousel';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {EventoCard} from './EventoCard'

var width=Dimensions.get('window').width;
var height=Dimensions.get('window').height;

export class MapEventos extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      location: {  latitude: 37.78825,
        longitude: -122.4324,},
      locationUser:{  latitude: 37.78825,
        longitude: -122.4324,},
          eventos:[
            
            { date: new Date(2020,3,10,10,10,0,1),
              title: 'ipsun',
             subtitle:'ipsun lorem',
             image:'https://image.freepik.com/foto-gratuito/mano-della-folla-in-discoteca_23-2147717087.jpg',
             bio:"lorem ipson teste for the lorem for the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun aipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun and lorem ipsun ksksk teste for lorem ipsun and loren isun , quando lorem",
            location:{  
              latitude: 40.745741213853211,
              longitude: 14.495372838699072,
            }},
           {      
            date: new Date(2020,1,10,10,10,0,1),
            title: 'lorem',
             subtitle:'the loren ipsun',
             bio:"lorem ipson teste nd lorem ipsun ksksk teste for lorem ipsun and loren isufor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun anfor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun a , quando lorem",

             image:'https://image.freepik.com/foto-gratuito/mano-della-folla-in-discoteca_23-2147717087.jpg',
             location:{ 
              latitude: 40.74221213853211,
              longitude: 14.492272838699072,
            }},
            {      
              date: new Date(2020,3,2,10,10,0,1),
              title: 'loren ipsun',
             subtitle:'the of ipsun',
             bio:"lorem ipson teste for the lorfor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun afor the lorem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun aem ipsun,for the lorem ipsun with lorem ipsun, becase lorem ipsun and lorem ipsun ksksk teste for lorem ipsun and loren isun , quando lorem",

             image:'https://image.freepik.com/foto-gratuito/mano-della-folla-in-discoteca_23-2147717087.jpg',
              location: {
                latitude: 40.74131213853211,
                longitude: 14.491472838699072,
            }},
            ],

    };
  }
  
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }
  componentDidMount(){
    this.mapView.animateToRegion({
      latitude: this.state.eventos[0].location.latitude - height/300000,
    longitude: this.state.eventos[0].location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }, 200);  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    while (status !== 'granted') {
     alert('por favor, autorize o acesso a sua localização');
     let { status } = await Permissions.askAsync(Permissions.LOCATION);
    }
    
    let location = (await Location.getCurrentPositionAsync({})).coords;
    this.setState({ location, locationUser:location });
  };
  eventos(){
    return(
        [{title: 'evento1', subtitle:'subtitle evento 1', image:'https://image.freepik.com/foto-gratuito/mano-della-folla-in-discoteca_23-2147717087.jpg'}, {title: 'evento1', subtitle:'subtitle evento 1', image:'https://image.freepik.com/foto-gratuito/mano-della-folla-in-discoteca_23-2147717087.jpg'},{title: 'evento1', subtitle:'subtitle evento 1', image:'https://image.freepik.com/foto-gratuito/mano-della-folla-in-discoteca_23-2147717087.jpg'}]    )
  }
  listEventos=({item,index})=>
  {
        return(
          <EventoCard evento={item}/>
        )
  }
  
  mudarRegiao=(index)=>{
    this.mapView.animateToRegion({
      latitude: this.state.eventos[index].location.latitude - height/300000,
    longitude: this.state.eventos[index].location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }, 200);
    // this.setState({location: this.state.eventos[index].location})
  }
  render() {
    return (
      <View>
       {   this.state.location && 
       <MapView style={styles.mapStyle}
       ref = {(ref)=>this.mapView=ref}
        >
          <Marker coordinate={this.state.locationUser} title='você está aqui!'>
            <View style={{backgroundColor:'#11ffff', height:30,width:30, borderRadius:15, borderWidth:2,borderStyle:'solid', borderColor:'white'}}></View>
          </Marker>
          {this.state.eventos.map((evento, index) => (
          <Marker
            key={index}
            coordinate={evento.location}
            title={evento.title}
            description={evento.subtitle}
              />
            ))}
       </MapView>}
       <View style={styles.boxEventos}>
         <Carousel
         layout={'default'}
         ref={(c) => { this._carousel = c; }}
         data={this.state.eventos}
         renderItem={this.listEventos}
         sliderWidth={width}
         onSnapToItem={(index) => {this.setState({ activeSlide: index }); this.mudarRegiao(index)} }
         itemWidth={width-75}
         itemHeight={height/2.2 - 50}
         layoutCardOffset={3}/>
         </View>
       </View>
                    
     
    );
  }
}
const styles = StyleSheet.create(
    {     container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    boxEventos:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      
      elevation: 5,
      position:'absolute', 
      bottom:60, 
      height:height/2.2 - 50, 
      width:'100%'
    },

    });

