// 게임 한판을 나타내는 클래스, 데이터와 로직을 관리하는
class TicTacToe {
  // 상태?
  // - 게임판
  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  // - 현재 플레이어
  player = 'X';
  // 동작?
  // - 턴
  init() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    this.player = 'X';
  }
  turn({row, col}) {
    if (this.board[row][col] == null) {
      // 현재 플레이어에대한 표시를 게임판의 해당 위치에 넣어주고
      this.board[row][col] =  this.player;
      // 현재 플레이어를 변경
      this.player = this.player === 'X' ? 'O': 'X';
    }
  }
  // - 누가 이겼는지 판별
  checkWinner() {
    let noNull = 0;
    for (let i = 0; i < 3; i++) {
      if (
        // 가로로 모두
        this.board[i][0] != null && 
        this.board[i][0] === this.board[i][1] && 
        this.board[i][1] === this.board[i][2]
      ) {
        return this.board[i][0];
      } else if (
        // 세로로 모두
        this.board[0][i] != null &&
        this.board[0][i] === this.board[1][i] && 
        this.board[1][i] === this.board[2][i]
      ) {
        return this.board[0][i];
      } 
      for(let j = 0; j < 3; j++) {
        if (this.board[i][j] != null) {
          noNull++;
        }
      }
    }
    if (
      // 대각선 모두
      this.board[1][1] != null &&
      (
        this.board[0][0] === this.board[1][1] &&
        this.board[0][0] === this.board[2][2]
      ) || (
        this.board[0][2] === this.board[1][1] &&
        this.board[0][2] === this.board[2][0]
    )) {
      return this.board[1][1];
    } else if(noNull === 9) {
      return 'Draw';
    }
  }
}
const game = new TicTacToe();

const rowEls = document.querySelectorAll('.board__row'); 
const winnerEls = document.querySelector('.winner');
rowEls.forEach((rowEl, rowIndex) => {
  const colEls = rowEl.querySelectorAll('.board__col');
  colEls.forEach((colEl, colIndex) => {
    colEl.addEventListener('click', e => {
      game.turn({row: rowIndex, col: colIndex});
      // draw();
      e.target.textContent = game.board[rowIndex][colIndex];
      const winner = game.checkWinner();
      if(winner) {
        winnerEls.classList.add('end');
        winnerEls.querySelector('.winner__txt').textContent = winner;
      }
    });
  });
});
document.querySelector('.btn-restart').addEventListener('click', e => {
  game.init();
  document.querySelectorAll('.board__col').forEach(colEl => {
    colEl.textContent = '';
  });
  winnerEls.classList.remove('end');
});
