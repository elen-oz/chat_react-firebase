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

  const messageColorClass =
    uid === auth.currentUser.uid
      ? 'bg-green-200'
      : 'bg-violet-200';
  const messagePlaceClass =
  uid === auth.currentUser.uid
    ? 'flex-row-reverse'
    : 'flex-row';
  const messageNamePlaceClass =
  uid === auth.currentUser.uid
    ? 'text-end'
    : 'text-start';

  return (
    <div className={`mb-2 flex ${messagePlaceClass} items-end justify-start gap-x-2 px-2`}>
      <div className='flex w-[60px] flex-col items-center justify-center'>
        <img src={photoURL || '/user.webp'} className='w-full rounded-full' />
      </div>

      <div className='w-full'>
      <p className={`text-sm text-stone-500 ${messageNamePlaceClass}`}>{userName}</p>
        <div className={`flex ${messagePlaceClass} items-end justify-between gap-x-4`}>
          <div
            className={`${messageColorClass} w-fit rounded-3xl px-4 py-2 shadow-lg`}
          >
            {text}
          </div>
          <div className='whitespace-nowrap py-2 text-sm italic text-stone-400'>
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatMessage;
