import Head from 'next/head'
import { useEffect } from 'react'

import styles from '../styles/Home.module.css'

import { Dock, useDock, Orientation } from 'react-use-dock'

const orientations: Orientation[] = ['left', 'bottom', 'right', 'top']

export default function Home() {
  const dock = useDock()

  useEffect(() => {
    dock.renderDock({
      render: () => <h1>Dock Content</h1>,
      isOpen: true,
      minSize: 350,
      orientation: 'right',
      size: 50,
    })
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>React Use Dock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{ zIndex: 1000000, display: 'flex', flexDirection: 'column' }}
      >
        <button onClick={dock.toggleDock}>Toggle Dock</button>
        <select
          value={dock.orientation}
          onChange={(e) => dock.setOrientation(e.target.value as Orientation)}
        >
          {orientations.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <Dock />
    </div>
  )
}
