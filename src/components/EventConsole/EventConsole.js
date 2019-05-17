import React, {Component} from 'react';
import {Feed, Segment} from "semantic-ui-react";
import moment from 'moment';

class EventConsole extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      history: []
    }
  };

  clear = () => {
    this.setState({
      history: []
    })
  };

  onNotify = (notify) => {

    if (0 === notify.bingoCount)
      return;

    const insert = (arr, index, newItem) => [
      ...arr.slice(0, index),
      newItem,
      ...arr.slice(index)
    ];

    let data = [];
    notify.bingoNumbers.forEach(e => {
      data.push(e.join(', '));
    });

    let history = insert(
        this.state.history,
        0,
        {
          date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          summary: data.join(' / ')
        }
    );

    this.setState({
      history: history
    })
  };

  render() {
    return (
        <Segment>
          <Feed events={this.state.history} />
        </Segment>
    );
  }
}

export default EventConsole;