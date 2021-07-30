import React, { useState, useEffect } from 'react';
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import * as actions from '../../actions/postCardAction';
const EditForm = props => {
  const values = props.data;
  const [title, setTitle] = useState(values.title);
  const [description, setDescription] = useState(values.description);
  const [color, setColor] = useState(values.color);
  const [assign_to, setAssign_to] = useState(values.assign_to);
  const [id, setId] = useState(values._id);

  const onSubmit = event => {
    event.preventDefault();
    console.log('Card Edit Successfully');
    // date
    let today = new Date();
    let time = today.toLocaleString([], { hour12: true });

    let newData = {
      _id: id,
      title: title,
      description: description,
      assign_to: assign_to,
      color: color,
      date: time,
    };
    const onSuccess = () => {
      toast.warn('Card Edited Successfully', {
        position: toast.POSITION.TOP_RIGHT,
      });
      props.handleClose();
      props.setaction();
    };
    props.updatePostCard(id, newData, onSuccess);
    console.log(newData);
  };
  useEffect(() => {
    props.updatePostCard(id);
  }, []);
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit Card</Modal.Title>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              className='form-control'
              id='title'
              placeholder='Enter Title'
              value={title}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <textarea
              className='form-control'
              id='description'
              rows='3'
              placeholder='Enter Description'
              value={description}
              onChange={e => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div style={{ display: 'flex' }}>
            <div>
              <label htmlFor='exampleColorInput' className='form-label'>
                Color picker
              </label>
              <input
                type='color'
                className='form-control form-control-color'
                id='exampleColorInput'
                title='Choose your color'
                value={color}
                onChange={e => {
                  setColor(e.target.value);
                }}
              ></input>
            </div>
            <div style={{ marginLeft: '25px' }}>
              <label htmlFor='assign_to' className='form-label'>
                Assign To
              </label>
              <select
                style={{ width: '384%' }}
                className='form-select'
                aria-label='Default select example'
                value={assign_to}
                onChange={e => {
                  setAssign_to(e.target.value);
                }}
              >
                <option value='todo'>Todo</option>
                <option value='doing'>Doing</option>
                <option value='done'>Done</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-danger' onClick={props.handleClose}>
            Close
          </Button>
          <Button type='submit' variant='outline-success' value='submit'>
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </>
  );
};

const mapStateToProps = state => ({
  postCardList: state.postCard,
});

const mapActionToProps = {
  updatePostCard: actions.update,
};
export default connect(mapStateToProps, mapActionToProps)(EditForm);
