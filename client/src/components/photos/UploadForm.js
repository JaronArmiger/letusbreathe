import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { beginAddPhotos } from '../../actions/photos';
import axios from 'axios';

const UploadForm = ({ errors, dispatch}) => {
  const [photos, setPhotos] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    setErrorMsg(errors);
  }, [errors]);

  useEffect(() => {
    setErrorMsg('');
    axios.get('/albums/names')
      .then((albums) => {
        setAlbums(albums.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const handleOnChange = (e) => {
    const files = e.target.files;
    setPhotos(files);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (photos.length > 0) {
      setErrorMsg('');
      dispatch(beginAddPhotos(photos, e.target.album.value));
      setIsSubmitted(true);
    }
  };

  return (
    <React.Fragment>
      {errorMsg && errorMsg.upload_error ? (
      	<p>{errorMsg.upload_error}</p>
      ) : (
      isSubmitted && (
        <p>
          Photo uploaded successfully.
        </p>
      )
      )}
      <Form
        onSubmit={handleFormSubmit}
        method="post"
        encType="multipart/form-data">
      	<Form.Group>
      	  <Form.Label>Choose photo</Form.Label>
      	  <Form.Control 
            type="file" 
            name="photos"
            accept="image/jpeg image/jpg"
            multiple
            onChange={handleOnChange}/>
      	</Form.Group>
        <Form.Group>
          <Form.Label>Choose Album (optional)</Form.Label>
          <Form.Control as='select' name='album'>
            {albums.map((album) => {
              return <option key={album._id} value={album._id}>{album.name}</option>
            })}
          </Form.Control>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className={`${photos.length === 0 ? 'disabled submit-btn' : 'submit-btn'}`}
          disabled={photos.length === 0 ? true : false}
        >
        Upload
      </Button>
      </Form>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  photos: state.photos || [],
  errors: state.errors || {}
});

export default connect(mapStateToProps)(UploadForm);