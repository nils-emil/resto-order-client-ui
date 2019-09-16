import React from 'react';
import './styles.scss'
import BottomActions from '../../../components/BottomActions/BottomActions';

function FoodPicker() {
  
  return (
    <span className="food-picker">
      <h4>Welcome to vapiano</h4>
      <p>Your waitress today: Annika Kaari</p>
      <br/>
      <p>Total: 43.50€</p>
      <BottomActions tableCode='223AFV'/>
    </span>);
}

export default FoodPicker;
