import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card } from 'react-bootstrap';
import './Cards.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions/postCardAction';
import Modals from '../../Modal/Modals';
import EditCard from '../../Form/EditCard';
import { toast } from 'react-toastify';

const Cards = props => {
  const card = props.card;
  const index = props.index;
  //   console.log(card);

  const [modalShow, setModalShow] = useState(false);
  const [actionbtn, setActionbtn] = useState(false);

  const onSuccess = () => {
    toast.error('Card Deleted...', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handlerDelete = card => {
    if (window.confirm('Are you sure to delete this record?')) {
      props.deletePostCard(card._id, onSuccess);
    }
    console.log('Delete', card._id);
  };

  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            key={card._id}
            className='task__item'
            // className={`item ${snapshot.isDragging && 'dragging'}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Card
              style={{ borderLeft: `2px solid ${card.color}` }}
              onMouseLeave={() => {
                setActionbtn(false);
              }}
              onMouseEnter={() => {
                setActionbtn(true);
              }}
            >
              <Card.Body
                style={{
                  padding: '5px',
                  textOverflow: 'ellipsis',
                }}
              >
                <Card.Title style={{ textTransform: 'capitalize' }}>
                  {card.title}
                </Card.Title>
                <Card.Text style={{ color: 'grey' }}>
                  {card.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer style={{ padding: '5px' }}>
                <small className='text-muted' style={{ display: 'flex' }}>
                  {card.date}
                  {actionbtn && (
                    <div
                      style={{
                        display: 'flex',
                        marginLeft: 'auto',
                      }}
                    >
                      <i
                        onClick={() => setModalShow(true)}
                        className='bi bi-pencil-square'
                        style={{
                          color: 'grey',
                          cursor: 'pointer',
                          marginRight: '20px',
                        }}
                      ></i>
                      <i
                        onClick={() => handlerDelete(card)}
                        className='bi bi-archive-fill'
                        style={{ color: 'grey', cursor: 'pointer' }}
                      ></i>
                    </div>
                  )}
                  <Modals
                    components={
                      <EditCard
                        handleClose={() => setModalShow(false)}
                        setaction={() => setActionbtn(false)}
                        data={card}
                      />
                    }
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </small>
              </Card.Footer>
            </Card>
          </div>
        );
      }}
    </Draggable>
  );
};
const mapStateToProps = state => ({
  postCardList: state.postCard,
});

const mapActionToProps = {
  deletePostCard: actions.Delete,
};
export default connect(mapStateToProps, mapActionToProps)(Cards);
