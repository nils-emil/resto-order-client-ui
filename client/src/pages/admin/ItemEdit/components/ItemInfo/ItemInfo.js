import React from 'react';
import './styles.scss'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function ItemInfo(props) {

  const onHandleChange = (event) => {
    props.onChange(event.target);
  };

  return (
    <div className="item-info">
      <InputLabel htmlFor="title">Name</InputLabel>
      <Input
        id="title"
        value={props.item.title}
        onChange={(event) => {
          onHandleChange(event)
        }}
      />

      <InputLabel htmlFor="category">Category</InputLabel>
      <Input
        id="category"
        value={props.item.category}
        onChange={(event) => {
          onHandleChange(event)
        }}
      />

      <InputLabel htmlFor="price">Price</InputLabel>
      <Input
        id="price"
        value={props.item.price}
        onChange={(event) => {
          onHandleChange(event)
        }}
        endAdornment={<InputAdornment position="end">€</InputAdornment>}
      />

      <InputLabel htmlFor="description">Description</InputLabel>
      <Input
        id="description"
        value={props.item.description}
        onChange={(event) => {
          onHandleChange(event)
        }}
        multiline variant="outlined"
      />

      <div className="buttons">
        <Button onClick={props.cancel} size={'large'}>
          Cancel
        </Button>

        <Button onClick={props.save} variant="contained" color="primary" size={'large'}>
          Save
        </Button>
      </div>
    </div>
  );
}
