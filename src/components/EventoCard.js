import React,{ Component } from 'react';
import { Text, View,StyleSheet, Dimensions, Image, Modal,  TouchableOpacity,SafeAreaView} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {TimerEventocard} from './timerEventoCard'
var width=Dimensions.get('window').width;
var height=Dimensions.get('window').height;

export class EventoCard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
    };
  }

  eventoInfo=()=>{
    return(
      <Modal
      animationType="slide"
      transparent={false}
      presentationStyle='pageSheet'
      visible={this.state.modalVisible}
      onDismiss={() => {
        this.setState({modalVisible:!this.state.modalVisible});
      }}
      onRequestClose={() => {
        this.setState({modalVisible:!this.state.modalVisible});
      }}>
        <View>
       <Image source={{uri: this.props.evento.image}} resizeMode= 'cover' style={{position:'absolute',width:width, height:height/2}} />
            <View style={styles.boxEventoInfo}>
            <Text style={styles.title}>{this.props.evento.title}</Text>
            <Text style={styles.subtitle}>{this.props.evento.subtitle}</Text>
            <ScrollView style={{height:height/5}}>
            <Text style={styles.bio}>{this.props.evento.bio}</Text>
            </ScrollView>
            </View>
            </View>
    </Modal>
    )
  }

  render() {
    return (

      <View style={styles.boxEvento}>
          {this.eventoInfo()}
          <TouchableOpacity
        onPress={() => {
          this.setState({modalVisible:!this.state.modalVisible});
        }}>
            <Image source={{uri: this.props.evento.image}} style={{height:height/2.2 - 50, width:'100%', position:'absolute'}} resizeMode='cover'/>
            <View style={styles.boxEventoInfo}>
             <TimerEventocard date={this.props.evento.date}/>
            <Text style={styles.title}>{this.props.evento.title}</Text>
            <Text style={styles.subtitle}>{this.props.evento.subtitle}</Text>
            
     
            </View>
            </TouchableOpacity>

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
      position:'absolute', 
      bottom:60, 
      height:height/2.2 - 50, 
      width:'100%'
    },
    boxEvento:{
      borderRadius:20,
      position:'absolute',
      top:0,
      bottom:0,
      overflow:'hidden',
      left:0,
      right:0,
      width:'100%',
      height:'100%', 
      backgroundColor: 'white',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    boxEventoInfo:{
      margin:10,
      flexDirection:'column',
      
    },
    image:{
      width:width-80,
      height:50,
    },
    title:{
      fontSize:30,
      fontWeight:'bold',
      color:'#fff'

    },
    subtitle:{
      fontSize:18,
      color:'#fff',
    },
    });

