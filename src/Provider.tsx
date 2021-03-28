import React, { useReducer, useCallback, useMemo } from 'react'

import DockContext, { DockContextValue } from './context'
import {
  reducer,
  DOCK_CLOSE_ACTION,
  DOCK_OPEN_ACTION,
  DOCK_RENDER_ACTION,
  RenderDockOptions,
  initState,
  DOCK_TOGGLE_ACTION,
  Orientation,
  DOCK_SET_ORIENTATION_ACTION,
  DOCK_SET_SIZE_ACTION,
  DOCK_SET_MIN_SIZE_ACTION,
} from './reducer'

interface ProviderProps {
  children: any
}

export function Provider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, initState)

  const openDock = useCallback(() => {
    dispatch(DOCK_OPEN_ACTION())
  }, [])

  const closeDock = useCallback(() => {
    dispatch(DOCK_CLOSE_ACTION())
  }, [])

  const renderDock = useCallback((options: RenderDockOptions) => {
    dispatch(DOCK_RENDER_ACTION(options))
  }, [])

  const toggleDock = useCallback(() => {
    dispatch(DOCK_TOGGLE_ACTION())
  }, [])

  const setOrientation = useCallback((orientation: Orientation) => {
    dispatch(DOCK_SET_ORIENTATION_ACTION(orientation))
  }, [])

  const setSize = useCallback((size: number) => {
    dispatch(DOCK_SET_SIZE_ACTION(size))
  }, [])

  const setMinSize = useCallback((minSize: number) => {
    dispatch(DOCK_SET_MIN_SIZE_ACTION(minSize))
  }, [])

  const contextValue: DockContextValue = useMemo(() => {
    return {
      openDock,
      closeDock,
      renderDock,
      toggleDock,
      setOrientation,
      setSize,
      setMinSize,
      ...state,
    }
  }, [state])

  return (
    <DockContext.Provider value={contextValue}>{children}</DockContext.Provider>
  )
}

export default Provider
