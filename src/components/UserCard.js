import React, { Component } from 'react';
import FlipCard from 'react-native-flip-card'
import { Ionicons,FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons';
import {Animated,View,Text,Easing, Image, StyleSheet, TouchableOpacity, Dimensions,StatusBar, ScrollView, RefreshControl} from 'react-native';
var width=Dimensions.get('window').width;
import {Perfil} from './perfilCard'
import Carousel,{Pagination} from 'react-native-snap-carousel';
import {UserCardImage} from './UserCardImage'
import LottieView from 'lottie-react-native';


var height=Dimensions.get('window').height;



export class UserCard extends React.Component {

  
  constructor(props) {
    super(props);

    this.state = {
      user:this.props.user,
      index:this.props.index,
      isFlipped: false,
      activeSlide:0,
      handlelike:new Animated.Value(0.25),
      handledeslike:new Animated.Value(0),
    };
  }
  

  fotos(){   var lista=[]; 
    Object.entries(this.props.user.fotos).forEach(
   ([key, value]) => {
            lista.push(value)
        }
    );
    return(lista)}
    get pagination () {
      const { entries, activeSlide } = this.state;
      return (
          <Pagination
            dotsLength={this.fotos().length}
            activeDotIndex={activeSlide}
            containerStyle={{
              maxWidth:'40%',
              position:"absolute",
              top:0,
              alignSelf:'center',              
            }}
            dotStyle={{
                width: 10,
                height: 10,
                borderColor:'#687',
                borderWidth:0.01,
                backgroundColor: '#ccc'
            }}
            inactiveDotStyle={{
              borderColor:'#888',
              borderWidth:1,
              backgroundColor: '#333'
                    }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            activeOpacity={0.4}

          />
      );
  }
  handleDeslike=()=>{
    Animated.timing(
      this.state.handledeslike,
      {      
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,}
    ).start()
  }
  
  handleLike=()=>{
    this.state.handlelike._value >0.25?
    this.props.handleDeslike(this.state.user._id):this.props.handleLike(this.state.user._id)
    
      this.state.handlelike._value >0.25?
      Animated.timing(
        this.state.handlelike,
        {      
          toValue: 0.25,
          duration: 500,
          easing: Easing.linear,}
      ).start():
      Animated.timing(
        this.state.handlelike,
        {      
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,}
      ).start()
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
        <View style={{flexDirection:'row', marginLeft:10, opacity:0.8}} pointerEvents='box-none'>
        <View style={{flex:3}} pointerEvents='box-none'>
        <TouchableOpacity>
        <View style={[styles.footer,{flexDirection:'row'}]}>
          <Image style={styles.avatar} source={{uri:this.state.user.avatar, cache:'force-cache'}} />
          <View>
            <Text style={styles.name}>{this.state.user.name}</Text>
            <Text style={styles.nick}>{'@'+this.state.user.nick}</Text>
          </View>
        </View>
        </TouchableOpacity>
        <View pointerEvents='none' >
          <Text style={styles.bio} numberOfLines={3}>{this.state.user.bio}</Text>
          </View>
          </View>
            <View style={[styles.buttonsContainer,{flex:1}]}>
                  {/* <TouchableOpacity style={[styles.button,{opacity:this.state.opacityDeslike}]} onPress={()=>{this.handleDeslike()}}> 
                  <FontAwesome name='close'  size={30} color='#4df' />
                  </TouchableOpacity> */}
                  {/* <TouchableOpacity style={styles.button} onPress={()=>{this.setState({isFlipped:!this.state.isFlipped}); this.props.handle();}}>
                      <MaterialCommunityIcons name='rotate-3d' size={30} color='black'/>
                  </TouchableOpacity> */}
                  <TouchableOpacity style={[styles.button, {opacity:this.state.opacityLike}]}  onPress={()=>{this.handleLike() }}>
                    <View style={{alignItems:'center',justifyContent:'center', elevation:10}}>
                    <LottieView source={require('./assets/heart.json')} progress={this.state.handlelike} resizeMode='cover' style={{height:270,width:270}}/>
                    </View>
                      {/* <Ionicons name='ios-heart' size={30} color='#d11'/> */}
                  </TouchableOpacity>

            </View>
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
 
      },
      name:{
          fontSize:16,
          fontWeight:'bold',
          color:'#fdfdfd',
          textShadowColor:'black',
          textShadowOffset:{
            height:2,
            width:0
          },
          textShadowRadius:5,
        
          shadowRadius:5,
          shadowColor:'black',
          shadowOpacity:0.6,
          shadowOffset:{
            height:2,
            width:0
          }
      },
      nick:{
        color:'#fdfdfd',
        fontWeight:'500',
        textShadowColor:'black',
        textShadowOffset:{
          height:2,
          width:0
        },
        textShadowRadius:5,
        shadowRadius:5,
        shadowColor:'black',
        shadowOpacity:0.6,
        shadowOffset:{
          height:2,
          width:0
        }
      },
      bio:{
        fontWeight:'400',
          fontSize:14,
          color:'white',
          padding:10,
          lineHeight:18,
          textAlign:'justify'
      },
      buttonsContainer:{
          flexDirection:'row',
          maxHeight:100,
          justifyContent:'space-around',
          marginBottom:5
      },
      button:{
          flex:1,  
          minHeight:50,
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