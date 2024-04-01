const SignOut = ({ auth }) => {
  const user = auth?.currentUser;

  const handleButtonClick = () => {
    auth.signOut();
  };

  return (
    <>
      {user && (
        <button
          className='rounded-md border-2 border-violet-600 px-4 py-2 text-violet-600 shadow-lg hover:bg-violet-600 hover:text-white'
          onClick={handleButtonClick}
        >
          Sign out
        </button>
      )}
    </>
  );
};
export default SignOut;
