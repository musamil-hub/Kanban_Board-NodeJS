import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/postCardAction';
import Lists from './Lists/Lists';
import './MainBody.css';
const MainBody = props => {
  let datas = props.postCardList;
  console.log(datas);
  useEffect(() => {
    props.fetchAllPostCard();
  }, []);

  return (
    <div className='App'>
      <Lists data={datas} />
    </div>
  );
};

const mapStateToProps = state => ({
  postCardList: state.postCard,
});

const mapActionToProps = {
  fetchAllPostCard: actions.fetchAll,
};

export default connect(mapStateToProps, mapActionToProps)(MainBody);
