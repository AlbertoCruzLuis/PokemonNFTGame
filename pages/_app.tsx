import "../styles/globals.css"
import type { AppProps } from "next/app"
import { PageLayout } from "../layouts/PageLayout"
import { ThirdwebWeb3Provider } from "@3rdweb/hooks"
import { Toaster } from "react-hot-toast"
import { RINKEBY_CHAIN_ID } from "config"
import NextNProgress from "nextjs-progressbar"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

// Include what chains you wanna support.
const supportedChainIds = [RINKEBY_CHAIN_ID]

// Include what type of wallet you want to support.
// In this case, we support Metamask which is an "injected wallet".
const connectors = {
  injected: {}
}

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <Toaster
        position='bottom-center'
        toastOptions={{ duration: 3000 }}
      />
      <NextNProgress />
      <QueryClientProvider client={queryClient} >
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </QueryClientProvider>
    </ThirdwebWeb3Provider>
  )
}

export default MyApp
