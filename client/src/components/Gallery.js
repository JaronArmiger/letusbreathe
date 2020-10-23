import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { startLoadPhotos, getPhotoKeys } from '../actions/photos';
import Photo from './Photo';

const Gallery = ({ errors, photos, dispatch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [photoKeys, setPhotoKeys] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getPhotoKeys());
  }, []);

  useEffect(() => {
    if (photos.length > 0) {
      setIsLoading(false);
    }
  }, [photos]);

  return (
    <div className='photos-list'>
      {errors && errors.get_error && (
        <p className='errorMsg centered-message'>{errors.get_error}</p>
      )}
      { isLoading ? (
        <div className='loading-msg centered-message'>Loading...</div>
      ) : (
        photos.map((photo) => <Photo key={photo._id} id={photo._id}/>)
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  photos: state.photos || [],
  errors: state.errors || {},
});

export default connect(mapStateToProps)(Gallery);