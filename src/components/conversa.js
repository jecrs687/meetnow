import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import {Text, View, Image,StyleSheet,SafeAreaView,KeyboardAvoidingView,TouchableOpacity,Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebaseSvc from '../services/FirebaseSvc';



class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      recarregar:null,
    }

  }
  
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };


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
    const topContent = (        <View style={styles.topBar}>
        <View style={styles.topBarItens}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('listConversas');}} style={styles.buttonReturn}>
        <Ionicons name="ios-arrow-back" size={25} color="#AAA" />
        </TouchableOpacity>
        <Image source={{uri: this.user.avatar, cache:'force-cache'}} style={styles.avatar}/>
        <View>
        <Text style={styles.name}>{this.user.name}</Text>
        <Text style={styles.user}>{this.user.nick}</Text>
        </View>
        </View>
        </View>);
    const mainContent = (

        <GiftedChat
        messages={this.state.messages}
        placeholder="escreva algo..."
        onSend={(messages)=>{firebaseSvc.send({messages: messages, id: this.props.navigation.state.params.conversationId})}}
        loadEarlier={true}
        onInputTextChanged={(text)=>{this.setState({recarregar:!this.state.recarregar})}}
        textInputStyle={{height:100}}
        showAvatarForEveryMessage={true}
        user={this.user}
      />
    );
    if (Platform.OS === 'android') {
      return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding"  keyboardVerticalOffset={80} enabled>
            {topContent}
           {mainContent} 
      </KeyboardAvoidingView>
    );
    } else {
      return (<SafeAreaView style={{flex: 1}}>
         {topContent} 
        {mainContent}
      </SafeAreaView>)
    } 
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
