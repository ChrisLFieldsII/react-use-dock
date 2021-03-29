import Head from 'next/head'
import { useEffect } from 'react'
import {
  VStack,
  Button,
  Select,
  FormLabel,
  Box,
  Container,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import styles from '../styles/Home.module.css'

import { Dock, useDock, Orientation, DockContainer } from 'react-use-dock'

const orientations: Orientation[] = ['left', 'bottom', 'right', 'top']

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
    <div className={styles.container}>
      <Head>
        <title>React Use Dock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dock />

      <Container>{!dock.isOpen && <DockControls />}</Container>
    </div>
  )
}

function DockControls() {
  const dock = useDock()

  return (
    <VStack spacing="10" p="3" mt="5" w="full" boxShadow="dark-lg" rounded="md">
      <Button colorScheme="purple" w="full" onClick={dock.toggleDock}>
        Toggle Dock
      </Button>

      <Box w="full">
        <FormLabel>Dock Orientation</FormLabel>
        <Select
          value={dock.orientation}
          onChange={(e) => dock.setOrientation(e.target.value as Orientation)}
        >
          {orientations.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Select>
      </Box>

      <Box w="full">
        <FormLabel>
          Dock Size (
          {['left', 'right'].includes(dock.orientation) ? 'vw' : 'vh'})
        </FormLabel>
        <NumberInput
          value={dock.size}
          min={0}
          max={100}
          onChange={(_, size) => dock.setSize(size)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>

      <Box w="full">
        <FormLabel>Dock Minimum Size (px)</FormLabel>
        <NumberInput
          value={dock.minSize}
          min={350}
          onChange={(_, size) => dock.setMinSize(size)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    </VStack>
  )
}
