import { renderNull } from './utils'

interface IAction<T, U> {
  type: T
  data: U
}

export type Render = () => JSX.Element | null

export type Orientation = 'top' | 'bottom' | 'left' | 'right'

export type RenderDockOptions = Partial<ReducerState>

export interface ReducerState {
  /**
   * @desc Is Dock open.
   */
  isOpen: boolean

  /**
   * @desc Dock size. Internally calculated as `vw` (left,right) or `vh` (top,bottom) depending on `orientation`.
   */
  size: number

  /**
   * @desc Dock minimum size. Internally calulated as `px`.
   */
  minSize: number

  /**
   * @desc Where Dock is positioned in viewport. left, right, top, bottom
   */
  orientation: Orientation

  /**
   * @desc Dock render function.
   */
  render: Render

  /**
   * @desc If `true`, opening and closing Dock persists same `render` function.
   * This is good for maintaining component state between open and close.
   *
   * If `false`, `render` is set to `() => null` when closed and you MUST set a new `render` function before opening Dock
   * or a blank screen will be displayed. This is good for always showing a component with new state.
   *
   * Note: If you always want the Dock to display a fresh component on open use the `key` prop on root component in `render` function.
   * Ex: `<button onClick={() => dock.openDock({ render: () => <AlwaysFreshComponent key={Math.random()} /> })} />`
   *
   * Note: `persistRender` only applies to `closeDock()`. It does not apply when using `toggleDock()` to help prevent accidentally showing a blank Dock
   */
  persistRender: boolean
}

export const initState: ReducerState = {
  isOpen: false,
  size: 50,
  minSize: 350,
  render: renderNull,
  orientation: 'right',
  persistRender: true,
}

// #region DOCK_OPEN
export type DockOpenActionData = Partial<Omit<ReducerState, 'isOpen'>>

export const DOCK_OPEN = 'DOCK_OPEN'

interface I_DOCK_OPEN_ACTION
  extends IAction<typeof DOCK_OPEN, DockOpenActionData> {}

export const DOCK_OPEN_ACTION = (
  data: DockOpenActionData = {},
): I_DOCK_OPEN_ACTION => ({
  type: DOCK_OPEN,
  data,
})

const HANDLE_DOCK_OPEN_ACTION = (
  state: ReducerState,
  action: I_DOCK_OPEN_ACTION,
): ReducerState => {
  const { data } = action

  return {
    ...state,
    isOpen: true,
    minSize: data.minSize ?? state.minSize,
    orientation: data.orientation ?? state.orientation,
    render: data.render ?? state.render,
    size: data.size ?? state.size,
    persistRender: data.persistRender ?? state.persistRender,
  }
}
// #endregion DOCK_OPEN

// #region DOCK_CLOSE

export interface DockCloseActionData {
  persistRender?: boolean
}

export const DOCK_CLOSE = 'DOCK_CLOSE'

interface I_DOCK_CLOSE_ACTION
  extends IAction<typeof DOCK_CLOSE, DockCloseActionData> {}

export const DOCK_CLOSE_ACTION = (
  data: DockCloseActionData = {},
): I_DOCK_CLOSE_ACTION => ({
  type: DOCK_CLOSE,
  data,
})

