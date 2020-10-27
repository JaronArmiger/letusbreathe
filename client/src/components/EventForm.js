import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

const EventForm = ({ errors, dispatch }) => {
  <Form>
    <Form.Group>
      <Form.Label>Title</Form.Label>
      <Form.Control 
        type='text'
        name='title'
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Description</Form.Label>
      <Form.Control 
        as='textarea'
        rows={4}
      />
    </Form.Group>
  </Form>
}

const mapStateToProps = (state) => ({
  errors: state.errors || {}
});

export default connect(mapStateToProps)(EventForm);