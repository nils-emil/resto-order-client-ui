import React, {Component} from 'react';
import './styles.scss'
import {Container} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ImageAdd from './components/ImageAdd/ImageAdd';
import ItemInfo from './components/ItemInfo/ItemInfo';
import {withRouter} from 'react-router-dom';
import {addMenuItem} from '../../../services/adminService';

class ItemEdit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      item: {
        title: 'Burger',
        category: 'Main course',
        price: 12,
        description: ''
      }
    };
  }

  save() {
    console.table(this.state.item)
    addMenuItem(this.state.item);
    this.props.history.push('/admin/menu-list');
  }

  cancel() {
    this.props.history.push('/admin/menu-list');
  }

  updateField(event) {
    this.setState(state => {
      let item = state.item;
      item[event.id] = event.value;

      return {
        item,
        ...state
      }
    });
  }

  render() {
    return (
      <Container className="container">
        <Grid container spacing={3} className="half-height">
          <Grid item xs={6} className="full-height">
            <ImageAdd/>
          </Grid>
          <Grid item xs={6}>
            <ItemInfo
              item={this.state.item}
              onChange={(event) => this.updateField(event)}
              save={() => this.save()}
              cancel={() => this.cancel()}
            />
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withRouter(ItemEdit);
