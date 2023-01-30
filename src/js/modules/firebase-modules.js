//import * as firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

const fb = firebase.default;
export function user(email) {
  return new Promise(async (resolve,reject)=>{
    const newUser = {
      coins: 50,
      wins: 0,
      enabledCards: [],
      enabledItems: []
    }
    const db = fb.firestore();
    const users = db.collection('user');
    //const user = (await users.doc(email).get()).data();
    const userExists = await users.doc(email).get();
    userExists.exists ? resolve(userExists.data()) : (async ()=>{
      await users.doc(email).set(newUser);
      resolve(newUser)
    })();
  })
}

export class authControl {
    constructor({config, hook}) {
        fb.initializeApp(config);
        this.hook = hook;
        this.#authHook();
    }
    logout(){
      fb.auth().signOut();
    }
    async googleSignin(){
        const result = await FirebaseAuthentication.signInWithGoogle(); //promise is never resolved here, on mobile
      return result.user;

    }
     #authHook () {
            const auth = fb.auth();
            auth.onAuthStateChanged(auth=>{
                if (auth) {
                    this.hook({
                        authed: true,
                        uuid:auth.uid,
                        email:auth.email
                            });
                } else this.hook({
                        authed: false
                    });
     });

    }
}