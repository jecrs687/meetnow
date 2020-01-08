import React from 'react';
import {View, Image} from 'react-native';
import{createAppContainer, createSwitchNavigator, withNavigation, NavigationEvents, NavigationProvider} from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Config from './pages/config';
import { Ionicons, MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons';
import Curtir from './pages/curtir';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import perfilUser from './pages/perfil';
import listConversas from './pages/conversas';
import Conversa from './components/conversa';
import {MapEventos} from './components/MapEventos';
import Login from './index'
import CriarConta from './pages/criarConta'

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {      
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [ { translateX } ] }
    },
  }
}
const conversar = createAnimatedSwitchNavigator({listConversas:{screen:listConversas},Conversa:{screen:Conversa}}, {initialRouteName:'listConversas',transitionConfig})
const Perfil = createSwitchNavigator({perfilUser,Config})
const Principal = createMaterialBottomTabNavigator({
  Curtir: { screen: Curtir, navigationOptions:{
    tabBarLabel:'Curtir',
    tabBarColor:'white',
    tabBarIcon:({tintColor})=>(
        <React.Fragment>
    <View>
    <Ionicons name="ios-contacts" size={25} color={tintColor}/>
      </View>
      </React.Fragment>
    )} },    
  Eventos: { screen: MapEventos, navigationOptions:{
    tabBarLabel:'Eventos',
    tabBarColor:'black',
    tabBarIcon:({tintColor})=>(
        <React.Fragment>
    <View>
    <MaterialIcons name="event" size={25} color={tintColor}/>
      </View>
      </React.Fragment>
    )} },
  Calendario: { screen: MapEventos, navigationOptions:{
      tabBarLabel:'Calendario',
    tabBarVisible:'visible',
    tabBarColor:'white',
    tabBarIcon:({tintColor,focused})=>(
    (
      <React.Fragment>      
        <View  style={{ backgroundColor: 'transparent'}}
      pointerEvents={'box-none'}>
    <MaterialCommunityIcons name="calendar-heart" size={25} color={tintColor}/>
    </View>
    </React.Fragment>

      )
    )} },
  Conversas: { screen: conversar, navigationOptions:{
    tabBarLabel:'Conversas',
    tabBarColor:'white',
    tabBarVisible:()=>{console.log(NavigationProvider);return 'hidden';},
    tabBarIcon:({tintColor})=>(
        <React.Fragment>
    <View>
      
    <Ionicons name="ios-chatbubbles" size={25} color={tintColor}/>
      </View>
      </React.Fragment>
    )} },
  Perfil: { screen: Perfil, navigationOptions:{
      tabBarLabel:'Perfil',
      tabBarColor:'white',
      
      tabBarIcon:({tintColor})=>(
        <React.Fragment>
    <View>
    <Ionicons name="ios-happy" size={25} color={tintColor}/>
      </View>
      </React.Fragment>
    )} },
}, {  
  sceneAnimationEnabled:true,
   shifting:true,
   
   backBehavior:'history',
  initialRouteName: 'Curtir',
  activeColor: '#ffcce0',
  inactiveColor:'#687687',
  barStyle:{
    height:50,
      backgroundColor:'#FFF',
    overflow:'visible'
    },
  
});
export default createAppContainer(createSwitchNavigator({Login,Principal,CriarConta}))
