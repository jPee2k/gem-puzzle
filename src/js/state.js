export default {
  debug: false,
  puzzle: {
    processState: 'pause', // pause, play, win
    field: [],
    winCombination: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, null],
    ],
    isWin: false,
    timerId: false,
    data: {
      steps: 0, record: 0, time: 0, bestTime: 0,
    },
  },
};
