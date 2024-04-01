import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Signin from './components/Signin';
// import ChatRoom from './components/ChatRoom';
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
  // const [messages, setMessages] = useState([]);

  const messagesRef = collection(firestore, 'messages');
  // const query = messagesRef.orderBy('createdAt').limit(25);
  // const [messages] = useCollectionData(query, { idField: 'id' });

  const [messages, loadingMessages, error] = useCollectionData(
    query(collection(firestore, 'messages')),
  );

  console.log('messages', messages);

  // const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(25));
  // const [messages] = useCollectionData(q, { idField: 'id' });

  // const docSnap = await getDoc(messagesRef);

  // if (docSnap.exists()) {
  //   console.log('Document data:', docSnap.data());
  // } else {
  //   console.log('No such document!');
  // }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const messagesRef = collection(firestore, 'messages');
  //     const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(25));
  //     const querySnapshot = await getDocs(q);
  //     const data = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setMessages(data);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className='mx-auto h-screen w-[600px] bg-yellow-100'>
      <h1 className='text-center text-xl'>Chat Room</h1>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
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
