export default {
  translation: {
    puzzle: {
      errors: {
        processState: 'Неверный ключ процесса: {{ processState }}',
      },
      buttons: {
        start: 'Начать игру',
        restart: 'Переиграть',
        pause: {
          on: 'Пауза',
          off: 'Продолжить',
        },
      },
      infoSection: {
        counter: {
          count_0: '{{count}} ход',
          count_1: '{{count}} хода',
          count_2: '{{count}} ходов',
        },
        timer: '{{count}} сек',
        recordsTitle: 'рекорд',
        currentDataTitle: 'прогресс',
      },
      modal: {
        title: 'Правила игры',
        description: {
          p1: 'Чтобы сделать ход нажмите на костяшку рядом с пустой областью. Игра завершиться когда все костяшки будут выстроены по возрастанию.',
          p2: 'Цель игры — перемещая костяшки по коробке, добиться упорядочивания их по номерам, желательно сделав как можно меньше перемещений.',
        },
        btn: 'Ок',
      },
    },
  },
};
