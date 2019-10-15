import React, { createContext } from 'react';

const ShoppingCartContext = createContext({
  totalSum: 0,
  items: {},
  addItem: () => {
  },
  removeItem: () => {
  }
});

export class ShoppingCartProvider extends React.Component {

  addItem = item => {
    console.log(this.state.items)
    let itemsCopy = { ...this.state.items };
    if (itemsCopy[item._id]) {
      itemsCopy[item._id].amount += 1;
    } else {
      itemsCopy[item._id] = { item: item, amount: 1 };
    }
    let sum = this.state.totalSum;
    sum += item.price;
    this.setState({
      ...this.state, items: itemsCopy, totalSum: sum
    });
    console.log(this.state)
  };

  removeItem = item => {
    let itemsCopy = { ...this.state.items };
    let itemsCopyElement = itemsCopy[item._id];
    let sum = this.state.totalSum;
    if (itemsCopyElement) {
      sum -= itemsCopyElement.item.price;
      if (itemsCopyElement.amount > 1) {
        itemsCopyElement.amount -= 1;
      } else {
        delete itemsCopy[item._id]
      }
    }
    this.setState({
      ...this.state, items: itemsCopy, totalSum: sum
    });
  };

  state = {
    totalSum: 0,
    items:  {},
    addItem: this.addItem,
    removeItem: this.removeItem
  };

  render() {
    return (
      <ShoppingCartContext.Provider value={this.state}>
        {this.props.children}
      </ShoppingCartContext.Provider>
    );
  }
}

export const ShoppingCartConsumer = ShoppingCartContext.Consumer;
