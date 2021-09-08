export default {
  translation: {
    puzzle: {
      errors: {
        processState: 'Wrong process state: {{ processState }}',
      },
      buttons: {
        start: 'Start game',
        restart: 'Restart',
        pause: {
          on: 'Pause',
          off: 'Continue',
        },
      },
      infoSection: {
        counter: {
          count: '{{count}} step',
          count_plural: '{{count}} steps',
        },
        timer: '{{count}} sec',
        recordsTitle: 'record',
        currentDataTitle: 'progress',
      },
      modal: {
        title: 'How to play',
        description: {
          p1: 'To make a move, click on the tile next to the empty area. The game ends when all the tiles are in ascending order.',
          p2: 'The goal of the puzzle is to place the tiles in numerical order, preferably by making as few movements as possible.',
        },
        btn: 'ok',
      },
    },
  },
};
