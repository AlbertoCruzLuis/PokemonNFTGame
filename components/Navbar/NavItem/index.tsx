import { FC } from "react"
import { CustomLink } from "../../CustomLink"
import toast from "react-hot-toast"
import { useAuth } from "hooks/useAuth"

type NavItemProps = {
  name: string,
  url: string,
  isActive: boolean,
  isPrivate: boolean,
  activeStyle?: string,
  disableStyle?: string
}

export const NavItem: FC<NavItemProps> = ({ name, url, isActive, isPrivate, activeStyle = "border-b-2", disableStyle = "" }) => {
  const divStyle = isActive ? `${activeStyle} border-solid border-white` : `${disableStyle}`
  const linkStyle = isActive ? "text-white" : "text-gray-400"

  const { auth } = useAuth(isPrivate)

  const handleAuth = () => {
    toast.error("Log In with your metamask for access to this page")
  }

  return (
    <div className={divStyle}>
      { auth &&
        <CustomLink href={url} className={linkStyle}>
          <span>{name}</span>
        </CustomLink>
      }
      { !auth &&
        <button className={linkStyle} onClick={handleAuth} >
          <span>{name}</span>
        </button>
      }
    </div>
  )
}
