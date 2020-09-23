const game = (() => {
  const Model = (() => {
    const gameBoard = (() => {
      let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
      let markNumber = 1;
      let winner = [];

      const checkEmpty = (row, column) => {
        return board[row][column] === '';
      };

      const markOnBoard = (row, column, mark) => {
        board[row][column] = mark;
      };

      const checkWin = () => {
        for (let i = 0; i < 3; i++) {
          //check rows
          if (
            board[i][0] !== '' &&
            board[i][0] === board[i][1] &&
            board[i][0] === board[i][2]
          ) {
            winner.push(board[i][0]);
          }

          //check columns
          if (
            board[0][i] !== '' &&
            board[0][i] === board[1][i] &&
            board[0][i] === board[2][i]
          ) {
            winner.push(board[0][i]);
          }

          //check diagonals1
          if (
            board[i][i] !== '' &&
            board[i][i] === board[1][1] &&
            board[i][i] === board[2][2]
          ) {
            winner.push(board[i][i]);
          }
        }
        //check diagonals2
        if (
          board[0][2] !== '' &&
          board[0][2] === board[1][1] &&
          board[0][2] === board[2][0]
        ) {
          winner.push(board[0][2]);
        }

        return winner;
      };

      const countMark = () => {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] !== '') {
              return markNumber++;
            }
          }
        }
      };

      const resetSetting = () => {
        board = [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
        markNumber = 1;
        winner = [];
      };

      return {
        board,
        checkEmpty,
        markOnBoard,
        checkWin,
        countMark,
        resetSetting,
      };
    })();

    const player = (() => {
      //Player factory
      function Player(name, mark) {
        return { name, mark };
      }

      let players = [Player('player1', 'O'), Player('player2', 'X')];
      let currentPlayer = players[0];

      const putPlayersName = (player1, player2) => {
        players = [Player(player1, 'O'), Player(player2, 'X')];
      };

      const getPlayersName = () => {
        return players;
      };

      const getCurrentPlayer = () => {
        return currentPlayer;
      };

      const swapPlayer = () => {
        const newCurrentPlayer =
          currentPlayer === players[1] ? players[0] : players[1];
        currentPlayer = newCurrentPlayer;
      };

      const resetPlayer = () => {
        currentPlayer = players[0];
      };

      return {
        putPlayersName,
        getPlayersName,
        getCurrentPlayer,
        swapPlayer,
        resetPlayer,
      };
    })();

    return {
      gameBoard,
      player,
    };
  })();

  const View = (() => {
    const overlay = document.querySelector('.game__overlay');
    const playerNameForm = document.querySelector('.game__playerName-form');
    const resultBox = document.querySelector('.game__result');
    const playersTag = document.querySelector('.game__players');

    const putPlayersName = (playerName) => {
      const playerTag = document.createElement('div');
      playerTag.classList.add(`game__players__player`);
      playerTag.textContent = playerName;
      playersTag.appendChild(playerTag);
    };

    const createBoard = () => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let square = document.createElement('div');
          square.classList.add('game__gameBoard__square');
          square.classList.add(`${i}-${j}`);
          square.addEventListener('click', (e) => {
            Controller.clickSquare(e);
          });

          document.querySelector('.game__gameBoard').append(square);
        }
      }
    };

    const setMark = (row, column, mark) => {
      const targetSquare = document.getElementsByClassName(`${row}-${column}`);
      targetSquare[0].textContent = mark;
    };

    const printWinner = (winner, players) => {
      playersTag.textContent = '';
      const winnerTag = document.querySelector('.game__result__winner');

      if (winner.length === 0 || winner.length === 2) {
        winnerTag.textContent = `It was Tie!`;
      } else {
        if (winner[0] === 'O') {
          winnerTag.textContent = `${players[0].name} won!`;
        } else if (winner[0] === 'X') {
          winnerTag.textContent = `${players[1].name} won!`;
        }
      }

      resultBox.classList.add('--active');
    };

    const inactiveIntro = () => {
      playerNameForm.classList.remove('--active');
      overlay.classList.remove('--active');
    };

    const activeIntro = () => {
      overlay.classList.add('--active');
      playerNameForm.classList.add('--active');
    };

    const clearPage = () => {
      document.querySelector('.game__gameBoard').textContent = '';
      document.querySelector('.game__players').textContent = '';
      resultBox.classList.remove('--active');
    };

    return {
      putPlayersName,
      createBoard,
      setMark,
      printWinner,
      activeIntro,
      inactiveIntro,
      clearPage,
    };
  })();

  const Controller = (() => {
    const submitPlayerNameForm = (e) => {
      e.preventDefault();

      const player1Input = document.querySelector('#player1').value;
      const player2Input = document.querySelector('#player2').value;

      let player1Name =
        player1Input !== '' ? `O: ${player1Input}` : 'O: Player 1';
      let player2Name =
        player2Input !== '' ? `X: ${player2Input}` : 'X: Player 2';

      Model.player.putPlayersName(player1Name, player2Name);

      View.putPlayersName(player1Name);
      View.putPlayersName(player2Name);

      document.querySelector('#player1').value = '';
      document.querySelector('#player2').value = '';
    };

    const clickSquare = (e) => {
      const markIndex = e.target.classList[1];
      const [row, column] = markIndex.split('-').slice(0, 2);
      const currentPlayer = Model.player.getCurrentPlayer();
      const players = Model.player.getPlayersName();

      if (Model.gameBoard.checkEmpty(row, column)) {
        Model.gameBoard.markOnBoard(row, column, currentPlayer.mark);
        View.setMark(row, column, currentPlayer.mark);

        checkWin(players);

        Model.player.swapPlayer();
      } else {
        return false;
      }
    };

    const checkWin = (players) => {
      const markNumber = Model.gameBoard.countMark();

      console.log(markNumber);

      if (markNumber % 2 !== 1 || markNumber === 9) {
        const winner = Model.gameBoard.checkWin();

        if (winner.length > 0) {
          View.printWinner(winner, players);
        }
        if (markNumber === 9) {
          View.printWinner(winner, players);
        }
      }
    };

    const playerNameFormListener = () => {
      const playerNameForm = document.querySelector('.game__playerName-form');

      playerNameForm.addEventListener('submit', (e) => {
        submitPlayerNameForm(e);
        View.createBoard();
        View.inactiveIntro();
      });
    };

    const restartBtnListener = () => {
      const restartBtn = document.querySelector('.game__result__restart');

      restartBtn.addEventListener('click', function () {
        Model.gameBoard.resetSetting();
        Model.player.resetPlayer();

        View.clearPage();
        View.activeIntro();
      });
    };

    return {
      clickSquare,
      playerNameFormListener,
      restartBtnListener,
    };
  })();

  Controller.playerNameFormListener();
  Controller.restartBtnListener();
})();
