const SignOut = ({ auth }) => {
  const user = auth?.currentUser;

  const handleButtonClick = () => {
    auth.signOut();
  };

  return (
    <>
      {user && (
        <button
          className='rounded-md border-2 border-blue-600 px-4 py-2 text-blue-600'
          onClick={handleButtonClick}
        >
          Sign out
        </button>
      )}
    </>
  );
};
export default SignOut;
