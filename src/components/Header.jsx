import Signout from './Signout';

import { BsWechat } from 'react-icons/bs';

const Header = ({ auth }) => {
  return (
    <header className='mx-auto flex max-w-[43rem] items-center justify-between p-2 px-5 text-stone-50'>
      <BsWechat size={30} />
      <h1 className='text-center text-xl font-bold '>Live Chat</h1>
      <Signout auth={auth} />
    </header>
  );
};
export default Header;
