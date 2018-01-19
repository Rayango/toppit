import React from'react';
import { Button, Comment, Form, Card, Header } from 'semantic-ui-react';
import moment from 'moment';
import defaultPhoto from '../images/defaultPhoto.jpg';
import store from '../js/store.js';

const MyComment = (props) => {

  let name = (props.comment.authorId && (props.comment.authorId.fullName || props.comment.authorId.username) || '');
  let photoUrl = (props.comment.authorId && props.comment.authorId.photo) || defaultPhoto;

  console.log(props.comment);
  return (
    <Comment>
      <Comment.Avatar className='commentuser' src={photoUrl} />
      <Comment.Content>
        <Comment.Author as='a'>{props.comment.username}</Comment.Author>
        <Comment.Metadata>
          <div>{moment(props.comment.timeStamp).fromNow()}</div>
        </Comment.Metadata>
        <Comment.Text>{props.comment.text}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default MyComment;

/*   <Comment>
    <Comment.Avatar src={defaultPhoto} />
    <Comment.Content>
      <Comment.Author as='a'>Matt</Comment.Author>
      <Comment.Metadata>
        <div>Today at 5:42PM</div>
      </Comment.Metadata>
      <Comment.Text>How artistic!</Comment.Text>
      <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
  */