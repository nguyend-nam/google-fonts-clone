import { createContext } from '@dwarvesf/react-utils'

export const [KeyWordProvider, useKeyWordContext] = createContext<{
  keyWord: string
  setKeyWord: (text: string) => void
}>()
