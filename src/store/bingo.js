import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';

// action types
const INITIALIZE = 'base/INITIALIZE';
const START_GAME = 'base/START_GAME';
const SELECT_CELL = 'base/SELECT_CELL';

// action creators
export const initialize = createAction(INITIALIZE);
export const startGame = createAction(START_GAME);
export const selectCell = createAction(SELECT_CELL);

// utils
const shuffleRandom = (array) => {
  let result = array.slice(0);
  for(let i = 0; i < result.length ; i++) {
    let temp = result[i];
    let randomIndex = Math.floor(Math.random() * result.length);

    result[i] = result[randomIndex];
    result[randomIndex] = temp;
  }
  return result;
};

const createBingoBoard = (size = 5) => {
  let numbers = shuffleRandom([...Array((size * size) + 1).keys()].slice(1, (size * size) + 1));

  let array = [];
  for (let count = 0; count < size ; count++) { array.push([]); }

  for (let row = 0; row < size ; row++) {
    for (let column = 0; column < size ; column++) {
      array[row][column] = {checked: false, val: numbers.pop()};
    }
  }

  return array;
};

const createEmptyBingoBoard = (size = 5) => {
  let array = [];
  for (let count = 0; count < size ; count++) { array.push([]); }

  for (let row = 0; row < size ; row++) {
    for (let column = 0; column < size ; column++) {
      array[row][column] = {checked: false, val: ''};
    }
  }

  return array;
};

// initial state
const initialState = Map({
  playing: false,
  player: 0,

  user1: Map({
    number: 1,
    bingoBoard: createEmptyBingoBoard()
  }),

  user2: Map({
    number: 2,
    bingoBoard: createEmptyBingoBoard()
  })
});


// reducer
export default handleActions({
  [INITIALIZE]: (state, action) => initialState,
  [START_GAME]: (state, action) => {
    return state.setIn(['playing'], true)
                .setIn(['player'], 1)
                .setIn(['user1', 'bingoBoard'], createBingoBoard())
                .setIn(['user2', 'bingoBoard'], createBingoBoard());
  },
  [SELECT_CELL]: (state, action) => {
    const { payload } = action;
    const key = 'user' + payload.user.number;
    const anotherKey = 'user' + (payload.user.number === 1 ? 2 : 1);
    let bingoBoard = state.getIn([key, 'bingoBoard']);
    let anotherBingoBoard = state.getIn([anotherKey, 'bingoBoard']);
    let _rowNum, _columnNum;

    anotherBingoBoard.forEach((row, rowNum) => {
      anotherBingoBoard[rowNum].forEach((col, columnNum) => {
        if (anotherBingoBoard[rowNum][columnNum].val === payload.cell.data.val) {
          _rowNum = rowNum;
          _columnNum = columnNum;
        }
      });
    });

    return state.setIn(['player'], payload.user.number === 1 ? 2 : 1)
                .setIn([key, 'bingoBoard', payload.cell.rowNum, payload.cell.columnNum, 'checked'], !bingoBoard[payload.cell.rowNum][payload.cell.columnNum].checked)
                .setIn([anotherKey, 'bingoBoard', _rowNum, _columnNum, 'checked'], true);
  },
}, initialState)