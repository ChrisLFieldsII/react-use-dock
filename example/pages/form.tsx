import { FormEvent, useState, useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Container,
  CloseButton,
  Divider,
  Checkbox,
  VStack,
} from '@chakra-ui/react'
import { useDock, Dock, DockContainer } from 'react-use-dock'
import { DockControls } from 'comps'

const objectives = [
  'get some ice cream!',
  'poop their pants...',
  'binge netflix and chill',
  'you know.',
  'DESTROY ALL HUMANSSS',
]

function FormPage() {
  const dock = useDock()

  const openDock = () => {
    dock.openDock({
      render: () => <DockContent />,
      minSize: 350,
      orientation: 'right',
      size: 50,
    })
  }

  useEffect(() => {
    openDock()
  }, [])

  return (
    <Container
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
    >
      <Dock />

      {!dock.isOpen && <DockControls useToggle={false} onOpen={openDock} />}
    </Container>
  )
}

function DockContent() {
  const [useRandomKey, setUseRandomKey] = useState(false)

  const dock = useDock()

  return (
    <DockContainer
      key={useRandomKey ? Math.random() : '1'}
      CloseIcon={<CloseButton />}
    >
      <SuperHeroForm />

      <Divider />

      <DockControls useToggle={false} onClose={dock.closeDock} />

      <Divider />

      <VStack boxShadow="dark-lg" rounded="md" p="3" my="10">
        <Checkbox
          isChecked={useRandomKey}
          onChange={(e) => setUseRandomKey(e.target.checked)}
        >
          Always use new form (regardless of persistRender setting)
        </Checkbox>
      </VStack>
    </DockContainer>
  )
}

function SuperHeroForm() {
  const [name, setName] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const randomObjective =
      objectives[Math.floor(Math.random() * objectives.length)]

    alert(`${name} is on a critical mission to...${randomObjective}`)
  }

  return (
    <Box boxShadow="dark-lg" rounded="md" p="3" my="5">
      <form onSubmit={onSubmit}>
        <FormControl id="name">
          <FormLabel>Enter your superhero name:</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <Button type="submit" mt="5" colorScheme="purple" disabled={!name}>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default FormPage
