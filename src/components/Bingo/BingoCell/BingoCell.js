import React from 'react';
import { Grid, Segment } from "semantic-ui-react";

const BingoCell = ({checked, text, onCellClick}) => {
  return (
      <Grid.Column>
        <Segment style={{cursor: 'pointer'}} inverted={checked} onClick={onCellClick}>{text}</Segment>
      </Grid.Column>
  )
};

export default BingoCell;