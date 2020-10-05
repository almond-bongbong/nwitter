import React, { useRef, useState } from 'react';
import firebase from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NWEETS_COLLECTION } from '../constants/firestore';
import { useCurrentUser } from '../contexts/CurrentUserContext';

function NweetFactory() {
  const { currentUser } = useCurrentUser();
  const [nweet, setNweet] = useState('');
  const imageRef = useRef();
  const [previewImage, setPreviewImage] = useState(null);

  const clearImage = () => {
    imageRef.current.value = null;
    setPreviewImage(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!nweet) return;
    const file = imageRef.current.files[0];
    const data = {
      text: nweet,
      createdAt: Date.now(),
      createdBy: currentUser.id,
    };

    if (file) {
      const uploadResult = await firebase
        .storage()
        .ref()
        .child(`${currentUser.uid}/${uuidv4()}`)
        .put(file);
      data.image = await uploadResult.ref.getDownloadURL();
    }

    await firebase.firestore().collection(NWEETS_COLLECTION).add(data);
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
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        ref={imageRef}
        onChange={onChangeImage}
        style={{ opacity: 0 }}
      />
      {previewImage && (
        <div className="factoryForm__attachment">
          <img
            src={previewImage}
            style={{ backgroundImage: previewImage }}
            alt=""
          />
          <div className="factoryForm__clear" onClick={clearImage}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
      <input type="submit" value="Nweet" />
    </form>
  );
}

export default NweetFactory;
