import Signin from '../components/Signin';

const StartPage = ({ signInWithGoogle }) => {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-stone-50 px-4'>
      <h1 className='mb-6 text-6xl font-bold'>Welcome to Live Chat!</h1>
      <h2 className='mb-4 text-xl'>
        Use your Google account to sign in to the chat room
      </h2>
      <Signin signInWithGoogle={signInWithGoogle} />
    </div>
  );
};
export default StartPage;
