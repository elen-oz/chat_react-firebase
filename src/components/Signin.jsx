const Signin = ({ signInWithGoogle }) => {
  return (
    <>
      <h1>Signin:</h1>
      <button
        className='rounded-md bg-blue-600 px-4 py-2 text-white'
        onClick={signInWithGoogle}
      >
        Sig in with Google
      </button>
    </>
  );
};
export default Signin;
