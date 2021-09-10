export default {
  debug: false,
  lang: null, // en. ru
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
    timerId: null,
    data: {
      step: 0, stepRecord: 0, time: 0, timeRecord: 0,
    },
  },
};
