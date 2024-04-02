import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { getFormattedTime } from '../utils';

const ChatMessage = ({ message, userName }) => {
  const { text, uid, photoURL, createdAt } = message;
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    if (createdAt) {
      setFormattedTime(getFormattedTime(createdAt));
    }
  }, [createdAt]);

  const messageClass =
    uid === auth.currentUser.uid
      ? 'bg-green-200'
      : 'bg-violet-200 justify-self-end';

  return (
    <div className='mb-2 flex items-center justify-start gap-x-2 px-2'>
      <div className='flex w-[40px] flex-col items-center justify-center'>
        <img src={photoURL || '/user.webp'} className='w-full rounded-full' />
        {/* <p>{userName}</p> */}
      </div>

      <div className='flex w-full flex-row items-center justify-between'>
        <div
          className={`${messageClass} w-fit rounded-3xl px-4 py-2 shadow-lg`}
        >
          {text}
        </div>
        <div className='italic text-stone-400'>{formattedTime}</div>
      </div>
    </div>
  );
};
export default ChatMessage;
