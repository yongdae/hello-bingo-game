import 'semantic-ui-css/semantic.min.css'

import React from 'react';
import {Segment, Divider, Button, Grid} from 'semantic-ui-react'
import BingoBoard from "./Bingo/BingoBoard/BingoBoard";
import EventConsole from "./EventConsole/EventConsole";
import UserStatus from "./UserStatus/UserStatus";

function App() {
  return (
    <Segment>
      <Segment>
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <UserStatus icon='computer' name='Computer'/>
              <BingoBoard/>
              <EventConsole/>
            </Grid.Column>
            <Grid.Column>
              <UserStatus icon='user' name='player'/>
              <BingoBoard/>
              <EventConsole/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider vertical>VS</Divider>
      </Segment>
      <Button attached='bottom' color='green' size='huge' fluid>Game Start</Button>
    </Segment>
  );
}

export default App;
