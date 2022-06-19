import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SideBarContextProvider } from 'context/sidebar'
import { StylesListContextProvider } from 'context/styleslist'
import { PreviewTextContextProvider } from 'context/previewtext'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [sideBar, setSideBar] = useState(false)
  const toggleSideBar = () => {
    setSideBar(!sideBar)
  }

  const [stylesList, setStylesList] = useState<string[]>([])

  const addStyle = (newStyle: string) => {
    if (!stylesList.includes(newStyle))
      setStylesList((stylesList) => [...stylesList, newStyle])
  }
  const removeStyle = (index: number) => {
    let newArr: string[] = []
    stylesList.forEach((style, styleId) => {
      if (styleId !== index) newArr.push(style)
    })
    setStylesList(newArr)
  }

  const [previewText, setPreviewText] = useState(
    'Almost before we knew it, we had left the ground.'
  )

  return (
    <StylesListContextProvider value={{ stylesList, addStyle, removeStyle }}>
      <SideBarContextProvider value={{ sideBar, toggleSideBar }}>
        <PreviewTextContextProvider value={{ previewText, setPreviewText }}>
          <Component {...pageProps} />
        </PreviewTextContextProvider>
      </SideBarContextProvider>
    </StylesListContextProvider>
  )
}

export default MyApp
