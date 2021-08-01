import React, { useState, useEffect } from 'react';
import Cards from '../Cards/Cards';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import * as actions from '../../../actions/postCardAction';
import './Lists.css';

const Lists = props => {
  let data = props.data;
  const [columns, setColumns] = useState(data);

  useEffect(() => {
    setColumns(data);
  }, [data]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      let dndData = {
        _id: removed._id,
        title: removed.title,
        description: removed.description,
        assign_to: destination.droppableId,
        color: removed.color,
        date: removed.date,
      };
      const onSuccess = () => {
        console.log('dnd saved');
      };
      props.dndPostCard(removed._id, dndData, onSuccess);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <div className='tasks'>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className='tasks__column' key={`${columnId}${column.title}`}>
              <div className='onetitle'>
                <h1 className='h1title'>{column.title}</h1>
              </div>
              <Droppable droppableId={columnId}>
                {provider => {
                  return (
                    <div
                      className='tasks__list'
                      {...provider.droppableProps}
                      ref={provider.innerRef}
                    >
                      {column.items.map((item, index) => {
                        return (
                          <Cards key={item._id} card={item} index={index} />
                        );
                      })}
                      {provider.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

const mapStateToProps = state => ({
  postCardList: state.postCard,
});

const mapActionToProps = {
  dndPostCard: actions.dnd,
};
export default connect(mapStateToProps, mapActionToProps)(Lists);
