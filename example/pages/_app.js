import '../styles/globals.css'

import { Dock, DockProvider } from 'react-use-dock'

function MyApp({ Component, pageProps }) {
  return (
    <DockProvider>
      <Component {...pageProps} />
    </DockProvider>
  )
}

export default MyApp
