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
