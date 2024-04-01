import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Signin from './components/Signin';
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

const ChatRoom = () => {
  const [messages, loadingMessages, error] = useCollectionData(
    query(collection(firestore, 'messages'), orderBy('createdAt'), limit(25)),
  );

  console.log('messages', messages);

  return (
    <div className='mx-auto h-screen w-[600px] bg-yellow-100'>
      <h1 className='text-center text-xl'>Chat Room</h1>
      <div>
        {loadingMessages && <p>Loading...</p>}
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        {error && <p className='text-red-500'>{error}</p>}
      </div>
    </div>
  );
};

const ChatMessage = ({ message }) => {
  const { text, uid } = message;
  return <p>{text}</p>;
};

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
