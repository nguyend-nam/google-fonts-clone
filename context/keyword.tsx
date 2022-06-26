import { createContext } from '@dwarvesf/react-utils'

export const [KeyWordContextProvider, useKeyWordContext] = createContext<{
  keyWord: string
  setKeyWord: (text: string) => void
}>()
