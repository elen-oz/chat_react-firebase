const Signin = ({ signInWithGoogle }) => {
  return (
    <button
      className='rounded-md bg-violet-600 px-4 py-2 text-white shadow-lg hover:bg-violet-800'
      onClick={signInWithGoogle}
    >
      Sig in with Google
    </button>
  );
};
export default Signin;
