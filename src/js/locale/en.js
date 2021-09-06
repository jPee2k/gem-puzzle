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
          p1: (
            `The goal of the game is to move the tiles around the box to arrange
             them by numbers, preferably by making as few movements as possible.`
          ),
          p2: (
            `To move a tile, click on the one next to the empty area. The game
             ends when all the tiles are in ascending order.`
          ),
        },
        btn: 'ok',
      },
    },
  },
};
