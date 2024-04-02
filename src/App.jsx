import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import ChatRoom from './components/ChatRoom';
import Header from './components/Header';
import StartPage from './pages/StartPage';

const App = () => {
  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
  };

  return (
    <>
      {!user ? (
        <StartPage signInWithGoogle={signInWithGoogle} />
      ) : (
        <div className='mx-auto h-screen bg-violet-600'>
          <Header auth={auth} />
          <ChatRoom user={user} />
        </div>
      )}
    </>
  );
};

export default App;
