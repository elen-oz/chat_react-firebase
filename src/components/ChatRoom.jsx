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
    <div className='mx-auto flex w-[600px] flex-col justify-between'>
      <div className='border-stone-150 max-h-[580px] overflow-scroll rounded-lg border-[1px] p-4'>
        {loadingMessages && (
          <div className='flex flex-col items-center justify-center'>
            Loading...
          </div>
        )}

        {error && (
          <p className='flex flex-col items-center justify-center text-red-500'>
            {error}
          </p>
        )}

        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} userName={userName} />
          ))}
        <div ref={bottom}></div>
      </div>
      <form
        onSubmit={sendMessage}
        className='mx-auto mt-2 flex w-full justify-between gap-x-2'
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
          className='cursor-pointer whitespace-nowrap rounded-lg bg-violet-600 px-4 py-2 text-white shadow-lg hover:bg-violet-800'
        >
          send 🕊️
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
