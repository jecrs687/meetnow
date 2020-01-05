import { Asset } from 'expo-asset';
import { AppLoading , Linking} from 'expo';
import React, { Component } from 'react'
import { Bubble, GiftedChat, SystemMessage, IMessage } from 'react-native-gifted-chat'; // 0.3.0
import {Text, View, Image,StyleSheet,SafeAreaView,KeyboardAvoidingView,TouchableOpacity,Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebaseSvc from '../services/FirebaseSvc';
import AccessoryBar from './conversaComponents/AccessoryBar'
import CustomActions from './conversaComponents/CustomActions'
import CustomView from './conversaComponents/CustomView'
import NavBar from './conversaComponents/NavBar'


class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state={
        messages:null,
        inverted: false,
        step: 0,
        messages: [],
        loadEarlier: true,
        typingText: null,
        isLoadingEarlier: false,
        appIsReady: false,
        isTyping: false,
      }

  }
  onSend=(messages)=>{
    firebaseSvc.send({messages: messages, id: this.props.navigation.state.params.conversationId})
  };
  onSendFromUser = (messages) => {
    const createdAt = new Date()
    const messagesToUpload = messages.map(message => ({
      ...message,
      user:this.user,
      createdAt,
      _id: this.user._id,
    }))
    this.onSend(messagesToUpload)
  }
  _isMounted = false;
  componentWillUnmount() {
    this._isMounted = false
  }
  onLoadEarlier = () => {
    this.setState(() => {
      return {
        isLoadingEarlier: true,
      }
    })}
  componentDidMount() {
    this._isMounted = true
    // init with only system messages
    this.setState({
      messages: messagesData, // messagesData.filter(message => message.system),
      appIsReady: true,
      isTyping: false,
    })
  }
  parsePatterns = (_linkStyle) => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: 'underline', color: 'darkorange' },
        onPress: () => alert('eu amo o meetnow'),
      },
    ]
  }
  renderCustomView(props) {
    return <CustomView {...props} />
  }
  setIsTyping = () => {
    this.setState({
      isTyping: !this.state.isTyping,
    })
  }
  renderAccessory = () => (
    <AccessoryBar onSend={this.onSendFromUser} isTyping={this.setIsTyping} />
  )

  renderCustomActions = props =>
    Platform.OS === 'web' ? null : (
      <CustomActions {...props} onSend={this.onSendFromUser} />
    )
    renderBubble = (props) => {
      return <Bubble {...props} />
    }
    renderSystemMessage = props => {
      return (
        <SystemMessage
          {...props}
          containerStyle={{
            marginBottom: 15,
          }}
          textStyle={{
            fontSize: 14,
          }}
        />
      )
    }  

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      nick: this.props.navigation.state.params.nick,
      avatar: this.props.navigation.state.params.avatar,
      id: this.props.navigation.state.params.id,
      _id: this.props.navigation.state.params.id, // need for gifted-chat
    };
  }

  render() {

    const topContent = (     <NavBar user={this.user}/>);
    const mainContent = (

      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}
        parsePatterns={this.parsePatterns}
        user={this.user}
        scrollToBottom
        onLongPressAvatar={user => {}}
        onPressAvatar={() => {}}
        keyboardShouldPersistTaps='never'
        renderAccessory={Platform.OS === 'web' ? null : this.renderAccessory}
        renderActions={this.renderCustomActions}
        // renderBubble={this.renderBubble}
        renderSystemMessage={this.renderSystemMessage}
        // renderCustomView={this.renderCustomView}
        timeTextStyle={{ left: { color: '#555' }, right: { color: '#0cff' } }}
        isTyping={this.state.isTyping}
      />
    );

      return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding"  keyboardVerticalOffset={80} enabled>
            
            {topContent}
           {mainContent} 
      </KeyboardAvoidingView>
    );

  }
 

  componentDidMount() {
    firebaseSvc.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      })),()=>(this.props.navigation.state.params.conversationId)
      )
  }
  componentWillUnmount() {
    firebaseSvc.refOff(this.props.navigation.state.params.conversationId);
  }
}
const styles = StyleSheet.create(
    { container:{
      flex: 1,
      backgroundColor:'#f5f5f5',

  },
    containerSobe:{
      alignItems:'stretch',
      flex:1,
      justifyContent:'space-between'
    },

      mensagens:{
        backgroundColor:'white',
        top:0,
        bottom:0,
        left:0,
        flex:1,
        right:0,
      },
      topBar:{
        backgroundColor:'white',
        elevation:10,
        flexDirection:'row',
        alignItems:'center',
        height:70,
        padding:10,
        shadowColor:'#000',
        shadowOpacity: 0.05,
        shadowRadius:2,
        shadowOffset:{
            width:0,
            height:2,
        },
    },
    topBarItens:{        
      flexDirection:'row',
      alignItems:'center',
      marginTop:25,
    },
    buttonReturn:{
      height:40,
      width:25,
      marginHorizontal:10,
    },

    button:{    
      flex:1, 
      alignItems:'center',
      alignContent:'center',
      backgroundColor:'#DDd',
      },
        avatar:{
            marginRight:20,
            height:40,
            width:40,
            borderRadius:20,
        },
        name:{
            fontWeight:'bold',
            fontSize:16,

        },

    });

export default Chat;
