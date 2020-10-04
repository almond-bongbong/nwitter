import React, { useEffect, useRef, useState } from 'react';
import { NWEETS_COLLECTION } from '../constants/firestore';
import firebase from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import Nweet from '../components/Nweet';

function Home({ currentUser }) {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const imageRef = useRef();
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection(NWEETS_COLLECTION)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(data);
      });
  }, []);

  const clearImage = () => {
    imageRef.current.value = null;
    setPreviewImage(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!nweet) return;
    const file = imageRef.current.files[0];
    let fileUrl;

    if (file) {
      const uploadResult = await firebase
        .storage()
        .ref()
        .child(`${currentUser.uid}/${uuidv4()}`)
        .put(file);

      fileUrl = await uploadResult.ref.getDownloadURL();
    }
    await firebase.firestore().collection(NWEETS_COLLECTION).add({
      text: nweet,
      image: fileUrl,
      createdAt: Date.now(),
      createdBy: currentUser.uid,
    });
    setNweet('');
    clearImage();
  };

  const onChange = (e) => {
    setNweet(e.target.value);
  };

  const onChangeImage = (e) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = (finish) => {
        setPreviewImage(finish.currentTarget.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input
          type="file"
          ref={imageRef}
          accept="image/*"
          onChange={onChangeImage}
        />
        {previewImage && (
          <div>
            <img src={previewImage} alt="" style={{ width: 50, height: 50 }} />
            <button type="button" onClick={clearImage}>
              Clear
            </button>
          </div>
        )}
        <input type="submit" value="Nweet" />
      </form>

      <ul>
        {nweets.map((n) => (
          <Nweet
            key={n.id}
            id={n.id}
            text={n.text}
            image={n.image}
            isOwner={currentUser?.uid === n.createdBy}
          />
        ))}
      </ul>
    </div>
  );
}

export default Home;
