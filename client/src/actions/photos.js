import axios from 'axios';
import { getErrors } from './errors';

export const beginAddPhotos = (photos, albumId) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      for (const key of Object.keys(photos)) {
        formData.append('photos', photos[key]);
      }
      formData.append('album', albumId);
      await axios.post('/bucket/upload_mult', formData, {
      	headers: {
      	  'Content-Type': 'multipart/form-data',
      	}
      });
    } catch (err) {
      err.response && dispatch(getErrors(err.response.data));
    }
  }
};

/*
export const addEventPhoto = (photo) => {
  return async (dispatch) => {
    try {
      
    } catch (err) {
      err.response && dispatch(getErrors(err.response.data));
    }
  }
}
*/

export const getPhotoKeys = () => {
  return async (dispatch) => {
    try {
      const photoKeys = await axios.get('/bucket/list');
      //console.log(photoKeys);
      dispatch(loadPhotos(photoKeys.data));
    } catch (err) {
      err.response && dispatch(getErrors(err.response.data));
    }
  }
}

export const startLoadPhotos = (photoKeys) => {
  return async (dispatch) => {
      const getPhotoPromises = [];
      photoKeys.forEach((key) => {
        //console.log(key);
        getPhotoPromises
          .push(axios.get(`/bucket/get_file/${key}`));
      });
      Promise.all(getPhotoPromises)
        .then((photos) => {
          console.log(photos);
          dispatch(loadPhotos(photos))
        })
        .catch((err) => {
          dispatch(getErrors(err.response.data));
        })
      //const photos = await axios.get('/bucket/list');
      //console.log(photos);
      //dispatch(loadPhotos(photos));
      //err.response && dispatch(getErrors(err.response.data));
  }
};

export const loadPhotos = (photos) => ({
  type: 'LOAD_PHOTOS',
  photos
});