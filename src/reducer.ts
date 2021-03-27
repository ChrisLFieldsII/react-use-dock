interface IAction<T, U> {
  type: T
  data: U
}

export type Orientation = 'top' | 'bottom' | 'left' | 'right'

export interface RenderDockOptions extends ReducerState {}

export interface ReducerState {
  isOpen: boolean
  size: number // size is in vw|vh
  minSize: number // minSize is px
  orientation: Orientation
  render(): JSX.Element | null
}

export const initState: ReducerState = {
  isOpen: false,
  size: 50,
  minSize: 350,
  render: () => null,
  orientation: 'right',
}

// #region DOCK_OPEN
export const DOCK_OPEN = 'DOCK_OPEN'

interface I_DOCK_OPEN_ACTION extends IAction<typeof DOCK_OPEN, null> {}

export const DOCK_OPEN_ACTION = (): I_DOCK_OPEN_ACTION => ({
  type: DOCK_OPEN,
  data: null,
})

const HANDLE_DOCK_OPEN_ACTION = (state: ReducerState): ReducerState => {
  return {
    ...state,
    isOpen: true,
  }
}
// #endregion DOCK_OPEN

// #region DOCK_CLOSE
export const DOCK_CLOSE = 'DOCK_CLOSE'

interface I_DOCK_CLOSE_ACTION extends IAction<typeof DOCK_CLOSE, null> {}

export const DOCK_CLOSE_ACTION = (): I_DOCK_CLOSE_ACTION => ({
  type: DOCK_CLOSE,
  data: null,
})

const HANDLE_DOCK_CLOSE_ACTION = (state: ReducerState): ReducerState => {
  return {
    ...state,
    isOpen: false,
  }
}
// #endregion DOCK_CLOSE

// #region DOCK_RENDER
export const DOCK_RENDER = 'DOCK_RENDER'

interface I_DOCK_RENDER_ACTION
  extends IAction<typeof DOCK_RENDER, RenderDockOptions> {}

export const DOCK_RENDER_ACTION = (
  data: RenderDockOptions,
): I_DOCK_RENDER_ACTION => ({ type: DOCK_RENDER, data })

const HANDLE_DOCK_RENDER_ACTION = (
  state: ReducerState,
  action: I_DOCK_RENDER_ACTION,
): ReducerState => {
  return {
    ...state,
    ...action.data,
  }
}
// #endregion DOCK_RENDER

// #region DOCK_TOGGLE
export const DOCK_TOGGLE = 'DOCK_TOGGLE'

interface I_DOCK_TOGGLE_ACTION extends IAction<typeof DOCK_TOGGLE, null> {}

export const DOCK_TOGGLE_ACTION = (): I_DOCK_TOGGLE_ACTION => ({
  type: DOCK_TOGGLE,
  data: null,
})

const HANDLE_DOCK_TOGGLE_ACTION = (state: ReducerState): ReducerState => {
  return {
    ...state,
    isOpen: !state.isOpen,
  }
}
// #endregion DOCK_TOGGLE

// #region DOCK_SET_ORIENTATION
export const DOCK_SET_ORIENTATION = 'DOCK_SET_ORIENTATION'

interface I_DOCK_SET_ORIENTATION_ACTION
  extends IAction<typeof DOCK_SET_ORIENTATION, Orientation> {}

export const DOCK_SET_ORIENTATION_ACTION = (
  data: Orientation,
): I_DOCK_SET_ORIENTATION_ACTION => ({ type: DOCK_SET_ORIENTATION, data })

const HANDLE_DOCK_SET_ORIENTATION_ACTION = (
  state: ReducerState,
  action: I_DOCK_SET_ORIENTATION_ACTION,
): ReducerState => {
  return {
    ...state,
    orientation: action.data,
  }
}
// #endregion DOCK_SET_ORIENTATION

type Actions =
  | I_DOCK_OPEN_ACTION
  | I_DOCK_CLOSE_ACTION
  | I_DOCK_RENDER_ACTION
  | I_DOCK_TOGGLE_ACTION
  | I_DOCK_SET_ORIENTATION_ACTION

const actionHandler = {
  [DOCK_OPEN]: HANDLE_DOCK_OPEN_ACTION,
  [DOCK_CLOSE]: HANDLE_DOCK_CLOSE_ACTION,
  [DOCK_RENDER]: HANDLE_DOCK_RENDER_ACTION,
  [DOCK_TOGGLE]: HANDLE_DOCK_TOGGLE_ACTION,
  [DOCK_SET_ORIENTATION]: HANDLE_DOCK_SET_ORIENTATION_ACTION,
}

export const reducer = (
  state: ReducerState = initState,
  action: Actions,
): ReducerState => {
  const handler = actionHandler[action.type]

  if (!handler) return state

  // @ts-ignore
  return handler(state, action)
}

export default reducer
