import { useContext } from 'react'

import DockContext from './context'

export function useDock() {
  const dock = useContext(DockContext)

  return dock
}

export default useDock
