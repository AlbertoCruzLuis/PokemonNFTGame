import { Html, Head, Main, NextScript } from "next/document"

export default function Document () {
  return (
    <Html>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <meta name="title" content="PokemonNFT Game" />
        <meta name="description" content="PokemonNFT started as Buildspace Project - 'Create your own mini turn-based NFT browser game' - ROSE Emerald Paratime Testnet" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pokemonnft.vercel.app" />
        <meta property="og:title" content="PokemonNFT Game" />
        <meta property="og:description" content="PokemonNFT started as Buildspace Project - 'Create your own mini turn-based NFT browser game' - ROSE Emerald Paratime Testnet" />
        <meta property="og:image" content="https://pokemonnft.vercel.app/assets/LandingPage.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pokemonnft.vercel.app" />
        <meta property="twitter:title" content="PokemonNFT Game" />
        <meta property="twitter:description" content="PokemonNFT started as Buildspace Project - 'Create your own mini turn-based NFT browser game' - ROSE Emerald Paratime Testnet" />
        <meta property="twitter:image" content="https://pokemonnft.vercel.app/assets/LandingPage.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
