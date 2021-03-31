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

function Form() {
  const dock = useDock()

  useEffect(() => {
    dock.renderDock({
      render: () => (
        <DockContainer
          onCloseDock={() => console.log('Closed dock')}
          CloseIcon={<CloseButton />}
        >
          <SuperHeroForm />
          <Divider />
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
      <Dock />

      {!dock.isOpen && <DockControls />}
    </Container>
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

        <Button type="submit" mt="5" colorScheme="purple">
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default Form
