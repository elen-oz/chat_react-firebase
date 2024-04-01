import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Signin from './components/Signin';
import Signout from './components/Signout';
import ChatRoom from './components/ChatRoom';

const App = () => {
  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
  };

  return (
    <>
      {!user ? (
        <div className='flex h-screen w-screen items-center justify-center'>
          <Signin signInWithGoogle={signInWithGoogle} />
        </div>
      ) : (
        <div className='mx-auto max-h-screen max-w-[850px]'>
          <div className=''>
            <header className='flex justify-between p-2'>
              <h1 className='text-center text-xl font-bold'>Live Chat</h1>
              <Signout auth={auth} />
            </header>
            <section>{user && <ChatRoom user={user} />}</section>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
