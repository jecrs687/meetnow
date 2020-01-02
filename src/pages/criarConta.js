import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {Image,
  StyleSheet, Text,View,
  Button, ImageEditor,KeyboardAvoidingView,TouchableOpacity
} from 'react-native';
import logo from '../assets/logo.png'
import { TextInput } from 'react-native-paper';
import { createStackNavigator } from 'react-navigation';
import firebaseSvc from '../services/FirebaseSvc';




class CreateAccount extends React.Component {
  static navigationOptions = {
    title: 'Create account',
  };
constructor(props){
super(props);
  this.state = {
    index:0,
    name: '',
    apelido:'',
    email: '',
    password: '',
    avatar: '',
    gostos:'',
    bio:'',
    desgostos:'',

  };
}

  onPressCreate = async () => {
    console.log('create account... email:' + this.state.email);
    try {
      const user = {
        apelido:this.state.apelido,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        avatar: this.state.avatar,
        gostos:this.state.gostos,
        bio:this.state.bio,
        desgostos:this.state.desgostos,
      };
      await firebaseSvc.createAccount(user);
    } catch ({ message }) {
      console.log('create account failed. catch error:' + message);
    }
    this.props.navigation.navigate('Login')
  };


  onImageUpload = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    try {
      // only if user allows permission to camera roll
      if (cameraRollPerm === 'granted') {
        console.log('choosing image granted...');
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log(
          'ready to upload... pickerResult json:' + JSON.stringify(pickerResult)
        );

        var wantedMaxSize = 150;
        var rawheight = pickerResult.height;
        var rawwidth = pickerResult.width;
        
        var ratio = rawwidth / rawheight;
        var wantedwidth = wantedMaxSize;
        var wantedheight = wantedMaxSize/ratio;
        // check vertical or horizontal
        if(rawheight > rawwidth){
            wantedwidth = wantedMaxSize*ratio;
            wantedheight = wantedMaxSize;
        }
        console.log("scale image to x:" + wantedwidth + " y:" + wantedheight);
        let resizedUri = await new Promise((resolve, reject) => {
          ImageEditor.cropImage(pickerResult.uri,
          {
              offset: { x: 0, y: 0 },
              size: { width: pickerResult.width, height: pickerResult.height },
              displaySize: { width: wantedwidth, height: wantedheight },
              resizeMode: 'contain',
          },
          (uri) => resolve(uri),
          () => reject(),
          );
        });
        let uploadUrl = await firebaseSvc.uploadImage(resizedUri);
        //let uploadUrl = await firebaseSvc.uploadImageAsync(resizedUri);
        await this.setState({ avatar: uploadUrl });
        console.log(" - await upload successful url:" + uploadUrl);
        console.log(" - await upload successful avatar state:" + this.state.avatar);
        await firebaseSvc.updateAvatar(uploadUrl); //might failed
      }
    } catch (err) {
      console.log('onImageUpload error:' + err.message);
      alert('Upload image error:' + err.message);
    }
  };


  handleNext(){
    this.state.index==0? 
    this.setState({index: 1})
      : 
      this.state.index==1? 
      this.setState({index: 2})
        :
        this.state.index==2? 
         this.setState({index: 3})
          :
          this.state.index==3? 
          this.setState({index: 4})
                      :
            this.state.index==4? 
            this.setState({index: 5})
                          :
              this.state.index==5? 
              this.setState({index: 6})
                              :              
                      null
  }
    handleReturn(){
      this.state.index==1? 
      this.setState({index: 0})
            :
      this.state.index==2? 
      this.setState({index: 1})
              :
        this.state.index==3? 
        this.setState({index: 2})
                  :
          this.state.index==4? 
          this.setState({index: 3})
                        :
              this.state.index==5? 
              this.setState({index: 4})
                            :
              null
  }
  
  onChangeTextName = name => this.setState({ name });
  onChangeTextApelido = apelido => this.setState({ apelido });
  onChangeTextPassword = password => this.setState({ password });
  onChangeTextEmail = email => this.setState({ email });
  onChangeTextGostos = gostos => this.setState({gostos})
  onChangeTextBio =  bio => this.setState({bio})
  onChangeTextDesgostos = desgostos => this.setState({desgostos})
  
  textemail(){
  return (
  <React.Fragment>
    <TextInput 
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="nome" 
    value={this.state.name}
    onChangeText={this.onChangeTextName}
    style={styles.input}/>
    <TextInput 
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="apelido" 
    value={this.state.apelido}
    onChangeText={this.onChangeTextApelido}
    style={styles.input}/>
  <TextInput 
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="email" 
    value={this.state.email}
    onChangeText={this.onChangeTextEmail}
    style={styles.input}/>
    <View style={styles.buttons}>
      <TouchableOpacity onPress={()=>{this.handleNext()}} style={styles.button}><Text style={styles.textButton}>confirmar</Text></TouchableOpacity>
    </View>
    </React.Fragment>
    )}
textpassword(){
  return (
    <React.Fragment>
      
    <TextInput 
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="usuário" 
    value={this.state.name}
    onChangeText={this.onChangeTextName}
    style={styles.input}/>
        <TextInput 
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="apelido" 
    value={this.state.apelido}
    onChangeText={this.onChangeTextApelido}
    style={styles.input}/>
      <TextInput 
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="email" 
    value={this.state.email}
    onChangeText={this.onChangeTextEmail}
    style={styles.input}/>
    <TextInput 
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="password"
      textContentType='password'
      value={this.state.password}
      onChangeText={this.onChangeTextPassword}
      style={styles.input}/>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={()=>{this.handleReturn()}} style={styles.button2}><Text style={styles.textButton}>voltar</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.handleNext()}} style={styles.button}><Text style={styles.textButton}>confirmar</Text></TouchableOpacity>
      </View>
      </React.Fragment>
    )}
