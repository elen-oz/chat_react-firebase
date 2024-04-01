import { auth } from '../firebase';

const ChatMessage = ({ message, userName }) => {
  const { text, uid, photoURL } = message;

  console.log('photoURL', photoURL);

  const messageClass =
    uid === auth.currentUser.uid
      ? 'bg-green-200'
      : 'bg-violet-200 justify-self-end';

  return (
    <div className='mb-2 flex items-center justify-start gap-x-2'>
      <div className='flex w-[40px] flex-col items-center justify-center'>
        <img src={photoURL || '/user.webp'} className='w-full rounded-full' />
        {/* <p>{userName}</p> */}
      </div>

      <p className={`${messageClass} w-fit rounded-3xl px-4 py-2`}>{text}</p>
    </div>
  );
};
export default ChatMessage;
