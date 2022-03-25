import { Balance } from "components/Balance"
import { FC, ReactNode, useState } from "react"
import { Background } from "../../components/Background"
import { CustomLink } from "../../components/CustomLink"
import { Footer } from "../../components/Footer"
import { Logo } from "../../components/Logo"
import { Navbar } from "../../components/Navbar"
import { Wallet } from "../../components/Wallet"
import { HiMenu } from "react-icons/hi"
import Popup from "reactjs-popup"

type PageLayoutProps = {
  children: ReactNode
}

export const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  const routes = [
    { name: "Home", url: "/", isPrivate: false },
    { name: "Dashboard", url: "/dashboard", isPrivate: true },
    { name: "Shop", url: "/shop", isPrivate: true },
    { name: "Emerald Faucet", url: "https://faucet.testnet.oasis.dev/", isPrivate: false }
  ]

  const [isOpen, setOpen] = useState(false)

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <Background>
      <div className="flex flex-col min-h-screen xl:container xl:mx-auto">
        <header className="flex items-center justify-between px-4 py-4 xl:px-8">
          <div className="flex divide-x divide-gray-500">
            <CustomLink className="pr-5" href="/">
              <Logo />
            </CustomLink>
            <div className="pl-5 xs:hidden">
              <Navbar
                routes={routes} />
            </div>
          </div>
          <div className="flex items-center gap-4 xs:hidden">
            <div className="sm:hidden md:hidden">
              <Balance />
            </div>
            <Wallet />
          </div>
          <Popup
            open={isOpen}
            onClose={closeModal}
            trigger={
              <button className="hidden xs:flex">
                <HiMenu color="gray" size={24} />
              </button>
            }
            modal
            overlayStyle={{ marginTop: "60px", backgroundColor: "rgba(23,23,23,0.95)" }} >
            <div className="flex flex-col w-screen h-screen gap-8 place-content-center">
              <div className="flex justify-center gap-8">
                <Balance />
                <Wallet />
              </div>
              <Navbar routes={routes} containerStyle="flex flex-col gap-8 items-center" />
            </div>
          </Popup>
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
