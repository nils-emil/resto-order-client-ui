import React from 'react';
import './styles.scss'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

function ItemInfo(props) {
  return (
    <div className="item-info">
      <InputLabel htmlFor="title">Name</InputLabel>
      <Input
        id="title"
        value={props.item.title}
        onChange={e => props.onChange(e)}
      />
      <div className="flex space-between">
        <div>
          <InputLabel >Category</InputLabel>
                <Select value={props.item.category}
                    onChange={e => props.onMultiSelectChange('category', e.target.value)}>
                    {props.categories.map(category => {
                        return <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                    })}
                </Select>
        </div>
        <div>
          <InputLabel htmlFor="price">Price</InputLabel>
          <Input
            id="price"
            value={props.item.price}
            onChange={e => props.onChange(e)}
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
          />
        </div>
      </div>

      <InputLabel htmlFor="description">Description</InputLabel>
      <Input
        id="description"
        value={props.item.description}
        onChange={e => props.onChange(e)}
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

export default ItemInfo;
