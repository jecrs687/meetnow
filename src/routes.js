import React from 'react';
import {View, Image} from 'react-native';
import{createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Config from './pages/config';
import { Ionicons, MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons';
import Curtir from './pages/curtir';
import perfilUser from './pages/perfil';
import listConversas from './pages/conversas';
import Conversa from './components/conversa';
import eventos from './pages/eventos';
import Login from './index'
import CriarConta from './pages/criarConta'


const conversar = createSwitchNavigator({listConversas,Conversa})
const Perfil = createSwitchNavigator({perfilUser,Config})
const Principal = createMaterialBottomTabNavigator({
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
  Calendario: { screen: eventos, navigationOptions:{
    tabBarLabel:'Eventos',
    tabBarVisible:'visible',
    tabBarIcon:({tintColor,focused})=>(
    (
    <React.Fragment>
    <MaterialCommunityIcons name="calendar-heart" size={25} color={tintColor}/>
    </React.Fragment>
      )
    )} },
  Conversas: { screen: conversar, navigationOptions:{
    tabBarLabel:'Conversas',
    tabBarVisible:'hidden',
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
  initialRouteName: 'Curtir',
  activeColor: '#ffcce0',
  barStyle:{
    height:50,
      backgroundColor:'#FFF',
      overflow:'visible',
  },
  
});
export default createAppContainer(createSwitchNavigator({Login,Principal,CriarConta}))
