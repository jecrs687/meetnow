import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import {Text, View, Image,StyleSheet,SafeAreaView,KeyboardAvoidingView,TouchableOpacity,Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';import firebaseSvc from '../services/FirebaseSvg';



class Chat extends React.Component {

  constructor(props) {
    super(props);

  }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };
   handleReturn(){
    console.log(this.props.navigation);
  };

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      email: this.props.navigation.state.params.email,
      avatar: this.props.navigation.state.params.avatar,
      id: firebaseSvc.uid,
      _id: firebaseSvc.uid, // need for gifted-chat
    };
  }

  render() {
    const mainContent = (
        <GiftedChat
        messages={this.state.messages}
        placeholder="escreva algo..."
        onSend={firebaseSvc.send}
        loadEarlier={true}
        showAvatarForEveryMessage={true}
        user={this.user}
      />
    );
    if (Platform.OS === 'android') {
      return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding"  keyboardVerticalOffset={80} enabled>
          <View style={styles.topBar}>
            <View style={styles.topBarItens}>
            <TouchableOpacity onPress={this.handleReturn} style={styles.buttonReturn}>
            <Ionicons name="ios-arrow-back" size={25} color="#AAA" />
            </TouchableOpacity>
            <Image source={{uri: this.user.avatar}} style={styles.avatar}/>
            <View>
            <Text style={styles.name}>{this.user.name}</Text>
            <Text style={styles.user}>{this.user.name}</Text>
            </View>
            </View>
            </View>
           {mainContent} 
      </KeyboardAvoidingView>
    );
    } else {
      return (<SafeAreaView style={{flex: 1}}>
          <View style={styles.topBar}>
            <View style={styles.topBarItens}>
            <TouchableOpacity onPress={this.handleReturn} style={styles.buttonReturn}>
            <Ionicons name="ios-arrow-back" size={25} color="#AAA" />
            </TouchableOpacity>
            <Image source={{uri: this.user.avatar}} style={styles.avatar}/>
            <View>
            <Text style={styles.name}>{this.user.name}</Text>
            <Text style={styles.user}>{this.user.name}</Text>
            </View>
            </View>
            </View>
        {mainContent}
      </SafeAreaView>)
    } 
  }
 

  componentDidMount() {
      
    firebaseSvc.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    firebaseSvc.refOff();
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
            borderRadius:30,
        },
        name:{
            fontWeight:'bold',
            fontSize:16,

        },

    });

export default Chat;
