import firebase from 'firebase';
import uuid from 'uuid';
import firebaseConfig from './apiKey'
import { UserCard } from '../components/UserCard';


class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      console.log("firebase apps already running...")
    }
  }
  get uid() {
    return (firebase.auth().currentUser||{}).uid;
  }

  get ref() {
    return firebase.database().ref('Messages');
  }
  login = async(user, success_callback, failed_callback) => {
    console.log("logging in");
    const output = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(success_callback, failed_callback);
  }
  handleLike = ( _id)=> {
    const id=firebase.auth().currentUser.uid
    firebase.database().ref('users/'+_id).child('likes').on('value',(snapshot)=>{
      snapshot = snapshot.toJSON()
      for(var i in snapshot){
        if(snapshot[i]==id){
          const idDaConversa=uuid.v4()
          firebase.database().ref('users/'+_id).child('matchs').push(id)
          firebase.database().ref('users/'+id).child('matchs').push(_id)
          firebase.database().ref('users/'+id).child('conversas/'+idDaConversa).set(_id);
          firebase.database().ref('users/'+_id).child('conversas/'+idDaConversa).set(id);
          }
      }
    })
    firebase.database().ref('users/'+_id).child('likes').off()
    
    firebase.database().ref('users/'+id).child('likes').on('value',
    (snapshot)=>{
      snapshot = snapshot.toJSON()
      for(var i in snapshot){
        if(snapshot[i]==_id){
         return;
        }
      }
      firebase.database().ref('users/'+id).child('likes').push(_id);
    }
    )

    firebase.database().ref('users/'+id).child('deslikes').off()
    firebase.database().ref('users/'+id).child('deslikes').on('value',
    (snapshot)=>{
      snapshot = snapshot.toJSON()
      for(var i in snapshot){
        if(snapshot[i]==_id){
         firebase.database().ref('users/'+id).child('deslikes/'+i).remove();
        }
      }
    }
    )
    firebase.database().ref('users/'+id).child('deslikes').off()
    firebase.database().ref('users/'+id).child('likes').off()
    firebase.database().ref('/user/'+id).off();
    firebase.database().ref('/user/'+_id).off();


  }
  handleDeslike = (_id)=> {
    const id=firebase.auth().currentUser.uid
    firebase.database().ref('users/'+id).child('deslikes').off()

    firebase.database().ref('users/'+id).child('deslikes').on('value',
    (snapshot)=>{
      snapshot = snapshot.toJSON()
      for(var i in snapshot){
        if(snapshot[i]==_id){
          return;
        }
      }
      firebase.database().ref('users/'+id).child('deslikes').push(_id);
    }
    )
    firebase.database().ref('users/'+id).child('deslikes').off()

    firebase.database().ref('users/'+id).child('likes').on('value',
    (snapshot)=>{
      snapshot = snapshot.toJSON()
      for(var i in snapshot){
        if(snapshot[i]==_id){
         firebase.database().ref('users/'+id).child('likes/'+i).remove();
        }
      }
    }
    )
    firebase.database().ref('users/'+id).child('likes').off()
    firebase.database().ref('/user/'+id).off();
    firebase.database().ref('/user/'+_id).off();
  }
  
  getFeed = (callback)=> {
    var notUsers=[];
    var user={};
    var users=[];            
    const id=firebase.auth().currentUser.uid
          firebase.database().ref('/users').on('value', function (snapshot){
            snapshot = snapshot.toJSON()
            delete snapshot[firebase.auth().currentUser.uid]
            for (var i in snapshot){
                const retorno = snapshot[i]

                users.push(retorno);
            };
            firebase.database().ref('/users/'+id).child('likes').on('value', (snapshot)=>{
              snapshot=snapshot.toJSON();

              for(var i in snapshot){
                notUsers.push(snapshot[i]);
              }
            })
            firebase.database().ref('/users/'+id).child('likes').off();

            firebase.database().ref('users/'+id).child('deslikes').on('value',
            (snapshot)=>{
              snapshot=snapshot.toJSON();
              for(var i in snapshot){
                const {bio,desgostos,gostos,fotos,name,email,avatar,apelido} = snapshot[i]
                user.bio = bio;
                user.desgostos = desgostos;
                user.gostos=gostos;
                user.fotos=fotos;
                user.name = name;
                user.email = email;
                user.avatar = avatar;
                user.apelido = apelido;
                notUsers.push(snapshot[i]);
              }
            })
            firebase.database().ref('/users/'+id).child('deslikes').off();
            callback(users)
          })
          firebase.database().ref('/users/'+id).off()
  }
  getMatch = (callback)=>{
    const id=firebase.auth().currentUser.uid
      firebase.database().ref('users/'+id).child('matchs').on('value', 
      (snapshot)=>{
      snapshot = snapshot.toJSON()
      for(var i in snapshot){
      firebase.database().ref('users/'+id).child('matched').push(snapshot[i]);
      firebase.database().ref('users/'+id).child('matchs/'+i).remove();
      firebase.database().ref('users/'+snapshot[i]).on('value', 
      (snapshot)=>{
        const{avatar, name,bio} = snapshot.toJSON();
        callback({avatar,name,bio});
      })
      }
      }
      
      )
  }
  getConversas = (callback)=>{
    var conversas=[];
    const id=firebase.auth().currentUser.uid
    firebase.database().ref('users/'+id).child('conversas').on('value'||'child_added',
    (snapshot)=>{
      snapshot = snapshot.toJSON()
      for(var i in snapshot){
          firebase.database().ref('users').child(snapshot[i]).on('value',
          (snapshot)=>{
            const {_id,avatar, nick, bio, name}=snapshot.val()
            conversas.push({id:_id,avatar,nick,bio,name, conversationId:i})
          })
          firebase.database().ref('users').child(snapshot[i]).off();
      }
      callback(conversas);
    }
    )

  }
  getPerfil = (getId,callback)=>{
    var user = {};
    firebase.database().ref('users').child(getId()).on('value', snapshot=>{
      const {bio, desgostos,gostos, fotos, name, email, avatar, apelido} = snapshot.toJSON();
      user.bio = bio;
      user.desgostos = desgostos;
      user.gostos=gostos;
      user.fotos=fotos;
      user.name = name;
      user.email = email;
      user.avatar = avatar;
      user.nick = apelido;
      callback(user);
    })
  }
  
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        this.login(user);
      } catch ({ message }) {
        console.log("Failed:" + message);
      }
    } else {
      console.log("Reusing auth...");
    }
  };

  createAccount = async (user) => {
    firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(function() {
        console.log("created user successfully. User email:" + user.email + " name:" + user.name);
        var userf = firebase.auth().currentUser;
        
        firebase.database().ref('users').child(userf.uid).set({
          _id: userf.uid,
          avatar: user.avatar,
          name: user.name,
          apelido: user.apelido,
          email: user.email,
          gostos:user.gostos,
          bio:user.bio,
          desgostos: user.desgostos,
        })

        userf.updateProfile({ displayName: user.name})
        .then(function() {
          console.log("Updated displayName successfully. name:" + user.name);
          alert("User " + user.name + " was created successfully. Please login.");
        }, function(error) {
          console.warn("Error update displayName.");
        });
      }, function(error) {
        console.error("got error:" + typeof(error) + " string:" + error.message);
        alert("Create account failed. Error: "+error.message);
      });
  }

  uploadPhotoMessage = async uri => {
    console.log('got image to upload. uri:' + uri);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref('messages')
        .child(uuid.v4());
      const task = await ref.put(blob);
        return ref.getDownloadURL().then((url)=>{return url})
    } catch (err) {
      console.log('uploadImage try/catch error: ' + err.message); //Cannot load an empty url
    }
  }
  uploadImage = async uri => {
    console.log('got image to upload. uri:' + uri);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref('avatar')
        .child(uuid.v4());
      const task = await ref.put(blob);
     return ref.getDownloadURL().then((url)=>{return url})
    } catch (err) {
      console.log('uploadImage try/catch error: ' + err.message); //Cannot load an empty url
    }
  }

  updateAvatar = (url) => {
    //await this.setState({ avatar: url });
    var userf = firebase.auth().currentUser;
    firebase.database().ref('users/'+userf.uid+'/avatar').set(url)
    if (userf != null) {
      userf.updateProfile({ avatar: url})
      .then(function() {
        console.log("Updated avatar successfully. url:" + url);
        alert("Avatar image is saved successfully.");
      }, function(error) {
        console.warn("Error update avatar.");
        alert("Error update avatar. Error:" + error.message);
      });
    } else {
      console.log("can't update avatar, user is not login.");
      alert("Unable to update avatar. You must login first.");
    }
  }
     
  onLogout = user => {
    firebase.auth().signOut().then(function() {
      console.log("Sign-out successful.");
    }).catch(function(error) {
      console.log("An error happened when signing out");
    });
  }


  parse = snapshot => {

    const { createdAt, text, user,image, video, location,received,sent } = snapshot.text? snapshot:snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat

    const message = {
      id,
      _id,
      createdAt:new Date(createdAt),
      text,
      user,
      sent,
      received
    };
    image? message.image=image:null;
    video? message.video=video:null;
    location? message.location=location:null;
    return message;
  };

  refOn = (callback, getId) => {
    this.ref.child(getId())
      .limitToLast(20)
      .on('child_added', snapshot => {callback(this.parse(snapshot))});
  }


  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  
  // send the message to the Backend
  send =({messages, id}) => {

    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
        messages[i].createdAt= this.timestamp;
       return this.ref.child(id).push(messages[i]).then((value)=>{ 
        value.child('sent').set(true);
        return value;
        }
       )
    }
  };

  refOff(id) {
    this.ref.child(id+"").off();
  }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
