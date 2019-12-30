import React, { Component, useState,useEffect } from 'react';
import FlipCard from 'react-native-flip-card'
import { Ionicons,FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons';
import {View,Text, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
var width=Dimensions.get('window').width;
var height=Dimensions.get('window').height;



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

  // tamanho(){
    
  //     Image.getSize({uri:this.props.foto},
  //       (width,height)=>{
  //           if(height!=this.state.theHeigth){}; 
  //           if(width!=this.state.theWidth){}
  //           console.log('height:'+height);
  //           console.log('width:'+width)

  //         }
  //     )       
  // }
  tamanho(){
    proporcao=this.state.theWidth/this.state.theHeigth
    proporcaoDaTela=(width-60)/(height-300)
    
    if(proporcao>proporcaoDaTela) 
    {return({
      largura:width-60,
      altura:(width-60)/proporcao
    })
    }
    else
    {
      return(
        {altura:height-300,
      largura:(height-300)*proporcao})
    }
  }
  frontView(){
    return(
 
    <TouchableOpacity activeOpacity={0.8} onLongPress={()=>{this.setState({isFlipped:!this.state.isFlipped})}}>
        <View style={styles.fotoContainer}>
 
          <Image style={[styles.foto]} source={{uri:this.props.foto, cache:'force-cache'}} onLoad={(item)=>{this.setState({theHeigth:item.nativeEvent.source.height});this.setState({theWidth:item.nativeEvent.source.width})}} resizeMode='contain' />
        </View>
     </TouchableOpacity>
    )
  }
  
  backView(){
    return(          
        <TouchableOpacity style={{ height: height-300,width: width-60,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center'}} activeOpacity={0.8} onPress={()=>{this.setState({isFlipped:!this.state.isFlipped})}}>
            
        <View style={[styles.backContainer,{height:this.tamanho().altura, width:this.tamanho().largura}]}>
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
          height: height-300,
          width: width-60,
        
          
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