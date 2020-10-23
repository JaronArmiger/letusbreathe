import axios from 'axios';
import { getErrors } from './errors';

export const beginAddPhoto = (photo) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('photo', photo);
      await axios.post('/bucket/post_file', formData, {
      	headers: {
      	  'Content-Type': 'multipart/form-data',
      	}
      });
    } catch (err) {
      err.response && dispatch(getErrors(err.response.data));
    }
  }
};

export const getPhotoKeys = () => {
  return async (dispatch) => {
    try {
      const photoKeys = await axios.get('/bucket/list');
      console.log(photoKeys);
      dispatch(startLoadPhotos(photoKeys.data));
    } catch (err) {
      err.response && dispatch(getErrors(err.response.data));
    }
  }
}

export const startLoadPhotos = (photoKeys) => {
  return async (dispatch) => {
    try {
      console.log('ay')
      //const photos = await axios.get('/bucket/list');
      //console.log(photos);
      //dispatch(loadPhotos(photos));
    } catch (err) {
      err.response && dispatch(getErrors(err.response.data));
    }
  }
};

export const loadPhotos = (photos) => ({
  type: 'LOAD_PHOTOS',
  photos
})