import React from 'react';
import Fab from '@material-ui/core/Fab';
import './styles.scss'
import {Link} from 'react-router-dom';

const FoodPicker = props => {
  return (
    <span className="food-picker">
      Food picker
      <Link to="/">
        <Fab variant="extended">
          Back
        </Fab>
      </Link>
    </span>);
};

export default FoodPicker;
