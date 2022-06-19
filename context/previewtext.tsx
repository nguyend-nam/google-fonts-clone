import { createContext } from '@dwarvesf/react-utils'

export const [PreviewTextContextProvider, usePreviewTextContext] =
  createContext<{
    previewText: string
    setPreviewText: (text: string) => void
  }>()
