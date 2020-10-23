import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { beginAddPhoto } from '../actions/photos';

const UploadForm = ({ errors, dispatch}) => {
  const [photo, setPhoto] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    setErrorMsg(errors);
  }, [errors]);

  useEffect(() => {
    setErrorMsg('');
  }, []);

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    console.log('change');
    setPhoto(file);
  };

  const handleFormSubmit = (e) => {
    console.log('submit');
    e.preventDefault();
    if (photo) {
      setErrorMsg('');
      dispatch(beginAddPhoto(photo));
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
      	  <Form.Control type="file" name="photo" onChange={handleOnChange}/>
      	</Form.Group>
        <Button
          variant="primary"
          type="submit"
          className={`${!photo ? 'disabled submit-btn' : 'submit-btn'}`}
          disabled={photo ? false : true}
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