import React, { Component } from 'react';
import FlipCard from 'react-native-flip-card'
import { Ionicons,FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons';
import {PanResponder,View,Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
var width=Dimensions.get('window').width;
import Carousel,{Pagination} from 'react-native-snap-carousel';

import Swiper from 'react-native-swiper'

var height=Dimensions.get('window').height;



export class UserCardImage extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
    };
  }

  frontView(){
    return(
 
    <TouchableOpacity activeOpacity={0.8} onLongPress={()=>{this.setState({isFlipped:!this.state.isFlipped})}}>
        <View style={styles.fotoContainer}>
          <Image style={[styles.foto]} source={{uri:this.props.foto}} onLoad={()=>{console.log(this.state);console.log('imagem carregada')}} resizeMode='contain' />
        </View>
     </TouchableOpacity>
    )
  }
  
  backView(){
    return(          
        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.setState({isFlipped:!this.state.isFlipped})}}>
            
        <View style={styles.backContainer}>
          <Text>parte de trás </Text>
        </View>
     </TouchableOpacity>      )
  }
  
  render() {
    return(
<FlipCard 
  friction={6}
  perspective={1000}
  flipHorizontal={true}
  flipVertical={false}
  flip={this.state.isFlipped}
  clickable={false}>
    {this.frontView()}
  {this.backView()}
  </FlipCard>
    )
    
  }
}
const styles = StyleSheet.create(
  {   


      fotoContainer:{
        flex:1,
          shadowColor: "#111",
          alignSelf:'center',
          overflow:'hidden',
          borderRadius:(height*4/width),
          alignItems:'center',
          alignContent:'center',
          justifyContent:'center',
          
      },
      backContainer:{
        flex:1,
          shadowColor: "#111",
          backgroundColor:'#999',
          height: height-400,
          width: width-100,
          alignSelf:'center',
          overflow:'hidden',
          borderRadius:(height*4/width),
          alignItems:'center',
          alignContent:'center',
          justifyContent:'center',
          
      },
      foto:{
        alignSelf:'center',
        borderRadius:(height*4/width),

          height: height-400,
          width: width-100,

          
      },
      footer:{
          paddingHorizontal:20,
          paddingVertical:15, 
          marginBottom:10,
      },
      name:{
          fontSize:16,
          fontWeight:'bold',
          color:'#333',
      },
      bio:{
          fontSize:14,
          color:'#999',
          padding:10,
          lineHeight:18
      },
      buttonsContainer:{
        flex:1,
          flexDirection:'row',
          justifyContent:'space-between',
          marginBottom:5
      },
      button:{
          maxHeight:50,
          maxWidth:50,
          padding:10,
          borderRadius:200,
          justifyContent:'center',
          alignItems:'center',
          marginHorizontal:30,
      },
      backCard:{
        borderWidth:0,
        borderColor:'#DDD',
        borderTopLeftRadius:2,
        borderTopRightRadius:40,
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
        marginBottom:40,
        backgroundColor:'#FFFFFF',
        marginHorizontal:20,
        top:0,
        bottom:0,
        left:0,
        right:0,
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,    
        elevation: 9,
      },
      backAvatar:{
        height:300,
        width:300,
        borderRadius:150,
      }
  }
)