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

  login = async(user, success_callback, failed_callback) => {
    console.log("logging in");
    const output = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(success_callback, failed_callback);
  }
  handleLike = ( _id)=> {
    const id=firebase.auth().currentUser.uid
    firebase.database().ref(_id).child('likes').on('value',(snapshot)=>{
      console.log(snapshot)
    })
    firebase.database().ref(id).child('likes').push(_id)
  }
  handleDeslike = (_id)=> {
    const id=firebase.auth().currentUser.uid
    firebase.database().ref(id).child('deslikes').push(_id)
  }
  obterFeed = (callback)=> {
          firebase.database().ref('/users').on('value', function (snapshot){
            var users=[];            
            snapshot = snapshot.toJSON()
            snapshot[firebase.auth().currentUser.uid]
            delete snapshot[firebase.auth().currentUser.uid]
            
            for (var childSnapshot in snapshot){
                const retorno = snapshot[childSnapshot]
                users.push(retorno);
            };
            callback(users)
          })
  }
  getPerfil = (callback)=>{
    var user = firebase.auth().currentUser;
    firebase.database().ref('users').child(user.uid).on('value', snapshot=>{
      const {bio, desgostos,gostos, fotos, name, email, avatar, apelido} = snapshot.toJSON();
      user.bio = bio;
      user.desgostos = desgostos;
      user.gostos=gostos;
      user.fotos=fotos;
      user.name = name;
      user.email = email;
      user.avatar = avatar;
      user.apelido = apelido;
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
          fotos:{1:"https://firebasestorage.googleapis.com/v0/b/meetnow-c6097.appspot.com/o/users%2Fprofile%2F4T96QMpodLanIX613z4XJoFYaMp2.jpg?alt=media&token=111db581-fa88-46a5-a8b3-a3d99079d2e4"},
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

  uploadImage = async uri => {
    console.log('got image to upload. uri:' + uri);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref('avatar')
        .child(uuid.v4());
      const task = ref.put(blob);
    
      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          () => {
              /* noop but you can track the progress here */
          },
          reject /* this is where you would put an error callback! */,
          () => resolve(task.snapshot.downloadURL)
        );
      });
    } catch (err) {
      console.log('uploadImage try/catch error: ' + err.message); //Cannot load an empty url
    }
  }

  updateAvatar = (url) => {
    //await this.setState({ avatar: url });
    var userf = firebase.auth().currentUser;
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

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('Messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);

    const message = {
      id,
      _id,
      timestamp,
      text,
      user,
    };
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
  send = ({messages, id}) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        createdAt: this.timestamp,
      };
      this.ref.child(id+"").push(message)
    }
  };

  refOff(id) {
    this.ref.child(id+"").off();
  }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
