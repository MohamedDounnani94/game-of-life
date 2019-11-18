const probability = 0.2

module.exports = {
  probabilityOfCellBirth: function () {
    return probability
  },
  nextStateOfCell: function (
    neighboursThatAreAlive = 3,
    currentState = 0,
  ) {
    let nextState = 0
    if (currentState) {
      switch (neighboursThatAreAlive) {
        case 1:
          nextState = 0
          break
        case 2:
        case 3:
          nextState = 1
          break
        default:
          nextState = 0
          break
      }
    }
    if (!currentState) {
      if (neighboursThatAreAlive === 3) {
        nextState = 1
      }
    }
    return nextState
  },
}
