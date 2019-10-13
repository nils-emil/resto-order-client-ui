import React, { createContext } from 'react';

const PopupContext = createContext({
  messages: [],
  addMessage: () => {},
  removeMessage: () => {}
});

export class PopupProvider extends React.Component {

  addMessage = message  => {
    let array = [...this.state.messages, message];
    this.setState({
      ...this.state, messages: array
    });
    let messageId = message.id;
    setTimeout(() => {this.removeMessage(messageId)}, message.timeout ? message.timeout : 5000)
  };

  removeMessage = messageId  => {
    let arr = this.state.messages.filter(function( obj ) {
      return obj.id !== messageId;
    });
    this.setState({
      ...this.state, messages: arr
    });
  };

  state = {
    messages: [],
    addMessage: this.addMessage,
    removeMessage: this.removeMessage
  };

  render() {
    return (
      <PopupContext.Provider value={this.state}>
        {this.props.children}
      </PopupContext.Provider>
    );
  }
}

export const PopupConsumer = PopupContext.Consumer;
