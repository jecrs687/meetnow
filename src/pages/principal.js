import React from 'react';
import {View, Image} from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Config from './config';
import { Ionicons, MaterialIcons} from '@expo/vector-icons';
import Curtir from './curtir';
import perfilUser from './perfil';
import listConversas from './conversas';
import Conversa from './conversa';
import eventos from './eventos';

import{createAppContainer, createSwitchNavigator} from 'react-navigation'



const conversar = createSwitchNavigator({listConversas,Conversa})
const Perfil = createSwitchNavigator({perfilUser,Config})

export default createAppContainer(
  
createMaterialBottomTabNavigator({
  Curtir: { screen: Curtir, navigationOptions:{
    tabBarLabel:'Curtir',
    tabBarIcon:({tintColor})=>(
        <React.Fragment>
    <View>
    <Ionicons name="ios-contacts" size={25} color={tintColor}/>
      </View>
      </React.Fragment>
    )} },    
    Eventos: { screen: eventos, navigationOptions:{
      tabBarLabel:'Eventos',
      tabBarIcon:({tintColor})=>(
          <React.Fragment>
      <View>
      <MaterialIcons name="event" size={25} color={tintColor}/>
        </View>
        </React.Fragment>
      )} },
  Conversas: { screen: conversar, navigationOptions:{
    tabBarLabel:'Conversas',
    tabBarIcon:({tintColor})=>(
        <React.Fragment>
    <View>
    <Ionicons name="ios-chatbubbles" size={25} color={tintColor}/>
      </View>
      </React.Fragment>
    )} },
  Perfil: { screen: Perfil, navigationOptions:{
      tabBarLabel:'Perfil',
      tabBarIcon:({tintColor})=>(
        <React.Fragment>
    <View>
    <Ionicons name="ios-happy" size={25} color={tintColor}/>
      </View>
      </React.Fragment>
    )} },
}, {

   shifting:true,
  initialRouteName: 'Eventos',
  activeColor: '#ffcce0',
  barStyle:{
    height:50,
      backgroundColor:'#FFF',
  },
  
}));