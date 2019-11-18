import test from 'ava'
import {
  probabilityOfCellBirth,
  nextStateOfCell,
} from '../../plugins'

test('probability of life should be 0.5', async (t) => {
  t.is(probabilityOfCellBirth(), 0.2)
})

test('Next state of a cell if has less than 2 neighbours and is alive, it should die', async (t) => {
  t.is(nextStateOfCell(1, 1), 0)
})

test('Next state of a cell if has 2 neighbours and is alive, it should remain alive', async (t) => {
  t.is(nextStateOfCell(2, 1), 1)
})

test('Next state of a cell if has 3 neighbours and is alive, it should remain alive', async (t) => {
  t.is(nextStateOfCell(3, 1), 1)
})

test('Next state of a cell if has 4 neighbours and is alive, it should die', async (t) => {
  t.is(nextStateOfCell(4, 1), 0)
})

test('Next state of a cell if has 5 neighbours and is alive, it should die', async (t) => {
  t.is(nextStateOfCell(5, 1), 0)
})

test('Next state of a cell if has 6 neighbours and is alive, it should die', async (t) => {
  t.is(nextStateOfCell(6, 1), 0)
})

test('Next state of a cell if has 7 neighbours and is alive, it should die', async (t) => {
  t.is(nextStateOfCell(7, 1), 0)
})

test('Next state of a cell if has 8 neighbours and is alive, it should die', async (t) => {
  t.is(nextStateOfCell(8, 1), 0)
})

test('Next state of a cell if has 3 neighbours and is dead, it should rise again', async (t) => {
  t.is(nextStateOfCell(3, 0), 1)
})
