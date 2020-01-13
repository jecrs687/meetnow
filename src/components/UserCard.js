import React, { Component } from 'react';
import FlipCard from 'react-native-flip-card'
import { Ionicons,FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons';
import {Button,PanResponder,AsyncStorage,View,Text,SafeAreaView, Image, StyleSheet, TouchableOpacity, Dimensions,StatusBar, ScrollView, RefreshControl} from 'react-native';
var width=Dimensions.get('window').width;
import {Perfil} from './perfilCard'
import Carousel,{Pagination} from 'react-native-snap-carousel';
import {UserCardImage} from './UserCardImage'


var height=Dimensions.get('window').height;



export class UserCard extends React.Component {

  
  constructor(props) {
    super(props);

    this.state = {
      user:this.props.user,
      index:this.props.index,
      isFlipped: false,
      activeSlide:0,
      handlelike:false,
      handledeslike:false,
    };
  }
  

  fotos(){   var lista=[]; 
    Object.entries(this.props.user.fotos).forEach(
   ([key, value]) => {
            lista.push(value)
        }
    );
    return(lista)}
  componentWillUpdate(){
    this.state.handlelike?this.props.handleLike(this.state.user._id):this.props.handleDeslike(this.props.user._id);
    this.state.handledeslike?this.props.handleDeslike(this.props.user._id):null;
  }
    get pagination () {
      const { entries, activeSlide } = this.state;
      return (
          <Pagination
            dotsLength={this.fotos().length}
            activeDotIndex={activeSlide}
            containerStyle={{
              maxWidth:'40%',
              position:"absolute",
              bottom:55,
              alignSelf:'center',              
            }}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                borderColor:'#687',
                borderWidth:1,
                marginHorizontal: 1,
                backgroundColor: 'white'
            }}
            inactiveDotStyle={{
              borderRadius: 5,
              borderColor:'#888',
              borderWidth:1,
              marginHorizontal: 1,
              backgroundColor: '#333'
                    }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
      );
  }

   listFotos = ({index, item})=>{
    return(  
      <View style={{
        overflow:'visible', 
        top:0,
        bottom:0,
        left:0,
        right:0,
      }}> 
          <UserCardImage style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}midia={item} 
            
            now={(index == this.state.activeSlide )&& this.props.now(this.state.index)}
            />
    </View>
    )
}
  frontView(){
    return(
      <View style={styles.cardInfor}>
                    <View style={styles.Carousel}>

               <Carousel
                      layout={'stack'}
                      ref={(c) => { this._carousel = c; }}
                      data={this.fotos()}
                      renderItem={this.listFotos}
                      sliderWidth={width}
                      onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                      itemWidth={width}
                      itemHeight={height}
                      layoutCardOffset={3}

                    />
                    { this.pagination }

              </View>
        <View style={[styles.footer,{flexDirection:'row'}]} pointerEvents='none'>
          <Image style={styles.avatar} source={{uri:this.state.user.avatar}}/>
          <View>
            <Text style={styles.name}>{this.state.user.name}</Text>
            <Text style={styles.nick}>{'@'+this.state.user.nick}</Text>
          </View>
        </View>
          <Text style={styles.bio} numberOfLines={3}>{this.state.user.bio}</Text>
          
            <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={[styles.button,{opacity:this.state.opacityDeslike}]} onPress={()=>{this.setState({handledeslike:!this.state.handledeslike,handlelike:false, opacityDeslike:!this.state.handledeslike? 0.4:1, opacityLike:1});}}> 
                  <FontAwesome name='close'  size={30} color='#4df' />
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={styles.button} onPress={()=>{this.setState({isFlipped:!this.state.isFlipped}); this.props.handle();}}>
                      <MaterialCommunityIcons name='rotate-3d' size={30} color='black'/>
                  </TouchableOpacity> */}
                  <TouchableOpacity style={[styles.button, {opacity:this.state.opacityLike}]}  onPress={()=>{this.setState({handledeslike:false,handlelike:!this.state.handlelike, opacityDeslike:1, opacityLike:!this.state.handlelike? 0.4:1});}}>
                      <Ionicons name='ios-heart' size={30} color='#d11'/>
                  </TouchableOpacity>

            </View>
          </View>
    )
 
  }
 
  backView(){
    return(          
      <View>
          <Perfil user={this.state.user} fliper={()=>{this.setState({isFlipped: !this.state.isFlipped})}}/> 
      </View>)
  }
  
  render() {
    return(
      <View style={styles.card}>
{/* <FlipCard 
  friction={6}
  perspective={1000}
  flipHorizontal={true}
  flipVertical={false}
  flip={this.state.isFlipped}
  clickable={false}> */}
    {this.frontView()}
  {/* {this.backView()}
  </FlipCard> */}
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
     justifyContent:'space-around',      
  },
      card:{
        height:height,
        width:width,
      },
      cardInfor:{
        justifyContent:'flex-end',
        flex:1,
        paddingBottom:70,
      },
      avatar:{
          height:40,
          width:40,
          borderRadius:20,
          marginRight:10,
          borderWidth:1,
          borderColor:'white',

      },
      Carousel:{
        position:'absolute',
        
        
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
        flex:1,
              
          shadowColor: "#111",
          alignSelf:'center',
          alignItems:'center',
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
        alignSelf:'center',

          height: height-250,
          width: width-100,
          borderRadius:(height*4/width),

          
      },
      footer:{
          paddingHorizontal:20,
          paddingVertical:15, 
      },
      name:{
          fontSize:16,
          fontWeight:'bold',
          color:'#fdfdfd',
      },
      nick:{
        color:'#fdfdfd',
      },
      bio:{
          fontSize:14,
          color:'white',
          padding:10,
          lineHeight:18
      },
      buttonsContainer:{
          flexDirection:'row',
          justifyContent:'space-around',
          marginBottom:5
      },
      button:{
          maxHeight:50,
          maxWidth:50,
          borderRadius:200,
          justifyContent:'center',
          alignItems:'center',
          marginHorizontal:30,
      },
      backCard:{
        height:height,
        width:width,
      },
      backAvatar:{
        height:300,
        width:300,
        borderRadius:150,
      }
  }
)