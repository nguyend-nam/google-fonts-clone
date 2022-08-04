import { createContext } from '@dwarvesf/react-utils'

export const [FontSizeContextProvider, useFontSizeContext] = createContext<{
  fontSize: number
  setFontSize: (size: number) => void
}>()
