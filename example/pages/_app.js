import { DockProvider } from 'react-use-dock'
import { ChakraProvider } from '@chakra-ui/react'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <DockProvider>
        <Component {...pageProps} />
      </DockProvider>
    </ChakraProvider>
  )
}

export default MyApp
