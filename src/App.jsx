// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Signin from './components/Signin';
import { Result } from 'postcss';
import ChatRoom from './components/ChatRoom';
import Signout from './components/Signout';

const firebaseConfig = {
  apiKey: 'AIzaSyB6Zsb1iMRIQm27wz0W8coHZnBRp5Hf738',
  authDomain: 'chat-react-firebase-6de84.firebaseapp.com',
  projectId: 'chat-react-firebase-6de84',
  storageBucket: 'chat-react-firebase-6de84.appspot.com',
  messagingSenderId: '497286241071',
  appId: '1:497286241071:web:684db2b866154827651fda',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// const provider = new GoogleAuthProvider();

// firebase.initializeApp({
//   conf...
// });

// const auth = firebase.auth();
// const firestore = firebase.firestore();

const App = () => {
  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    const provider = new GoogleAuthProvider();
    // auth.signInWithPopup(provider);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        console.log('credential', credential);
        console.log('token', token);
        console.log('user', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(errorCode, errorMessage);
      });
  };

  // console.log('auth', auth.currentUser);

  return (
    <>
      <header>
        <Signout auth={auth} />
      </header>
      <section>
        {user ? <ChatRoom /> : <Signin signInWithGoogle={signInWithGoogle} />}
      </section>
    </>
  );
};

export default App;
