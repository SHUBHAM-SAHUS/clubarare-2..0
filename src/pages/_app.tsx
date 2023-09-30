import 'assets/css/main.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-multi-carousel/lib/styles.css'

import { PropsWithChildren, useEffect } from 'react'
import { Provider as ScenifyProvider } from '@layerhub-io/react'
import { Provider as StyletronProvider } from 'styletron-react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import TagManager from 'react-gtm-module'
import { ToastContainer } from 'react-toastify'

import { NavBar } from 'design-systems/Organisms/NavBar'
import { Footer } from 'design-systems/Organisms/Footer'
import { NoFirstRender } from 'design-systems/Atoms/NoFirstRender'
import { AppConfigProps, SEO } from 'design-systems/Organisms/SEO'
import {
  ConnectorProvider,
  GlobalProvider,
  OverlayProvider,
  NFTCreationProvider,
  SpaceProvider,
  Interceptor,
  WagmiProvider,
} from 'context'

const { Server } = require('styletron-engine-atomic')
const engine = new Server()

function Providers({ children }: PropsWithChildren) {
  return (
    <WagmiProvider>
      <ConnectorProvider>
        <GlobalProvider>
          <Interceptor>
            <NFTCreationProvider>
              <SpaceProvider>
                <OverlayProvider>{children}</OverlayProvider>
              </SpaceProvider>
            </NFTCreationProvider>
          </Interceptor>
        </GlobalProvider>
      </ConnectorProvider>
    </WagmiProvider>
  )
}

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const metadata = pageProps?.metadata as AppConfigProps

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-55R8KGB' })
  }, [])

  return (
    <>
      {metadata && <SEO config={metadata} />}
      <ThemeProvider attribute="class">
        <ScenifyProvider>
          <StyletronProvider value={engine}>
            <Providers>
              <NoFirstRender>
                <div className="m-0 min-h-screen overflow-x-hidden p-0">
                  <NavBar />
                  <div className="min-h-[calc(100vh-230px)] w-screen md:min-h-[calc(100vh-159px)] md:pt-16">
                    <Component key={router.asPath} {...pageProps} />
                  </div>
                  <Footer />
                </div>
                <ToastContainer />
              </NoFirstRender>
            </Providers>
          </StyletronProvider>
        </ScenifyProvider>
      </ThemeProvider>
    </>
  )
}

export default App
