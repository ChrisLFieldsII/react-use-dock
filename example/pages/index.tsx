import Head from 'next/head'
import { useEffect } from 'react'
import { Container, CloseButton } from '@chakra-ui/react'

import { Dock, useDock, DockContainer } from 'react-use-dock'

import { DockControls } from 'comps'

export default function Home() {
  const dock = useDock()

  useEffect(() => {
    dock.renderDock({
      render: () => (
        <DockContainer
          onCloseDock={() => console.log('Closed dock')}
          CloseIcon={<CloseButton />}
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
