import React, { useState } from 'react';
import firebase from 'firebase/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NWEETS_COLLECTION } from '../constants/firestore';

function Nweet({ id, text, image, isOwner }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newText, setNewText] = useState(text || '');

  const onDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this nweet?')) {
      if (image) await firebase.storage().refFromURL(image).delete();
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
    <div className="nweet">
      {isEditMode ? (
        <>
          <form className="container nweetEdit" onSubmit={submitUpdateNweet}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newText}
              required
              autoFocus
              onChange={handleNewText}
              className="formInput"
            />
            <input type="submit" className="formBtn" value="Update Nweet" />
          </form>
          <span onClick={toggleEditMode} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{text}</h4>
          {image && (
            <img src={image} alt="" style={{ width: 50, height: 50 }} />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditMode}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Nweet;
