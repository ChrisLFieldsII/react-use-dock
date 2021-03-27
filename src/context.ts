import { createContext } from 'react'

import {
  ReducerState,
  initState,
  RenderDockOptions,
  Orientation,
} from './reducer'

const noop = () => {}

export interface DockContextValue extends ReducerState {
  openDock(): void
  closeDock(): void
  toggleDock(): void
  renderDock(options: RenderDockOptions): void
  setOrientation(orientation: Orientation): void
}

const initContextValue: DockContextValue = {
  openDock: noop,
  closeDock: noop,
  toggleDock: noop,
  setOrientation: noop,
  renderDock: () => null,
  ...initState,
}

export const DockContext = createContext<DockContextValue>(initContextValue)

export default DockContext
