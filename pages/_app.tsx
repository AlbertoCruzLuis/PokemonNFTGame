import "../styles/globals.css"
import type { AppProps } from "next/app"
import { PageLayout } from "../layouts/PageLayout"
import { ThirdwebWeb3Provider } from "@3rdweb/hooks"
import { Toaster } from "react-hot-toast"
import { CHAIN_ID } from "config"
import NextNProgress from "nextjs-progressbar"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { addNetowrkMetadata, networkMetadata } from "utils/constants"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

// Include what chains you wanna support.
const supportedChainIds = [CHAIN_ID]

// Include what type of wallet you want to support.
// In this case, we support Metamask which is an "injected wallet".
const connectors = {
  injected: {}
}

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient} >
      <ThirdwebWeb3Provider
        connectors={connectors}
        supportedChainIds={supportedChainIds}
        networkMetadata={networkMetadata}
        chainAddConfig={addNetowrkMetadata}
      >
        <Toaster
          position='bottom-center'
          toastOptions={{ duration: 3000 }}
        />
        <NextNProgress />
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ThirdwebWeb3Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
