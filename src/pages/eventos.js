import React,{useEffect} from 'react';
import {SafeAreaView, Text, View, Image,StyleSheet,ScrollView,TouchableOpacity, AsyncStorage, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function eventos({navigation}){  

    return(
      null
    );
}
const styles = StyleSheet.create(
    {   containerConversa:{
        borderColor:'#ffcce0',
        borderWidth:0,
        marginVertical:50,
        flex:1,
        alignSelf:'stretch',
        overflow:'hidden',
        height:250,
        right:0,
        width:Dimensions.get('window').width,
        left:0,
        

    },
    button:{     
    borderTopColor:'#BBB',
    borderTopWidth:0.4,  
},
        avatar:{
          alignSelf:'center',
          height:Dimensions.get('window').width,
          width:Dimensions.get('window').width,
          marginHorizontal:50,
        },
        foot:{
            flex:1,
            alignSelf:'center',
            flexDirection:'column'
        },
        name:{
          zIndex:1,
          position:'absolute',
          height:Dimensions.get('window').width,
          width:Dimensions.get('window').width,
          alignContent:'flex-end',
          top:-100,
          color:'white',
          fontWeight:'bold',
          fontSize:30,
          elevation:4,
          textShadowColor:'#444',
          textShadowRadius:3,
          textShadowOffset:{
              width:0,
              height:4,
          },
          transform:[{ rotate: '-90deg'}, {perspective:1000}],
        },
        mensagem:{
            color:'#AAA',
            fontSize:12,
        },
    });

