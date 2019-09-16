import React from 'react';
import {Link} from 'react-router-dom';
import Image from 'material-ui-image'
import './styles.scss'
import Paper from '@material-ui/core/Paper';

function Card(props) {
  return (
    <Paper className="card">
      <Link to={props.linkTo}>
        {props.imageUrl && <Image src={props.imageUrl}/>}
      </Link>
      <span className="title">{props.text}</span>
    </Paper>
  );
}

export default Card;
