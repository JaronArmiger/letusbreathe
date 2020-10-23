import axios from 'axios';
import { getErrors } from './errors';

export const beginAddPhoto = (photo) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('photo', photo);
      await axios.post('/photos', formData, {
      	headers: {
      	  'Content-Type': 'multipart/form-data',
      	}
      });
    } catch (err) {
      err.response && dispatch(getErrors(err.response.data));
    }
  }
};

export const startLoadPhotos = () => {
  return async (dispatch) => {
    try {
      const photos = await axios.get('/photos');
      dispatch(loadPhotos(photos.data));
    } catch (err) {
      err.response && dispatch(getErrors(err.response.data));
    }
  }
};

export const loadPhotos = (photos) => ({
  type: 'LOAD_PHOTOS',
  photos
})