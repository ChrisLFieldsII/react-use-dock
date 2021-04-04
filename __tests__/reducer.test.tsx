import {
  reducer,
  initState,
  ReducerState,
  DOCK_OPEN_ACTION,
  DOCK_CLOSE_ACTION,
  DOCK_SET_RENDER_ACTION,
  DOCK_RENDER_ACTION,
  DOCK_TOGGLE_ACTION,
  DOCK_SET_ORIENTATION_ACTION,
  Orientation,
  DOCK_SET_SIZE_ACTION,
  DOCK_SET_MIN_SIZE_ACTION,
  DOCK_SET_PERSIST_RENDER_ACTION,
} from '../src/reducer'
import { renderNull } from '../src/utils'

let state: ReducerState
const testState: Omit<ReducerState, 'isOpen'> = {
  minSize: 500,
  size: 75,
  render: () => <p>My dock content</p>,
  persistRender: false,
  orientation: 'left',
}

beforeEach(() => {
  state = reducer(undefined)
})

describe('reducer', () => {
  it('sets initial state', () => {
    expect(state).toEqual(initState)
  })

  it('opens dock', () => {
    state = reducer(state, DOCK_OPEN_ACTION())

    expect(state.isOpen).toEqual(true)
  })

  it('opens dock with options', () => {
    state = reducer(state, DOCK_OPEN_ACTION(testState))

    expect(state).toEqual({
      ...testState,
      isOpen: true,
    })
  })

  it('closes dock', () => {
    state = reducer(state, DOCK_CLOSE_ACTION())

    expect(state.isOpen).toEqual(false)
  })

  it('closes dock with persistRender = true', () => {
    const render = () => <p>Render</p>

    state = reducer(state, DOCK_SET_RENDER_ACTION(render))

    state = reducer(state, DOCK_CLOSE_ACTION({ persistRender: true }))

    expect(state).toEqual({
      ...state,
      isOpen: false,
      render,
    })
  })

  it('closes dock with persistRender = false', () => {
    const render = () => <p>Render</p>

    state = reducer(state, DOCK_SET_RENDER_ACTION(render))

    state = reducer(state, DOCK_CLOSE_ACTION({ persistRender: false }))

    expect(state).toEqual({
      ...state,
      isOpen: false,
      render: renderNull,
    })
  })

  it('calls dockRender with no values', () => {
    state = reducer(state, DOCK_RENDER_ACTION({}))

    expect(state).toEqual(initState)
  })

  it('calls dockRender with values', () => {
    state = reducer(state, DOCK_RENDER_ACTION({ isOpen: true, ...testState }))

    expect(state).toEqual({
      ...testState,
      isOpen: true,
    })
  })

  it('toggles dock', () => {
    state = reducer(state, DOCK_TOGGLE_ACTION())

    expect(state.isOpen).toEqual(true)

    state = reducer(state, DOCK_TOGGLE_ACTION())

    expect(state.isOpen).toEqual(false)
  })

  it('sets orientation', () => {
    const orientations: Orientation[] = ['bottom', 'top', 'left', 'right']

    orientations.forEach((orientation) => {
      state = reducer(state, DOCK_SET_ORIENTATION_ACTION(orientation))

      expect(state.orientation).toEqual(orientation)
    })
  })

  it('sets size', () => {
    state = reducer(state, DOCK_SET_SIZE_ACTION(testState.size))

    expect(state.size).toEqual(testState.size)
  })

  it('sets min size', () => {
    state = reducer(state, DOCK_SET_MIN_SIZE_ACTION(testState.minSize))

    expect(state.minSize).toEqual(testState.minSize)
  })

  it('sets render', () => {
    state = reducer(state, DOCK_SET_RENDER_ACTION(testState.render))

    expect(state.render).toEqual(testState.render)
  })

  it('sets persist render', () => {
    const bools = [true, false]

    bools.forEach((bool) => {
      state = reducer(state, DOCK_SET_PERSIST_RENDER_ACTION(bool))

      expect(state.persistRender).toEqual(bool)
    })
  })
})
