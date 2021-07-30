import React from 'react';
import { v4 } from 'uuid';
import useInput from './use-input';
import { connect } from 'react-redux';
import * as actions from '../../actions/postCardAction';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
const isNotEmpty = value => value.trim() !== '';

const AddCard = props => {
  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty);
  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isNotEmpty);
  const {
    value: typeValue,
    isValid: typeIsValid,
    hasError: typeHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resettype,
  } = useInput(isNotEmpty);
  const {
    value: colorValue,
    isValid: colorIsValid,
    hasError: colorHasError,
    valueChangeHandler: colorChangeHandler,
    inputBlurHandler: colorBlurHandler,
    reset: resetcolor,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (titleIsValid && typeIsValid && descriptionIsValid && colorIsValid) {
    formIsValid = true;
  }

  const submitHandler = event => {
    event.preventDefault();
    // date
    let today = new Date();
    let time = today.toLocaleString([], { hour12: true });

    if (!formIsValid) {
      return;
    }

    let itemsfetch = {
      _id: v4(),
      title: titleValue,
      description: descriptionValue,
      assign_to: typeValue,
      color: colorValue,
      date: time,
    };

    const onSuccess = () => {
      toast.success('Card Create Successfully', {
        position: toast.POSITION.TOP_CENTER,
      });
      props.handleClose();
    };
    props.createPostCard(itemsfetch, onSuccess);
    resetTitle();
    resettype();
    resetDescription();
    resetcolor();
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Card</Modal.Title>
      </Modal.Header>
      <form onSubmit={submitHandler}>
        <Modal.Body>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              value={titleValue}
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
              type='text'
              className='form-control'
              id='title'
              placeholder='Enter Title'
            />
            {titleHasError && (
              <p style={{ color: 'red' }}>Please enter a Title.</p>
            )}
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
              value={descriptionValue}
              onChange={descriptionChangeHandler}
              onBlur={descriptionBlurHandler}
            ></textarea>
            {descriptionHasError && (
              <p style={{ color: 'red' }}>Please enter a description.</p>
            )}
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
                value={colorValue}
                onChange={colorChangeHandler}
                onBlur={colorBlurHandler}
              ></input>
              {colorHasError && (
                <p style={{ color: 'red' }}>Please enter a Color.</p>
              )}
            </div>
            <div style={{ marginLeft: '25px' }}>
              <label htmlFor='assign_to' className='form-label'>
                Assign To
              </label>
              <select
                style={{ width: '200px' }}
                className='form-select'
                aria-label='Default select example'
                defaultValue={typeValue}
                onChange={typeChangeHandler}
                onBlur={typeBlurHandler}
              >
                <option value='todo'>Todo</option>
                <option value='doing'>Doing</option>
                <option value='done'>Done</option>
              </select>
              {typeHasError && (
                <p style={{ color: 'red' }}>Please enter a Type.</p>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-danger' onClick={props.handleClose}>
            Close
          </Button>
          <Button
            type='submit'
            variant='outline-success'
            value='submit'
            disabled={!formIsValid}
          >
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
  createPostCard: actions.create,
};
export default connect(mapStateToProps, mapActionToProps)(AddCard);
