import { useState, useRef, useEffect } from 'react';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Signin from './components/Signin';
import Signout from './components/Signout';
import { FaRegUserCircle } from 'react-icons/fa';

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

const ChatRoom = ({ user }) => {
  const userName = user.displayName.split(' ')[0];
  const bottom = useRef();
  const messagesRef = collection(firestore, 'messages');
  const [formValue, setFormValue] = useState('');

  console.log('auth.currentUser', auth.currentUser);

  const [messages, loadingMessages, error] = useCollectionData(
    query(messagesRef, orderBy('createdAt'), limit(25)),
  );

  useEffect(() => {
    if (bottom.current) {
      bottom.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue('');
    bottom.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className='mx-auto h-[400px] w-[600px] overflow-scroll bg-yellow-100'>
        <h1 className='text-center text-xl'>Chat Room</h1>
        <div>
          {loadingMessages && <p>Loading...</p>}
          {messages &&
            messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} userName={userName} />
            ))}
          {error && <p className='text-red-500'>{error}</p>}
        </div>
        <div ref={bottom}></div>
      </div>
      <form
        onSubmit={sendMessage}
        className='mx-auto flex w-[600px] justify-between gap-x-2'
      >
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder='say something'
          className='w-full px-2'
        />

        <button
          type='submit'
          disabled={!formValue}
          className='rounded-md bg-blue-600 px-4 py-2 text-white'
        >
          send
        </button>
      </form>
    </>
  );
};

const ChatMessage = ({ message, userName }) => {
  const { text, uid, photoURL } = message;

  console.log('photoURL', photoURL);

  const messageClass =
    uid === auth.currentUser.uid
      ? 'bg-green-200'
      : 'bg-violet-200 justify-self-end';

  return (
    <div className='mb-2 flex items-center justify-start gap-x-2'>
      <div className='flex w-[40px] flex-col items-center justify-center'>
        <img src={photoURL || '/user.webp'} className='w-full rounded-full' />
        {/* <p>{userName}</p> */}
      </div>

      <p className={`${messageClass} w-fit rounded-3xl px-4 py-2`}>{text}</p>
    </div>
  );
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
        {user ? (
          <ChatRoom user={user} />
        ) : (
          <Signin signInWithGoogle={signInWithGoogle} />
        )}
      </section>
    </>
  );
};

export default App;
