import React, { useEffect, useState } from 'react';
import { NWEETS_COLLECTION } from '../constants/firestore';
import firebase from 'firebase/app';
import Nweet from '../components/Nweet';
import NweetFactory from '../components/NweetFactory';
import { useCurrentUser } from '../contexts/CurrentUserContext';

function Home() {
  const { currentUser } = useCurrentUser();
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection(NWEETS_COLLECTION)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(data);
      });
  }, []);

  return (
    <div className="container">
      <NweetFactory />

      <div style={{ marginTop: 30 }}>
        {nweets.map((n) => (
          <Nweet
            key={n.id}
            id={n.id}
            text={n.text}
            image={n.image}
            isOwner={currentUser?.id === n.createdBy}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
