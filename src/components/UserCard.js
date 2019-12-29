import React, { Component } from 'react';
import FlipCard from 'react-native-flip-card'
import { Ionicons,FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons';
import {Button,PanResponder,AsyncStorage,View,Text,SafeAreaView, Image, StyleSheet, TouchableOpacity, Dimensions,StatusBar, ScrollView} from 'react-native';
var width=Dimensions.get('window').width;
import Swiper from 'react-native-swiper'

var height=Dimensions.get('window').height;



export class UserCard extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      user:this.props.user,
      isFlipped: false,
      handlelike:false,
      handledeslike:false,
    };
  }
  
  
  listFotos(){
    var fotos= this.props.user.fotos;
    var lista=[];
    Object.entries(fotos).forEach(
        ([key, value]) => {
            lista.push(value)
        }
    );
    fotos['1']='https://i.pinimg.com/736x/53/63/d2/5363d25443755e636ca5843aa5b141b1.jpg';
    fotos['2']='https://static.paraoscuriosos.com/img/articles/7274/800x800/5b55cfaf66a80_1-1.jpg';
    fotos['3']='https://i.pinimg.com/originals/44/94/80/449480dd65c82761550d7ecaa305aaa9.jpg';
    var tamanho = width/((1.5*lista.length))
    panResponder = PanResponder.create({});
     
    return(           
        
        
    <Swiper index={1} style={[styles.fotosContainer,{top:0,bottom:0,left:0,right:0,width:width-40,height:height/2.4,/*height:(lista.length*20)+height/2.4, width:150+(lista.length*20)*/}]} showsButtons={false}>
            
            {lista.map((value, index)=>(   

          <Image  style={[styles.foto]} source={{uri:fotos[''+index+'']}} resizeMode='contain' {...panResponder.panHandlers}/>
            ))}
        </Swiper>

            
    )
}
  frontView(){
    return(
      <View>
        <View style={[styles.footer,{flexDirection:'row'}]}>
          <Image style={styles.avatar} source={{uri:this.state.user.avatar}}/>
          <View>
            <Text style={styles.name}>{this.state.user.name}</Text>
            <Text style={{color:'#444444',}}>{'@'+this.state.user.user}</Text>
          </View>
        </View>
        {
          this.listFotos()
       }


          <Text style={styles.bio} numberOfLines={3}>{this.state.user.bio}</Text>
          
            <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.button} onPress={()=>{this.state.handledeslike=true}}>
                      <FontAwesome name='close' size={30} color={this.state.handledeslike? '#d11':'#45a8'} onPress={()=>{this.props.handledeslike(this.props.user._id)}} onLongPress={()=>{this.size=+1}}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={()=>{this.setState({isFlipped:!this.state.isFlipped}); this.props.handle();}}>
                      <MaterialCommunityIcons name='rotate-3d' size={30} color='black'/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={()=>{this.state.handlelike=true}}>
                      <Ionicons name='ios-heart' size={30} color='red'/>
                  </TouchableOpacity>

            </View>
          </View>
    )
  }
  
  backView(){
    return(          
      <View>
      <Image style={styles.backAvatar} source={{uri:this.state.user.avatar}}/>
      <TouchableOpacity style={styles.button} onPress={()=>{this.setState({isFlipped:!this.state.isFlipped}); this.props.handle();}}>
                      <MaterialCommunityIcons name='rotate-3d' size={30} color='black'/>
      </TouchableOpacity>
      </View>)
  }
  
  render() {
    return(
      <View style={styles.card}>
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
  </View>
    )
    
  }
}
const styles = StyleSheet.create(
  {   

  icon:{
      marginHorizontal:20,
      marginTop:5,
      height:45,
      width:50,
      alignItems:'flex-end',
      justifyContent:'flex-end',
      
  },
      card:{
          borderWidth:0,
          borderColor:'#DDD',
          borderTopLeftRadius:2,
          borderTopRightRadius:40,
          borderBottomLeftRadius:40,
          borderBottomRightRadius:40,
          marginBottom:40,
          backgroundColor:'#FFFFFF',
          marginHorizontal:20,

          shadowColor: "#000",
          shadowOffset: {
              width: 4,
              height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,    
          elevation: 9,

      },
      avatar:{
          height:40,
          width:40,
          borderRadius:20,
          marginRight:10,

      },
      fotosContainer:{
          alignSelf:'center',
          alignItems:'center',
          alignContent:'center',
          justifyContent:'center',
          shadowColor: "#000",
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          elevation: 9,
          shadowOffset: {
              width: 4,
              height: 4,
          },
      },
      fotoContainer:{
          shadowColor: "#111",
          position:'absolute',
          alignItems: 'center',
          alignContent:'center',
          justifyContent:'center',
          shadowRadius: 5.46,
          elevation: 9,
          shadowOffset: {
              width: 4,
              height: 4,
          },
      },
      foto:{
          alignSelf: 'center',
          height: height/2.4,
          width: width-40,
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