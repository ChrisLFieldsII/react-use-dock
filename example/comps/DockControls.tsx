import {
  VStack,
  Button,
  Select,
  FormLabel,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  Flex,
} from '@chakra-ui/react'
import { useDock, Orientation } from 'react-use-dock'

const noop = () => {}

const orientations: Orientation[] = ['left', 'bottom', 'right', 'top']

interface DockControlsProps {
  onOpen?: () => void
  onClose?: () => void
  useToggle?: boolean
}

function DockControls({
  onOpen = noop,
  onClose = noop,
  useToggle = true,
}: DockControlsProps) {
  const dock = useDock()

  const onClickToggle = () => {
    const newIsOpen = !dock.isOpen

    if (newIsOpen) onOpen()
    else onClose()

    if (useToggle) dock.toggleDock()
  }

  return (
    <VStack spacing="10" p="3" mt="5" w="full" boxShadow="dark-lg" rounded="md">
      <Button colorScheme="purple" w="full" onClick={onClickToggle}>
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

      <Flex w="full" justifyContent="flex-start">
        <Checkbox
          isChecked={dock.persistRender}
          onChange={(e) => dock.setPersistRender(e.target.checked)}
        >
          Persist Render
        </Checkbox>
      </Flex>
    </VStack>
  )
}

export default DockControls
