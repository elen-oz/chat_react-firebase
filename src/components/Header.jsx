import Signout from './Signout';

const Header = ({ auth }) => {
  return (
    <header className='flex justify-between p-2'>
      <h1 className='text-center text-xl font-bold text-stone-50'>Live Chat</h1>
      <Signout auth={auth} />
    </header>
  );
};
export default Header;
