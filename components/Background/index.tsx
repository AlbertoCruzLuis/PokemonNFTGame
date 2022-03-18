import { FC, ReactNode } from "react"

type BackgroundProps = {
  children: ReactNode
}

export const Background: FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="bg-neutral-900">
      {children}
    </div>
  )
}
