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

  console.log('auth.currentUser', auth.currentUser);

  const [messages, loadingMessages, error] = useCollectionData(
    query(messagesRef, orderBy('createdAt'), limit(25)),
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
    <>
      <div className='mx-auto h-[400px] w-[600px] overflow-scroll bg-yellow-100'>
        <h1 className='text-center text-xl'>Chat Room</h1>
        <div>
          {loadingMessages && <p>Loading...</p>}
          {messages &&
            messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} userName={userName} />
            ))}
          {error && <p className='text-red-500'>{error}</p>}
        </div>
        <div ref={bottom}></div>
      </div>
      <form
        onSubmit={sendMessage}
        className='mx-auto flex w-[600px] justify-between gap-x-2'
      >
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder='say something'
          className='w-full px-2'
        />

        <button
          type='submit'
          disabled={!formValue}
          className='rounded-md bg-blue-600 px-4 py-2 text-white'
        >
          send
        </button>
      </form>
    </>
  );
};
export default ChatRoom;