textBio(){
  return (
    <React.Fragment>
    <TextInput 
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Me fale um pouco sobre você" 
      value={this.state.bio}
      onChangeText={this.onChangeTextBio}
      style={styles.inputGrande}/>
      <View style={styles.buttons}>      
      <TouchableOpacity onPress={()=>{this.handleReturn()}} style={styles.button2}><Text style={styles.textButton}>voltar</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>{this.handleNext()}} style={styles.button}><Text style={styles.textButton}>confirmar</Text></TouchableOpacity>
      </View>
      </React.Fragment>
    )}
textAvatar(){
return (
  <React.Fragment>

  <Button
          title="foto de pergil"
          style={styles.buttonText}
          onPress={()=>{this.onImageUpload()}}
/>
<TextInput 
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="usuário" 
    value={this.state.name}
    onChangeText={this.onChangeTextName}
    style={styles.input}/>
        <TextInput 
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="apelido" 
    value={this.state.apelido}
    onChangeText={this.onChangeTextApelido}
    style={styles.input}/>
      <TextInput 
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="email" 
    value={this.state.email}
    onChangeText={this.onChangeTextEmail}
    style={styles.input}/>
    <TextInput 
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="password"
      textContentType='password'
      value={this.state.password}
      onChangeText={this.onChangeTextPassword}
      style={styles.input}/>

    <View style={styles.buttons}>
    <TouchableOpacity onPress={()=>{this.handleReturn()}} style={styles.button2}><Text style={styles.textButton}>voltar</Text></TouchableOpacity>
    <TouchableOpacity onPress={()=>{this.handleNext()}} style={styles.button}><Text style={styles.textButton}>confirmar</Text></TouchableOpacity>
    </View>
    </React.Fragment>
)};
textGostos(){
  return (
    <React.Fragment>
    <TextInput 
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Quais são as coisas que você gosta e lhe atraem?" 
      value={this.state.gostos}
      onChangeText={this.onChangeTextGostos}
      style={styles.inputGrande}/>
      <View style={styles.buttons}>
      <TouchableOpacity onPress={()=>{this.handleReturn()}} style={styles.button2}><Text style={styles.textButton}>voltar</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>{this.handleNext()}} style={styles.button}><Text style={styles.textButton}>confirmar</Text></TouchableOpacity>
      </View>
      </React.Fragment>
    )}
textDesgostos(){
  return (
    <React.Fragment>
    <TextInput 
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Quais são as coisas que lhe desagradam?" 
      value={this.state.desgostos}
      onChangeText={this.onChangeTextDesgostos}
      style={styles.inputGrande}/>
      <View style={styles.buttons}>
      <TouchableOpacity onPress={()=>{this.handleReturn()}} style={styles.button2}><Text style={styles.textButton}>voltar</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>{this.handleNext()}} style={styles.button}><Text style={styles.textButton}>confirmar</Text></TouchableOpacity>
      </View>
      </React.Fragment>
    )}
  tela(index){
    switch(index){
      case 0:
       return this.textemail();
      case 1:
        return this.textpassword()
      case 2:
        return this.textAvatar()
      case 3:
        return this.textBio()
      case 4:
        return  this.textGostos()
      case 5:
        return  this.textDesgostos()
      case 6:
       this.onPressCreate()
       break;
        }
  }
  
  render() {
    return (
      <KeyboardAvoidingView
      behavior="padding"
      enabled={true}
      style={styles.container}
      >
    <Image source={logo} style={styles.logo}/>
          {this.tela(this.state.index)}
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}} style={{alignSelf:"center"}}>
            <Text 
          style={{textAlign:"center",alignSelf:'center', color:'blue', textDecorationStyle:'double',fontStyle:'italic',
          fontSize:16, margin:30, textDecorationLine:'underline',
        }}>login</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
    );
  }
}

const offset = 16;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding:30,
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  input:{
    height:46,
    alignSelf:'stretch',
    backgroundColor: '#FFF',
    borderWidth:0.1,
    borderRadius:4,
    borderColor:'#f0f0f5',
    marginTop:20,
    paddingHorizontal:15,
  },  inputGrande:{
    height:300,
    padding:10,
    textAlignVertical:'top',
    textAlign:'left',
    alignSelf:'stretch',
    borderWidth:0.1,
    borderRadius:4,
    borderColor:'#f0f0f5',
    elevation:2,
    shadowColor:'#000',
    shadowOpacity: 0.05,
    shadowRadius:2,
    shadowOffset:{
        width:0,
        height:2,
    },
    marginTop:20,
    paddingHorizontal:15,
  },
  buttons:{
    flexDirection:'row',
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'space-between',
},
  button:{
      width:'60%',
      marginTop:10,
      backgroundColor:'#ff3399',
      borderColor:'#fff',
      borderWidth:3,
      borderRadius:7,
      height:50,
      alignSelf:'stretch',
      alignItems:'center',
      justifyContent:'center',
  },
  button2:{
    width:'38%',
    marginTop:10,
    backgroundColor:'#0000ca',
    borderColor:'#fff',
    borderWidth:3,
    borderRadius:7,
    height:50,
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'center',
  },
  textButton:{
      fontStyle:'normal',
      fontWeight:'bold',
      fontSize:14,
      color:'white',
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
    fontSize: offset,
  },
  buttonText: {
    margin:50,
    fontSize: 42,
  },
});

export default CreateAccount;
