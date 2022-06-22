import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SideBarContextProvider } from 'context/sidebar'
import { StylesListContextProvider } from 'context/styleslist'
import { PreviewTextContextProvider } from 'context/previewtext'
import { KeyWordProvider } from 'context/keyword'
import { useState, useEffect } from 'react'

function useStickyStateSideBar(defaultValue: boolean, key: string) {
  const [value, setValue] = useState(() => {
    const stickyValue =
      typeof window !== 'undefined' ? window.localStorage.getItem(key) : ''
    return stickyValue && stickyValue !== 'undefined'
      ? JSON.parse(stickyValue)
      : defaultValue
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}
function useStickyStateStylesList(defaultValue: string[], key: string) {
  const [value, setValue] = useState(() => {
    const stickyValue =
      typeof window !== 'undefined' ? window.localStorage.getItem(key) : ''
    return stickyValue && stickyValue !== 'undefined'
      ? JSON.parse(stickyValue)
      : defaultValue
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

function MyApp({ Component, pageProps }: AppProps) {
  const [sideBar, setSideBar] = useStickyStateSideBar(
    false,
    'userToggleSideBar'
  )
  const [stylesList, setStylesList] = useStickyStateStylesList(
    [],
    'userSelectStyles'
  )
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
        <title>NextJS Google Fonts</title>
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
