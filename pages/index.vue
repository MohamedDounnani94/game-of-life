<template>
  <div class="container">
    <div
      v-for= "(row, index) in cells"
      :key= "index"
    >
      <div
        v-for= "cell in row"
        :key="cell.name"
        class="cell"
        :class="cell.currentState ? 'colored-cell' : ''"
      >
      </div>
    </div>
  </div>
</template>

<script>

import {
  probabilityOfCellBirth,
  createCellValue,
  nextStateOfCell,
  } from '../plugins/index' 
export default {
  data: function () {
    return {
      cells: [],
      worldCreated: false,
      height: 0,
      width: 0,
    }
  },
  computed: {
    screenHeight: function() {
      if(process.client) {
        return window.innerHeight
      }
    },
    screenWidth: () => {
      if(process.client) {
        return window.innerWidth
      }
    },
    probabilityOfCellBirth,
  },
  mounted() {
    this.createWorld(this.screenWidth, this.screenHeight)
  },
  methods: {
    createWorld: function (width, height) {
      const cells = []
      for(let i = 0; i < (width / 10); i++) {
        const row = []
        for(let j = 0; j < (height / 10); j++) {
          const cell = {
            column: i,
            row: j,
            name: `cell: ${i}/${j}`,
            currentState: this.createCellValue(),
            nextState: 0,
            canChangeState: false,
          }
          row.push(cell)
        }
        cells.push(row)
      }
      this.cells = cells
      this.worldCreated = true
      this.tiking(width, height, cells)
    },
    createCellValue: function() {
      let number = 0
      if(Math.random() < this.probabilityOfCellBirth) number = 1
      return number
    },
    nextStateOfCell,
    tiking: async function(width, height) {   
      let counter = 0   
      await this.sleep(3)
      while(true) {
        for(let i = 0; i < (width / 10); i++) {
          for(let j = 0; j < (height / 10); j++) {
            const cell = this.cells[i][j]
            const aliveNeighbours = this.getAliveNeighbours(i, j)
            const nextState = this.nextStateOfCell(aliveNeighbours, cell.currentState)
            if(cell.canChangeState) {
              cell.canChangeState = false
              cell.currentState = cell.nextState
            } else {
              cell.canChangeState = true
            }
            cell.nextState = nextState
          }
        }
        await this.sleep(0.2)
      }
    },
    sleep: async function (seconds) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('Finish')
        }, seconds * 1000)
      })
    },
    getAliveNeighbours: function (i, j) {
      const neighbourse = [
        this.cells[i - 1] ? this.cells[i-1][j] : 0,
        this.cells[i - 1] ? this.cells[i - 1][j - 1] : 0,
        this.cells[i - 1] ? this.cells[i - 1][j + 1] : 0,
        this.cells[i] ? this.cells[i][j - 1] : 0,
        this.cells[i] ? this.cells[i][j + 1] : 0,
        this.cells[i + 1] ? this.cells[i + 1][j] : 0,
        this.cells[i + 1] ? this.cells[i + 1][j + 1] : 0,
        this.cells[i + 1] ? this.cells[i + 1][j - 1] : 0,
      ]
      return neighbourse.filter(el => el ? el.currentState === 1 : null).length
    }
  }
}
</script>

<style>

.cell {
  height: 20px;
  width: 20px;
  border-width: 1px;
  border-color: #e2e8f0
}
.container {
  min-height: 100vh;
  min-width: 100vw;
  background-color: white;
  display: flex;
  flex-wrap: wrap
}
.colored-cell {
  background-color: black
}

</style>
