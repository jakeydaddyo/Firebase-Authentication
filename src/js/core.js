import { authControl, user } from './modules/firebase-modules.js';
import { resourceManager } from './resources/resources.js';
import { FirebaseAnalytics } from "@capacitor-firebase/analytics";
import { SplashScreen } from '@capacitor/splash-screen';
(()=>{
  //Firebase Analytics
  {
    const setEnabled = async () => {
      await FirebaseAnalytics.setEnabled({
        enabled: true,
      });
    };
    setEnabled();
  }

  //Capacitor SplashScreen
  {
    SplashScreen.hide();
  }

  //User Auth 
    let auth = new authControl({
      config: {
          apiKey: "AIzaSyCQSZgZcuLN-ikfUVe819pqN3zSLk4WpTU",
          authDomain: "in-a-row-ff722.firebaseapp.com",
          projectId: "in-a-row-ff722",
          storageBucket: "in-a-row-ff722.appspot.com",
          messagingSenderId: "520009434080",
          appId: "1:520009434080:web:bb8fb6a0ed1f462c4fa185",
          measurementId: "G-H6JRH291JY",
        },
        hook: function(e){
          e.authed ? (async ()=>{
            const attachedUser = await user(e.email);
            resourceManager([{
              resource:'coins.home',
              operation:'innerText',
              attributes: {
                attr1:attachedUser.coins
              }
            },{
            resource:'navPage.splash',
            operation:'setAttribute',
            attributes: {
              attr1:'data-state',
              attr2:'hidden'
            }
          },{
            resource:'navPage.home',
            operation:'setAttribute',
            attributes: {
              attr1:'data-state',
              attr2:'visible'
            }
          }])})() : (()=>{resourceManager([{
            resource:'coins.home',
            operation:'innerText',
            attributes: {
              attr1:'0'
            }
          },{
          resource:'navPage.splash',
          operation:'setAttribute',
          attributes: {
            attr1:'data-state',
            attr2:'visible'
          }
        },{
          resource:'navPage.home',
          operation:'setAttribute',
          attributes: {
            attr1:'data-state',
            attr2:'hidden'
          }
        },{
            resource:'landingPage.splashText',
            operation:'innerText',
            attributes:{
              attr1:'Please login to access online services'
            }
          },{
            resource:'landingPage.resource',
            operation:'setAttribute',
            attributes:{
              attr1:'data-module',
              attr2:'login'
            }
          }])})();
          console.log(e);
        }
  });

  //NAV
  {
    resourceManager([{
      resource:'landingPage.google',
      operation:'addEventListener',
      attributes:{
        attr1:'click',
        attr2:()=>{
          auth.googleSignin();
        }
      }
    },
    {
      resource:'home.logout',
      operation:'addEventListener',
      attributes:{
        attr1:'click',
        attr2:()=>{
          auth.logout();
        }
      }
    }]);
  }

})();
