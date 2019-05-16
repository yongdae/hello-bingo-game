import React, {Component} from 'react';
import {Feed, Segment} from "semantic-ui-react";

class EventConsole extends Component {
  render() {
    return (
        <Segment>
          <Feed events={[
            {
              date: '2019-01-01 00:00:00',
              summary: 'Bingo!! [1, 2, 3, 4, 5]',
            }
          ]} />
        </Segment>
    );
  }
}

export default EventConsole;