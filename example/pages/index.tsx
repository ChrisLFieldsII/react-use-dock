import Head from 'next/head'
import { useEffect } from 'react'
import {
  Container,
  CloseButton,
  Text,
  Center,
  Code,
  Button,
  VStack,
} from '@chakra-ui/react'

import { Dock, useDock, DockContainer } from 'react-use-dock'

import { DockControls } from 'comps'

export default function Home() {
  const dock = useDock()

  const openDock = () => {
    dock.openDock({
      render: () => (
        <DockContainer
          onCloseDock={() => console.log('Closed dock')}
          CloseIcon={<CloseButton />}
        >
          <DockControls />
        </DockContainer>
      ),
    })
  }

  useEffect(() => {
    openDock()
  }, [])

  const onOpen = () => {
    if (dock.persistRender) return

    dock.setRender(() => (
      <DockContainer CloseIcon={<CloseButton />}>
        <Container>
          <Center>
            <VStack>
              <Text>
                Looks like you closed the Dock with{' '}
                <Code>persistRender === false</Code>. This page only calls
                <Code>toggleDock()</Code> which can lead to a blank render in
                the Dock (this example detected the blank render and instead
                showed this message). If you close the Dock and{' '}
                <Code>persistRender === false</Code>, make sure you either use{' '}
                <Code>{`openDock({ render: () => <YourComponent /> })`}</Code>
                or use <Code>{`setRender(() => <YourComponent />)`}</Code> and
                then call <Code>openDock()</Code>.
              </Text>

              <Button colorScheme="purple" w="full" onClick={openDock}>
                Reset
              </Button>
            </VStack>
          </Center>
        </Container>
      </DockContainer>
    ))
  }

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

      {!dock.isOpen && <DockControls onOpen={onOpen} />}
    </Container>
  )
}
