import { FC, ReactNode } from "react"

type BackgroundProps = {
  children: ReactNode
}

export const Background: FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="bg-gradient-to-b from-neutral-900 via-gray-900 to-neutral-900">
      {children}
    </div>
  )
}
