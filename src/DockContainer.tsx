import React, { CSSProperties } from 'react'

import useDock from './useDock'

const noop = () => {}

interface DockContainerProps {
  children: any
  onCloseDock?(): void
}

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

function DockContainer({ children, onCloseDock = noop }: DockContainerProps) {
  const dock = useDock()

  const _onCloseDock = () => {
    dock.closeDock()
    onCloseDock()
  }

  return (
    <div style={styles.dockContainer}>
      <div style={styles.closeRow}>
        <div
          role="button"
          style={{ fontSize: '1.5em', cursor: 'pointer' }}
          onClick={_onCloseDock}
        >
          &times;
        </div>
      </div>

      {children}
    </div>
  )
}

export default DockContainer
