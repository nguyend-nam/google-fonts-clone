import { createContext } from '@dwarvesf/react-utils'

export const [SideBarContextProvider, useSideBarContext] = createContext<{
  sideBar: boolean
  toggleSideBar: (sideBar: boolean) => void
}>()