const HANDLE_DOCK_CLOSE_ACTION = (
  state: ReducerState,
  action: I_DOCK_CLOSE_ACTION,
): ReducerState => {
  const { data } = action

  const persistRender = data.persistRender ?? state.persistRender

  return {
    ...state,
    isOpen: false,
    render: persistRender ? state.render : renderNull,
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
  const { data } = action

  return {
    ...state,
    isOpen: data.isOpen ?? state.isOpen,
    minSize: data.minSize ?? state.minSize,
    orientation: data.orientation ?? state.orientation,
    render: data.render ?? state.render,
    size: data.size ?? state.size,
    persistRender: data.persistRender ?? state.persistRender,
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

// #region DOCK_SET_SIZE
export const DOCK_SET_SIZE = 'DOCK_SET_SIZE'

interface I_DOCK_SET_SIZE_ACTION
  extends IAction<typeof DOCK_SET_SIZE, number> {}

export const DOCK_SET_SIZE_ACTION = (data: number): I_DOCK_SET_SIZE_ACTION => ({
  type: DOCK_SET_SIZE,
  data,
})

const HANDLE_DOCK_SET_SIZE_ACTION = (
  state: ReducerState,
  action: I_DOCK_SET_SIZE_ACTION,
): ReducerState => {
  return {
    ...state,
    size: action.data,
  }
}
// #endregion DOCK_SET_SIZE

// #region DOCK_SET_MIN_SIZE
export const DOCK_SET_MIN_SIZE = 'DOCK_SET_MIN_SIZE'

interface I_DOCK_SET_MIN_SIZE_ACTION
  extends IAction<typeof DOCK_SET_MIN_SIZE, number> {}

export const DOCK_SET_MIN_SIZE_ACTION = (
  data: number,
): I_DOCK_SET_MIN_SIZE_ACTION => ({ type: DOCK_SET_MIN_SIZE, data })

const HANDLE_DOCK_SET_MIN_SIZE_ACTION = (
  state: ReducerState,
  action: I_DOCK_SET_MIN_SIZE_ACTION,
): ReducerState => {
  return {
    ...state,
    minSize: action.data,
  }
}
// #endregion DOCK_SET_MIN_SIZE

// #region DOCK_SET_RENDER
export const DOCK_SET_RENDER = 'DOCK_SET_RENDER'

interface I_DOCK_SET_RENDER_ACTION
  extends IAction<typeof DOCK_SET_RENDER, Render> {}

export const DOCK_SET_RENDER_ACTION = (
  data: Render,
): I_DOCK_SET_RENDER_ACTION => ({ type: DOCK_SET_RENDER, data })

const HANDLE_DOCK_SET_RENDER_ACTION = (
  state: ReducerState,
  action: I_DOCK_SET_RENDER_ACTION,
): ReducerState => {
  return {
    ...state,
    render: action.data,
  }
}
// #endregion DOCK_SET_RENDER

// #region DOCK_SET_PERSIST_RENDER
export const DOCK_SET_PERSIST_RENDER = 'DOCK_SET_PERSIST_RENDER'

interface I_DOCK_SET_PERSIST_RENDER_ACTION
  extends IAction<typeof DOCK_SET_PERSIST_RENDER, boolean> {}

export const DOCK_SET_PERSIST_RENDER_ACTION = (
  data: boolean,
): I_DOCK_SET_PERSIST_RENDER_ACTION => ({ type: DOCK_SET_PERSIST_RENDER, data })

const HANDLE_DOCK_SET_PERSIST_RENDER_ACTION = (
  state: ReducerState,
  action: I_DOCK_SET_PERSIST_RENDER_ACTION,
): ReducerState => {
  return {
    ...state,
    persistRender: action.data,
  }
}
// #endregion DOCK_SET_PERSIST_RENDER

type Actions =
  | I_DOCK_OPEN_ACTION
  | I_DOCK_CLOSE_ACTION
  | I_DOCK_TOGGLE_ACTION
  | I_DOCK_SET_ORIENTATION_ACTION
  | I_DOCK_SET_SIZE_ACTION
  | I_DOCK_SET_MIN_SIZE_ACTION
  | I_DOCK_SET_RENDER_ACTION
  | I_DOCK_RENDER_ACTION
  | I_DOCK_SET_PERSIST_RENDER_ACTION

const actionHandler = {
  [DOCK_OPEN]: HANDLE_DOCK_OPEN_ACTION,
  [DOCK_CLOSE]: HANDLE_DOCK_CLOSE_ACTION,
  [DOCK_TOGGLE]: HANDLE_DOCK_TOGGLE_ACTION,
  [DOCK_SET_ORIENTATION]: HANDLE_DOCK_SET_ORIENTATION_ACTION,
  [DOCK_SET_SIZE]: HANDLE_DOCK_SET_SIZE_ACTION,
  [DOCK_SET_MIN_SIZE]: HANDLE_DOCK_SET_MIN_SIZE_ACTION,
  [DOCK_SET_RENDER]: HANDLE_DOCK_SET_RENDER_ACTION,
  [DOCK_RENDER]: HANDLE_DOCK_RENDER_ACTION,
  [DOCK_SET_PERSIST_RENDER]: HANDLE_DOCK_SET_PERSIST_RENDER_ACTION,
}

export const reducer = (
  state: ReducerState = initState,
  action?: Actions,
): ReducerState => {
  if (!action) return state

  const handler = actionHandler[action.type]

  if (!handler) return state

  // @ts-ignore
  return handler(state, action)
}

export default reducer
