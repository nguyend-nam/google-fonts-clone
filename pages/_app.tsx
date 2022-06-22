import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SideBarContextProvider } from 'context/sidebar'
import { StylesListContextProvider } from 'context/styleslist'
import { PreviewTextContextProvider } from 'context/previewtext'
import { KeyWordProvider } from 'context/keyword'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [sideBar, setSideBar] = useState(false)
  const [stylesList, setStylesList] = useState<string[]>([])
  const [previewText, setPreviewText] = useState(
    'Almost before we knew it, we had left the ground.'
  )
  const [keyWord, setKeyWord] = useState('')
  const toggleSideBar = () => {
    setSideBar(!sideBar)
  }
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

  return (
    <>
      <Head>
        <title>Google Fonts Clone</title>
      </Head>
      <StylesListContextProvider value={{ stylesList, addStyle, removeStyle }}>
        <SideBarContextProvider value={{ sideBar, toggleSideBar }}>
          <PreviewTextContextProvider value={{ previewText, setPreviewText }}>
            <KeyWordProvider value={{ keyWord, setKeyWord }}>
              <Component {...pageProps} />
            </KeyWordProvider>
          </PreviewTextContextProvider>
        </SideBarContextProvider>
      </StylesListContextProvider>
    </>
  )
}

export default MyApp
