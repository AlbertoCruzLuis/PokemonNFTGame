import { NavItem } from "./NavItem"
import { useRouter } from "next/router"
import { v4 as uuidv4 } from "uuid"
import { FC } from "react"

type NavbarProps = {
  routes: Array<{ name: string, url: string, isPrivate: boolean }>,
  containerStyle?: string
}

export const Navbar: FC<NavbarProps> = ({ routes, containerStyle = "flex gap-6", ...rest }) => {
  const router = useRouter()

  const isActiveRoute = (route: string) => {
    return router.asPath === route
  }

  return (
    <div className={`${containerStyle}`}>
      {routes && routes.map(({ name, url, isPrivate }) => (
        <NavItem key={uuidv4()} name={name} url={url} isPrivate={isPrivate} isActive={isActiveRoute(url)} {...rest} />
      ))}
    </div>
  )
}
