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
       <Image source={{uri: this.props.evento.image}} resizeMode= 'cover' style={{width:width, height:height/2}} />
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
            <Image source={{uri: this.props.evento.image}} style={{height:100, width:100}} resizeMode='contain'/>
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
      position:'absolute',
      top:0,
      bottom:0,
      left:0,
      right:0, 
      backgroundColor: 'white',
    },
    boxEventoInfo:{
      margin:10,
      backgroundColor:'white',
      flexDirection:'column',
      
    },
    image:{
      width:width-80,
      height:50,
    },
    title:{
      fontSize:30,
      fontWeight:'bold',

    },
    subtitle:{
      fontSize:18,
      color:'black',
      opacity:0.7,
    },
    });

