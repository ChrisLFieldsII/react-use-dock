import Head from 'next/head'
import { useEffect } from 'react'
import { Container } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import styles from '../styles/Home.module.css'

import { Dock, useDock, DockContainer } from 'react-use-dock'

import { DockControls } from 'comps'

export default function Home() {
  const dock = useDock()

  useEffect(() => {
    dock.renderDock({
      render: () => (
        <DockContainer
          onCloseDock={() => console.log('Closed dock')}
          CloseIcon={<CloseIcon />}
        >
          <DockControls />
        </DockContainer>
      ),
      isOpen: true,
      minSize: 350,
      orientation: 'right',
      size: 50,
    })
  }, [])

  return (
    <Container
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
    >
      <Head>
        <title>React Use Dock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dock />

      {!dock.isOpen && <DockControls />}
    </Container>
  )
}
