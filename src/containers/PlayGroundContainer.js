import React, { Component } from 'react';
import { Button, Dimmer, Divider, Grid, Segment } from "semantic-ui-react";
import UserStatus from "../components/UserStatus/UserStatus";
import EventConsole from "../components/EventConsole/EventConsole";
import * as actions from "../store/bingo";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import BingoBoard from "../components/Bingo/BingoBoard/BingoBoard";

class PlayGroundContainer extends Component {
  player1Console = React.createRef();
  player2Console = React.createRef();

  componentDidMount() {
    const { Actions } = this.props;
    Actions.initialize();
  }

  onClickGameStart = () => {
    const { Actions } = this.props;
    Actions.startGame();
  };

  checkBingo = (bingoBoard) => {
    let bingoCount = 0;
    let bingoNumbers = [];

    // 가로 확인
    for (let row = 0; row < bingoBoard.length ; row++) {
      let count = 0;
      let numbers = [];

      for (let column = 0; column < bingoBoard.length ; column++) {
        let cell = bingoBoard[row][column];
        if (cell.checked) {
          count++;
          numbers.push(cell.val);
        }
      }

      if (count === bingoBoard.length) {
        bingoCount++;
        bingoNumbers.push(numbers);
      }
    }

    // 세로 확인
    for (let column = 0; column < bingoBoard.length ; column++) {
      let count = 0;
      let numbers = [];

      for (let row = 0; row < bingoBoard.length ; row++) {
        let cell = bingoBoard[row][column];
        if (cell.checked) {
          count++;
          numbers.push(cell.val);
        }
      }

      if (count === bingoBoard.length) {
        bingoCount++;
        bingoNumbers.push(numbers);
      }
    }

    // 대각선 확인 1
    for (let row = 0; row < bingoBoard.length ; row++) {
      let count = 0;
      let numbers = [];

      for (let column = 0; column < bingoBoard.length ; row++, column++) {
        let cell = bingoBoard[row][column];
        if (cell.checked) {
          count++;
          numbers.push(cell.val);
        }
      }

      if (count === bingoBoard.length) {
        bingoCount++;
        bingoNumbers.push(numbers);
      }
    }

    // 대각선 확인 2
    for (let row = bingoBoard.length - 1; row > 0 ; row--) {
      let count = 0;
      let numbers = [];

      for (let column = 0; column < bingoBoard.length ; row--, column++) {
        console.log(row);
        console.log(column);
        let cell = bingoBoard[row][column];
        if (cell.checked) {
          count++;
          numbers.push(cell.val);
        }
      }

      if (count === bingoBoard.length) {
        bingoCount++;
        bingoNumbers.push(numbers);
      }
    }

    return {bingoCount: bingoCount, bingoNumbers: bingoNumbers};
  };

  onCellClick = (e, info) => {
    const {Actions, player, user1, user2} = this.props;

    if (info.user.number !== player) {
      alert('잘못된 차례입니다.');
      return;
    }

    if (info.cell.data.checked) {
      alert('이미 선택한 숫자 입니다.');
      return;
    }

    Actions.selectCell(info);

    setTimeout(() => {
      const {user1, user2} = this.props;

      const _user1 = user1.toJS();
      const _user2 = user2.toJS();

      let checkBingo1 = this.checkBingo(_user1.bingoBoard);
      let checkBingo2 = this.checkBingo(_user2.bingoBoard);

      this.player1Console.current.onNotify(checkBingo1);
      this.player2Console.current.onNotify(checkBingo2);

      if (checkBingo1.bingoCount >= 5 && checkBingo2.bingoCount >= 5) {
        alert('무승부 입니다.');
        Actions.initialize();
        this.player1Console.current.clear();
        this.player2Console.current.clear();
      } else if (checkBingo1.bingoCount >= 5) {
        alert('1P가 빙고를 완성했습니다.');
        Actions.initialize();
        this.player1Console.current.clear();
        this.player2Console.current.clear();
      } else if (checkBingo2.bingoCount >= 5) {
        alert('2P가 빙고를 완성했습니다.');
        Actions.initialize();
        this.player1Console.current.clear();
        this.player2Console.current.clear();
      }
    }, 200);
  };

  render() {
    const { playing, player, user1, user2 } = this.props;

    const _user1 = user1.toJS();
    const _user2 = user2.toJS();

    return (
        <Segment>
          <Dimmer.Dimmable as={Segment} dimmed={!playing} blurring>
            <Dimmer simple />
            <Grid columns='equal'>
              <Grid.Row>
                <Grid.Column>
                  <Segment color={player === 1 ? 'green' : ''}>
                    <UserStatus icon='user' name='Player1'/>
                    <BingoBoard bingoBoard={_user1.bingoBoard} onCellClick={(e, data) => {this.onCellClick(e, {user: _user1, cell: data})}}/>
                    <EventConsole ref={this.player1Console}/>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment color={player === 2 ? 'green' : ''}>
                    <UserStatus icon='user' name='Player2'/>
                    <BingoBoard bingoBoard={_user2.bingoBoard} onCellClick={(e, data) => {this.onCellClick(e, {user: _user2, cell: data})}}/>
                    <EventConsole ref={this.player2Console}/>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider vertical>VS</Divider>
          </Dimmer.Dimmable>
          <Button
              attached='bottom'
              color='twitter'
              size='huge'
              fluid
              onClick={this.onClickGameStart}
          >
            {!playing ? 'Game Start' : 'Restart'}
          </Button>
        </Segment>
    );
  }
}

export default connect(
    (state) => ({
      playing: state.bingo.get('playing'),
      player: state.bingo.get('player'),

      user1: state.bingo.get('user1'),
      user2: state.bingo.get('user2'),
    }),
    (dispatch) => ({
      Actions: bindActionCreators(actions, dispatch)
    })
)(PlayGroundContainer);