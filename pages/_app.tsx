import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SideBarContextProvider } from 'context/sidebarcontext'
import { StylesListContextProvider } from 'context/styleslistcontext'
import { useState, useEffect } from 'react'

function useStickyState(defaultValue: string[], key: string) {
  const [value, setValue] = useState(() => {
    const stickyValue =
      typeof window !== 'undefined' ? window.localStorage.getItem(key) : ''
    return stickyValue ? JSON.parse(stickyValue) : defaultValue
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}
function useStickyStateSideBar(defaultValue: boolean, key: string) {
  const [value, setValue] = useState(() => {
    const stickyValue =
      typeof window !== 'undefined' ? window.localStorage.getItem(key) : ''
    return stickyValue ? JSON.parse(stickyValue) : defaultValue
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
  const toggleSideBar = () => {
    setSideBar(!sideBar)
  }

  const [stylesList, setStylesList] = useStickyState([], 'userSelectedFonts')

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
    <StylesListContextProvider value={{ stylesList, addStyle, removeStyle }}>
      <SideBarContextProvider value={{ sideBar, toggleSideBar }}>
        <Component {...pageProps} />
      </SideBarContextProvider>
    </StylesListContextProvider>
  )
}

export default MyApp
