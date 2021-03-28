import React, { CSSProperties, ReactNode } from 'react'

import useDock from './useDock'

const noop = () => {}

const styles: { [key: string]: CSSProperties } = {
  dockContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2em',
  },
  closeRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}
interface DockContainerProps {
  children: any
  onCloseDock?(): void
  CloseIcon?: ReactNode
}

const DefaultCloseIcon = <span style={{ fontSize: '1.5em' }}>&times;</span>

function DockContainer({
  children,
  CloseIcon = DefaultCloseIcon,
  onCloseDock = noop,
}: DockContainerProps) {
  const dock = useDock()

  const _onCloseDock = () => {
    dock.closeDock()
    onCloseDock()
  }

  return (
    <div style={styles.dockContainer}>
      <div style={styles.closeRow}>
        <div role="button" style={{ cursor: 'pointer' }} onClick={_onCloseDock}>
          {CloseIcon}
        </div>
      </div>

      {children}
    </div>
  )
}

export default DockContainer
