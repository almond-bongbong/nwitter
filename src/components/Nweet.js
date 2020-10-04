import React, { useState } from 'react';
import firebase from 'firebase/app';
import { NWEETS_COLLECTION } from '../constants/firestore';

function Nweet({ id, text, image, isOwner }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newText, setNewText] = useState(text || '');

  const onDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this nweet?')) {
      await firebase.firestore().doc(`${NWEETS_COLLECTION}/${id}`).delete();
    }
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleNewText = (e) => {
    setNewText(e.target.value);
  };

  const submitUpdateNweet = async (e) => {
    e.preventDefault();

    await firebase.firestore().doc(`${NWEETS_COLLECTION}/${id}`).update({
      text: newText,
    });
    setIsEditMode(false);
  };

  return (
    <div>
      <h4>
        {isEditMode ? (
          <form onSubmit={submitUpdateNweet}>
            <input
              type="text"
              value={newText}
              placeholder="Edit your nweet"
              onChange={handleNewText}
            />
            <button>Update Nweet</button>
          </form>
        ) : (
          text
        )}
      </h4>
      {image && <img src={image} alt="" style={{ width: 50, height: 50 }} />}
      {isOwner && (
        <>
          <button type="button" onClick={onDeleteClick}>
            Delete Nweet
          </button>
          <button type="button" onClick={toggleEditMode}>
            {isEditMode ? 'Cancel' : 'Edit Nweet'}
          </button>
        </>
      )}
    </div>
  );
}

export default Nweet;
