import React, { Component, useState,useEffect } from 'react';
import FlipCard from 'react-native-flip-card'
import { Ionicons,FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons';
import {View,Text, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
var width=Dimensions.get('window').width;
var height=Dimensions.get('window').height;
import { Video } from 'expo-av';



export class UserCardImage extends React.Component {




  
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
      image:null,
      theHeigth: 100,
      theWidth: 100,

    };
  }


  tamanho(){
    proporcao=this.state.theWidth/this.state.theHeigth
    proporcaoDaTela=(width)/(height)
    
    if(proporcao>proporcaoDaTela) 
    {return({
      largura:width,
      altura:(width)/proporcao
    })
    }
    else
    {
      return(
        {altura:height,
      largura:(height)*proporcao})
    }
  }
  frontView(){
    return(
 
    <TouchableOpacity activeOpacity={1} onLongPress={()=>{this.setState({isFlipped:!this.state.isFlipped})}}>
        <View style={styles.fotoContainer}>
          <Image style={[styles.foto]} source={{uri:this.props.midia.foto, cache:'force-cache'}} onLoad={(item)=>{this.setState({theHeigth:item.nativeEvent.source.height});this.setState({theWidth:item.nativeEvent.source.width})}} resizeMode='contain' />
        </View>
     </TouchableOpacity>
    )
  }
  
  backView(){
    return(          
        <TouchableOpacity style={{ height: height,width: width,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}} activeOpacity={0.8} onPress={()=>{this.setState({isFlipped:!this.state.isFlipped})}}>
            
        <View style={[styles.backContainer,{height:this.tamanho().altura, width:this.tamanho().largura}]}>
          <Text>{this.props.midia.text}</Text>
        </View>
     </TouchableOpacity>      )
  }
  
  render() {
    return(
      this.props.midia.foto?
<FlipCard 
  friction={6}
  perspective={1000}
  flipHorizontal={true}
  flipVertical={false}
  flip={this.state.isFlipped}
  clickable={false}>
    {this.frontView()}
  {this.backView()}
  </FlipCard>:
<Video
        source={{ uri: this.props.midia.video }}
        rate={1.0}
        ref={ref=>this.ref=ref}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={true}
        isLooping={true}
        posterSource={{uri:'https://firebasestorage.googleapis.com/v0/b/meetnow-c6097.appspot.com/o/assets%2Floading.gif?alt=media&token=45c85754-4293-4116-8508-52a5c64c14bb'}}
        style={ styles.foto }
      />  
    )
    
  }
}
const styles = StyleSheet.create(
  {   


      fotoContainer:{
        flex:1,
          alignSelf:'center',
          overflow:'hidden',
          alignItems:'center',
          alignContent:'center',
          justifyContent:'center',
          shadowColor: "#000",

          shadowOffset: {
              width: 4,
              height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,    
          elevation: 9,
          
      },
      backContainer:{
        backgroundColor:'#e6a8e7',
        alignSelf:'center',
        overflow:'visible',
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center',
        padding:20,
        shadowColor: "#000",
        borderRadius:(height*4/width),
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,    
        elevation: 9,
          
      },
      foto:{
        alignSelf:'center',
        borderRadius:(height*4/width),
          height: height,
          width: width,
        
          
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