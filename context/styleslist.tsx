import { createContext } from '@dwarvesf/react-utils'

export const [StylesListContextProvider, useStylesListContext] = createContext<{
  stylesList: string[]
  addStyle: (newStyle: string) => void
  removeStyle: (index: number) => void
}>()
