import React from 'react';
import { Grid } from "semantic-ui-react";
import BingoCell from "../BingoCell/BingoCell";

const BingoBoard = ({bingoBoard, onCellClick}) => {

  if (!bingoBoard)
    return null;

  return (
      <Grid textAlign='center' columns='equal'>
        {
          bingoBoard.map((row, rowNum) => {
            return <Grid.Row key={'row-' + rowNum}>{row.map((column, columnNum) => (
                <BingoCell key={'col-' + columnNum} checked={column.checked} text={column.val} onCellClick={(e) => {onCellClick(e, {rowNum: rowNum, columnNum: columnNum, data: column})}}/>
              ))}</Grid.Row>;
            }
          )
        }
      </Grid>
  )
};

export default BingoBoard;