import { useState } from 'react'
import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SideBarContextProvider } from 'context/sidebar'
import { StylesListContextProvider } from 'context/styleslist'
import { PreviewTextContextProvider } from 'context/previewtext'
import { KeyWordContextProvider } from 'context/keyword'
import { FontSizeContextProvider } from 'context/fontsize'
import { useStickyStateStylesList } from 'hooks/stateStylesList'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [stylesList, setStylesList] = useStickyStateStylesList(
    [],
    'userSelectStyles'
  )
  const [fontSize, setFontSize] = useState(40)
  const [sideBar, setSideBar] = useState(stylesList.length !== 0)
  const [isAddedFirstTime, setIsAddedFirstTime] = useState(
    stylesList.length !== 0 ? false : true
  )
  useEffect(() => {
    if (stylesList.length === 1 && isAddedFirstTime) {
      setSideBar(true)
      setIsAddedFirstTime(false)
    }
  }, [stylesList, isAddedFirstTime])
  const [previewText, setPreviewText] = useState(
    'Almost before we knew it, we had left the ground.'
  )
  const [keyWord, setKeyWord] = useState('')
  const toggleSideBar = () => {
    setSideBar(!sideBar)
  }
  const addStyle = (newStyle: string) => {
    if (!stylesList.includes(newStyle))
      setStylesList((stylesList: string[]) => [...stylesList, newStyle])
  }
  const removeStyle = (index: number) => {
    let newArr: string[] = []
    stylesList.forEach((style: string, styleId: number) => {
      if (styleId !== index) newArr.push(style)
    })
    setStylesList(newArr)
  }

  return (
    <>
      <Head>
        <title>Browse Fonts - NextJS Google Fonts</title>
        <link
          rel="icon"
          type="image/png"
          href="/Google-Fonts-Logo-Square.png"
        />
      </Head>
      <StylesListContextProvider value={{ stylesList, addStyle, removeStyle }}>
        <SideBarContextProvider value={{ sideBar, toggleSideBar }}>
          <FontSizeContextProvider value={{ fontSize, setFontSize }}>
            <PreviewTextContextProvider value={{ previewText, setPreviewText }}>
              <KeyWordContextProvider value={{ keyWord, setKeyWord }}>
                <Component {...pageProps} />
              </KeyWordContextProvider>
            </PreviewTextContextProvider>
          </FontSizeContextProvider>
        </SideBarContextProvider>
      </StylesListContextProvider>
    </>
  )
}

export default MyApp
