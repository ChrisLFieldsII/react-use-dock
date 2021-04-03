import { createContext } from 'react'

import {
  ReducerState,
  initState,
  Orientation,
  DockOpenActionData,
  DockCloseActionData,
  Render,
  RenderDockOptions,
} from './reducer'
import { noop, renderNull } from './utils'

/**
 * @desc The Dock object. Contains state and functions to control state.
 */
export interface DockContextValue extends ReducerState {
  /**
   * @desc Open the Dock.
   * @param data Optional data to control Dock state.
   */
  openDock(data?: DockOpenActionData): void

  /**
   * @desc Close the Dock.
   * @param  data Optional data to control how Dock state changes on close.
   */
  closeDock(data?: DockCloseActionData): void

  /**
   * @desc Configure all Dock state optionally.
   * @param options Data to control all Dock state.
   */
  renderDock(options: RenderDockOptions): void

  /**
   * @desc Toggle Dock between open and closed status
   */
  toggleDock(): void

  /**
   * @desc Where Dock is positioned in viewport
   * @param orientation left, right, top, bottom
   */
  setOrientation(orientation: Orientation): void

  /**
   * @desc Set Dock size. Internally calculated as `vw` or `vh` depending on `orientation`
   * @param size Dock size
   */
  setSize(size: number): void

  /**
   * @desc Set Dock minimum size. Internally calulated as `px`
   * @param size Dock minimum size
   */
  setMinSize(size: number): void

  /**
   * @desc Set Dock render function
   * @param render Dock render function
   */
  setRender(render: Render): void

  /**
   * @desc Set how Dock handles `render` function when closed.
   * If `true`, opening and closing Dock maintains same `render` function.
   * If `false`, `render` is set to `() => null` when closed and you MUST set a new `render` function before opening Dock or a blank screen is displayed.
   * @param persistRender Whether to persist render function on close
   */
  setPersistRender(persistRender: boolean): void
}

const initContextValue: DockContextValue = {
  openDock: noop,
  closeDock: noop,
  toggleDock: noop,
  renderDock: noop,
  setOrientation: noop,
  setSize: noop,
  setMinSize: noop,
  setPersistRender: noop,
  setRender: renderNull,
  ...initState,
}

export const DockContext = createContext<DockContextValue>(initContextValue)

export default DockContext
