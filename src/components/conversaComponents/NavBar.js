import React from 'react'
import {Text, View, Image,StyleSheet,SafeAreaView,KeyboardAvoidingView,TouchableOpacity,Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class NavBarCustom extends React.Component {
  get user() {
    return {
      name: this.props.user.name,
      nick: this.props.user.nick,
      avatar: this.props.user.avatar,
      id: this.props.user.id,
      _id: this.props.user.id, // need for gifted-chat
    };
  }  
  render(){
  return (
    <SafeAreaView style={{ backgroundColor: '#f5f5f5' }}>
    <View style={styles.topBar}>
        <View style={styles.topBarItens}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('listConversas');}} style={styles.buttonReturn}>
        <Ionicons name="ios-arrow-back" size={25} color="#AAA" />
        </TouchableOpacity>
        <Image source={{uri: this.user.avatar, cache:'force-cache'}} style={styles.avatar}/>
        <View>
        <Text style={styles.name}>{this.user.name}</Text>
        <Text style={styles.user}>{this.user.nick}</Text>
        </View>
        </View>
        </View>
    </SafeAreaView>
  )}
}

const styles = StyleSheet.create(
  { container:{
    flex: 1,
    backgroundColor:'#f5f5f5',

},
  containerSobe:{
    alignItems:'stretch',
    flex:1,
    justifyContent:'space-between'
  },

    mensagens:{
      backgroundColor:'white',
      top:0,
      bottom:0,
      left:0,
      flex:1,
      right:0,
    },
    topBar:{
      backgroundColor:'white',
      elevation:10,
      flexDirection:'row',
      alignItems:'center',
      height:70,
      padding:10,
      shadowColor:'#000',
      shadowOpacity: 0.05,
      shadowRadius:2,
      shadowOffset:{
          width:0,
          height:2,
      },
  },
  topBarItens:{        
    flexDirection:'row',
    alignItems:'center',
    marginTop:25,
  },
  buttonReturn:{
    height:40,
    width:25,
    marginHorizontal:10,
  },

  button:{    
    flex:1, 
    alignItems:'center',
    alignContent:'center',
    backgroundColor:'#DDd',
    },
      avatar:{
          marginRight:20,
          height:40,
          width:40,
          borderRadius:20,
      },
      name:{
          fontWeight:'bold',
          fontSize:16,

      },

  });
