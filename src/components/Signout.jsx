const SignOut = ({ auth }) => {
  const user = auth?.currentUser;

  const handleButtonClick = () => {
    auth.signOut();
  };

  return (
    <>
      {user && (
        <button
          className='rounded-md bg-white px-4 py-2 text-violet-600 shadow-lg hover:bg-violet-800 hover:text-white'
          onClick={handleButtonClick}
        >
          Sign out
        </button>
      )}
    </>
  );
};
export default SignOut;
