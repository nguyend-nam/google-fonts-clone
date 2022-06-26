import React, { useMemo, useState, useRef, useEffect } from 'react'
import { DropdownButton } from 'components/DropdownButton'
import { FontCard } from 'components/FontCard'
import { useRouter } from 'next/router'
import useFetchFonts from 'hooks/fetchFonts'
import { Header } from 'components/Header'
import { SideBar } from 'components/SideBar'
import { Button } from 'components/Button'
import { useSideBarContext } from 'context/sidebar'
import { useStylesListContext } from 'context/styleslist'
import { usePreviewTextContext } from 'context/previewtext'
import { useKeyWordContext } from 'context/keyword'
import { useFontSizeContext } from 'context/fontsize'
import { Font } from 'types/schema'
import { FONT_SIZE } from 'constants/fontsize-options'
import { CATEGORIES } from 'constants/category'
import { LANGUAGES } from 'constants/language'
import cx from 'classnames'

function formatText(str: string) {
  let ans = str.replace(/-/g, ' ')
  const arr = ans.split(' ')

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 'ext') arr[i] = 'extended'
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  const newstr = arr.join(' ')
  return newstr
}

const Home = () => {
  const router = useRouter()
  const query = router.query
  const { data } = useFetchFonts()
  const { sideBar, toggleSideBar } = useSideBarContext() // SideBar context
  const { stylesList, removeStyle } = useStylesListContext() // StylesList context
  const { previewText, setPreviewText } = usePreviewTextContext() // PreviewText context
  const { keyWord, setKeyWord } = useKeyWordContext() // keyWord context
  const { fontSize, setFontSize } = useFontSizeContext() // fontSize state
  const { push } = useRouter() // push route
  const [language, setLanguage] = useState('all-languages') // language filter
  const [cateList, handleSelectCate] = useState<boolean[]>( // category filter
    new Array(CATEGORIES.length).fill(true)
  )
  const [isSSR, setIsSSR] = useState(true)
  const searchInputRef = useRef<HTMLInputElement>(null) // searchInput ref
  const previewInputRef = useRef<HTMLInputElement>(null) // sreviewInput ref
  const [scrollPosition, setSrollPosition] = useState(0) // viewport position state
  const [showGoTop, setshowGoTop] = useState('goTopHidden') // show/hide state of To Top button
  const topRef = useRef<HTMLDivElement>(null) // top component ref

  // Handle subset URL query
  useEffect(() => {
    if (query.subset && typeof query.subset === 'string') {
      if (
        LANGUAGES.includes(query.subset) &&
        query.subset !== 'all-languages'
      ) {
        setLanguage(query.subset)
      }
    }
  }, [query.subset, push])

  // Handle server-side rendering
  useEffect(() => {
    setIsSSR(false)
  }, [])

  // Handle category filter checkboxes
  const handleOnChangeCheckBox = (position: number) => {
    const updatedCheckedState = cateList.map((item: boolean, index: number) =>
      index === position ? !item : item
    )
    handleSelectCate(updatedCheckedState)
  }

  // Show/hide To Top button & Scroll to top behavior
  const handleVisibleButton = () => {
    const position = window.pageYOffset
    setSrollPosition(position)

    if (scrollPosition >= 81) {
      return setshowGoTop('goTop')
    } else if (scrollPosition < 81) {
      return setshowGoTop('goTopHidden')
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton)
  })
  const scrollToTop = () => {
    topRef.current?.scrollIntoView()
  }

  // Default search values
  const isDefault =
    previewText === 'Almost before we knew it, we had left the ground.' &&
    fontSize === 40 &&
    keyWord === ''

  if (previewText === '')
    setPreviewText('Almost before we knew it, we had left the ground.')

  // Choose fonts to render base on filter
  const renderFontCard = useMemo(() => {
    const fontCard: Font[] = []
    data?.slice(0, 50).forEach((font) => {
      if (font.family.toLowerCase().includes(keyWord.toLowerCase())) {
        if (cateList[CATEGORIES.indexOf(font.category)]) {
          if (language === 'all-languages') fontCard.push(font)
          else if (font.subsets.includes(language)) fontCard.push(font)
        }
      }
    })
    return fontCard
  }, [data, keyWord, cateList, language])

  return (
    !isSSR && (
      <div className="flex">
        <div className="grow" ref={topRef}>
          <Header
            sideBar={sideBar}
            openSideBar={() => toggleSideBar(!sideBar)}
            hasStyle={stylesList.length !== 0}
          />
          <div
            className={cx(
              'sticky z-10 top-0 bg-white mx-4 sm:mx-14 my-4 flex divide-x divide-gray-300 border border-gray-300 rounded-full',
              {
                'rounded-none mx-0 sm:mx-0 px-4 sm:px-14 shadow-md box-border w-screen sm:w-full border-0':
                  scrollPosition >= 81,
              }
            )}
          >
            <div className="w-full lg:w-3/12 min-w-max flex items-center pl-3">
              <label
                htmlFor="searchInput"
                className="text-gray-600 flex flex-col justify-center"
              >
                <span className="material-symbols-sharp">search</span>
              </label>
              <input
                ref={searchInputRef}
                id="searchInput"
                placeholder="Search fonts"
                autoComplete="off"
                autoCorrect="off"
                value={keyWord}
                className="outline-none grow p-4 placeholder:text-gray-500 focus:placeholder:text-blue-600 font-light"
                onChange={({ target: { value: val } }) => setKeyWord(val)}
              />
              <Button
                icon="cross"
                onClick={() => {
                  setKeyWord('')
                  if (searchInputRef.current !== null)
                    searchInputRef.current.value = ''
                }}
                className={cx(
                  'hidden sm:grid mr-1 h-9 w-9 items-center justify-center text-xl rounded-full bg-white text-gray-600 disabled:text-gray-400 hover:bg-gray-50 hover:text-gray-800',
                  {
                    'hidden sm:hidden': keyWord === '',
                    'block sm:block': keyWord !== '',
                  }
                )}
              />
            </div>
            <div className="w-1/3 grow hidden lg:flex items-center">
              <input
                defaultValue={
                  previewText ===
                  'Almost before we knew it, we had left the ground.'
                    ? ''
                    : previewText
                }
                ref={previewInputRef}
                placeholder={`Type Something`}
                autoComplete="off"
                autoCorrect="off"
                className="grow outline-none p-4 placeholder:text-gray-500 focus:placeholder:text-blue-600 font-light"
                onChange={({ target: { value: val } }) => setPreviewText(val)}
              />
            </div>
            <div className="w-3/12 hidden lg:flex grow items-center px-2.5">
              <DropdownButton
                displayValue={fontSize}
                options={FONT_SIZE}
                optionsClick={(val: number) => setFontSize(val)}
              />
              <input
                type="range"
                min="8"
                max="300"
                value={fontSize}
                id="sizeInput"
                className="bg-gray-200 form-range h-0.5 mx-4 rounded-full grow outline-none focus:ring-0 focus:shadow-none"
                onChange={({ target: { value: val } }) =>
                  setFontSize(parseInt(val))
                }
              />
            </div>
            <div className="p-2 flex items-center">
              <Button
                icon="redo"
                onClick={() => {
                  setKeyWord('')
                  setFontSize(40)
                  setPreviewText(
                    'Almost before we knew it, we had left the ground.'
                  )
                  if (searchInputRef.current !== null)
                    searchInputRef.current.value = ''
                  if (previewInputRef.current !== null)
                    previewInputRef.current.value = ''
                }}
                className="h-9 w-9 grid items-center justify-center text-xl rounded-full bg-white text-gray-600 disabled:text-gray-400 hover:bg-gray-50 hover:text-gray-800"
                disabled={isDefault}
              />
              <Button
                icon="family"
                onClick={() => toggleSideBar(!sideBar)}
                className={cx(
                  'relative h-12 w-12 ml-2 grid items-center justify-center rounded-full bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800',
                  {
                    hidden: scrollPosition < 81,
                  },
                  {
                    'after:content-["●"] after:absolute after:top-0.5 after:right-1.5 after:text-[8px] after:text-red-600':
                      stylesList.length !== 0,
                  },
                  {
                    'text-blue-600': sideBar,
                  }
                )}
              />
            </div>
          </div>

          <div className="p-2 px-4 sm:px-14 flex items-center w-screen sm:w-max">
            <h3 className="mr-4 text-blue-600">Categories</h3>
            <div className="flex items-center w-screen sm:w-max overflow-auto font-light">
              {CATEGORIES.map((name, index) => (
                <div key={name} className="flex items-center mr-4">
                  <input
                    className="mr-1"
                    type="checkbox"
                    id={`checkbox-${name}`}
                    name={name}
                    value={name}
                    checked={cateList[index]}
                    onChange={() => handleOnChangeCheckBox(index)}
                  />
                  <label
                    className="whitespace-nowrap"
                    htmlFor={`checkbox-${name}`}
                  >
                    {formatText(name)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="p-2 pb-12 px-4 sm:px-14 flex items-center">
            <h3 className="mr-4 text-blue-600">Languages</h3>
            <select
              className="rounded-full border border-gray-300 p-2 w-36 text-sm hover:bg-gray-50 hover:text-blue-600"
              value={
                query.subset &&
                typeof query.subset === 'string' &&
                LANGUAGES.includes(query.subset)
                  ? query.subset
                  : language
              }
              onChange={({ target: { value: val } }) => {
                setLanguage(val)
                push(val === 'all-languages' ? `/` : `/?subset=${val}`)
              }}
            >
              {LANGUAGES.map((name) => (
                <option
                  key={name}
                  className="flex items-center mr-4 font-light"
                  id={`checkbox-${name}`}
                  value={name}
                >
                  {formatText(name)}
                </option>
              ))}
            </select>
          </div>

          <div className="px-4 sm:px-14 mb-4 text-xs text-gray-500">
            {renderFontCard.length} of 50 families
          </div>

          <div className="px-4 sm:px-14 mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderFontCard.map((font) => (
              <div key={font.family}>
                <FontCard
                  key={font.family}
                  data={font}
                  previewText={previewText}
                  fontSize={fontSize}
                  onClick={(font) => {
                    push(`/specimen/${font.family}`)
                  }}
                />
              </div>
            ))}
          </div>
          <button
            className={cx(
              'sticky z-10 float-right bottom-10 mr-10 text-gray-500 bg-white rounded-full h-14 w-14 grid items-center justify-center drop-shadow-md',
              {
                hidden: showGoTop === 'goTopHidden',
              }
            )}
            onClick={() => {
              scrollToTop()
              setTimeout(() => {
                setshowGoTop('goTopHidden')
              }, 50)
            }}
          >
            <span className="material-symbols-outlined">arrow_upward</span>
          </button>
        </div>
        <SideBar
          sideBar={sideBar}
          stylesList={stylesList}
          handleRemoveStyle={removeStyle}
          openSideBar={() => toggleSideBar(!sideBar)}
        />
      </div>
    )
  )
}

export default Home
