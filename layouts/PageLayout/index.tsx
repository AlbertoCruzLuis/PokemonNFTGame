import { FC, ReactNode } from "react"
import { Background } from "../../components/Background"
import { CustomLink } from "../../components/CustomLink"
import { Footer } from "../../components/Footer"
import { Logo } from "../../components/Logo"
import { Navbar } from "../../components/Navbar"
import { Wallet } from "../../components/Wallet"

type PageLayoutProps = {
  children: ReactNode
}

export const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  const routes = [
    { name: "Home", url: "/" }
  ]

  return (
    <Background>
      <div className="flex flex-col min-h-screen xl:container xl:mx-auto">
        <header className="flex items-center justify-between px-4 py-4 xl:px-8">
          <div className="flex divide-x divide-gray-500">
            <CustomLink className="pr-5" href="/">
              <Logo />
            </CustomLink>
            <div className="pl-5 xs:hidden">
              <Navbar routes={routes} />
            </div>
          </div>
          <Wallet />
        </header>
        <main className="flex flex-col p-4 grow xl:px-8">
          {children}
        </main>
        <footer className="flex justify-center p-4 rounded-t-md">
          <Footer />
        </footer>
      </div>
    </Background>
  )
}
