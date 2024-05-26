import { useState, useRef, useEffect } from 'react';

import {
  collection,
  query,
  orderBy,
  limit,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../firebase';

import { FaRegPaperPlane } from 'react-icons/fa6';

import ChatMessage from './ChatMessage';

const ChatRoom = ({ user }) => {
  const userName = user.displayName.split(' ')[0];
  const bottom = useRef();
  const messagesRef = collection(firestore, 'messages');
  const [formValue, setFormValue] = useState('');

  const [messages, loadingMessages, error] = useCollectionData(
    query(messagesRef, orderBy('createdAt'), limit(100)),
  );

  useEffect(() => {
    if (bottom.current) {
      bottom.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue('');
    bottom.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className='mx-auto flex w-full flex-col justify-between px-2 sm:w-[600px]'>
      {loadingMessages && (
        <div className='flex h-full w-full flex-col items-center justify-center text-white'>
          Loading...
        </div>
      )}
      {error && (
        <p className='text-orange flex flex-col items-center justify-center text-orange-400'>
          An error occur!
          {error.code} {error.message}
        </p>
      )}
      {messages && (
        <>
          <div className='h-[550px] rounded-lg  bg-stone-50 px-2 sm:h-[580px]'>
            <div className='h-full overflow-y-scroll py-2'>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} userName={userName} />
              ))}
              <div ref={bottom}></div>
            </div>
          </div>
          <form
            onSubmit={sendMessage}
            className='mx-auto mt-3 flex w-full justify-between gap-x-3'
          >
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder='say something'
              className='w-full rounded-lg border-[1px] border-stone-200 px-2 shadow-lg'
            />

            <button
              type='submit'
              disabled={!formValue}
              className='cursor-pointer whitespace-nowrap rounded-lg bg-green-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-green-800'
            >
              <FaRegPaperPlane />
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default ChatRoom;
