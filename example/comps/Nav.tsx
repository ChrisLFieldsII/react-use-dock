import Link from 'next/link'
import {
  VStack,
  Box,
  Divider,
  Link as ChakraLink,
  Heading,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'

const links = [
  {
    to: '/',
    text: 'Home',
  },
  {
    to: '/form',
    text: 'Form',
  },
]

function Nav() {
  return (
    <Box as="nav" boxShadow="dark-lg" rounded="md" p="3" w="full">
      <Heading as="h2" size="xl">
        Nav
      </Heading>
      <Divider />
      <UnorderedList>
        {links.map((link) => (
          <ListItem>
            <Link href={link.to}>
              <Box w="full">
                <ChakraLink color="blue" w="full">
                  {link.text}
                </ChakraLink>
                <Divider />
              </Box>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default Nav
