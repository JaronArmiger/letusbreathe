import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Photo from './Photo';
import uniqid from 'uniqid';
import { getPhotoKeys } from '../../actions/photos';

const Gallery = ({ errors, photos, dispatch }) => {
  const [isLoading, setIsLoading] = useState(false);

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
        photos.map((photo) => {
          return <Photo key={uniqid()} url={photo}/>
        })
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  photos: state.photos || [],
  errors: state.errors || {},
});

export default connect(mapStateToProps)(Gallery);