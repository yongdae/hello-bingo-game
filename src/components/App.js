import 'semantic-ui-css/semantic.min.css'

import React from 'react';
import {Segment, Divider, Button, Grid, Dimmer} from 'semantic-ui-react'
import BingoBoard from "./Bingo/BingoBoard/BingoBoard";
import EventConsole from "./EventConsole/EventConsole";
import UserStatus from "./UserStatus/UserStatus";

function App() {
  return (
    <Segment>
      <Dimmer.Dimmable as={Segment} dimmed={true} blurring>
        <Dimmer simple />
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
      </Dimmer.Dimmable>
      <Button attached='bottom' color='twitter' size='huge' fluid>Game Start</Button>
    </Segment>
  );
}

export default App;
