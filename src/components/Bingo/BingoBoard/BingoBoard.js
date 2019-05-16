import React, {Component} from 'react';
import {Grid, Segment, Container} from "semantic-ui-react";
import BingoCell from "../BingoCell/BingoCell";

class BingoBoard extends Component {
  render() {
    return (
      <Grid textAlign='center' columns='equal'>
        <Grid.Row>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
        </Grid.Row>
        <Grid.Row>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
        </Grid.Row>
        <Grid.Row>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
        </Grid.Row>
        <Grid.Row>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
        </Grid.Row>
        <Grid.Row>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
          <BingoCell/>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BingoBoard;