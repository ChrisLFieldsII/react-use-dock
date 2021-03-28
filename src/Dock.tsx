import React, { CSSProperties } from 'react'

import useDock from './useDock'
import { Orientation } from './reducer'

const styles: { [key: string]: CSSProperties } = {
  dock: {
    position: 'absolute',
    zIndex: 100000,
    transition: 'width 0.5s, min-width 0.5s, height 0.5s, min-height 0.5s',
    overflow: 'auto',
    boxShadow: '5px 10px 8px 10px #888',
    border: '1px solid rgb(183, 183, 185)',
  },
  dockClosed: {
    boxShadow: 'none',
    border: 'none',
  },
  right: {
    top: 0,
    right: 0,
    height: '100vh',
  },
  left: {
    top: 0,
    left: 0,
    height: '100vh',
  },
  top: {
    top: 0,
    right: 0,
    width: '100vw',
  },
  bottom: {
    bottom: 0,
    right: 0,
    width: '100vw',
  },
}

interface DockProps {
  id?: string
  style?: CSSProperties
}

function Dock({ id = 'react-use-dock', style = {} }: DockProps) {
  const dock = useDock()

  const getStyle = (): CSSProperties => {
    const getSize = (value: number, unit: string): string => {
      if (dock.isOpen) return value + unit
      return '0px'
    }

    const orientationStyle = styles[dock.orientation]

    const sizeStyle: CSSProperties = ([
      'right',
      'left',
    ] as Orientation[]).includes(dock.orientation)
      ? {
          width: getSize(dock.size, 'vw'),
          minWidth: getSize(dock.minSize, 'px'),
        }
      : {
          height: getSize(dock.size, 'vh'),
          minHeight: getSize(dock.minSize, 'px'),
        }

    const dockClosedStyle = dock.isOpen ? {} : styles.dockClosed

    const dockStyle: CSSProperties = {
      ...styles.dock,
      ...orientationStyle,
      ...sizeStyle,
      ...dockClosedStyle,
      ...style,
    }

    return dockStyle
  }

  return (
    <div id={id} style={getStyle()}>
      {dock.render()}
    </div>
  )
}

export default Dock
export { Dock }
