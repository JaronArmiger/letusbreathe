import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { beginAddPhotos } from '../actions/photos';

const UploadForm = ({ errors, dispatch}) => {
  const [photos, setPhotos] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    setErrorMsg(errors);
  }, [errors]);

  useEffect(() => {
    setErrorMsg('');
  }, []);

  const handleOnChange = (e) => {
    const files = e.target.files;
    setPhotos(files);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (photos.length > 0) {
      setErrorMsg('');
      dispatch(beginAddPhotos(photos));
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