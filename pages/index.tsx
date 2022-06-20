import React, { useMemo, useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { DropdownButton } from '../components/DropdownButton'
import { FontCard } from '../components/FontCard'
import { useRouter } from 'next/router'
import useFetchFonts from 'hooks/fetchFonts'
import { Header } from '../components/Header'
import { SideBar } from 'components/SideBar'
import { Button } from 'components/Button'
import { useSideBarContext } from 'context/sidebar'
import { useStylesListContext } from 'context/styleslist'
import { usePreviewTextContext } from 'context/previewtext'
import { Font } from 'types/schema'
import { FONT_SIZE } from '../constants/fontsize-options'
import { CATEGORIES } from 'constants/category'
import { LANGUAGES } from 'constants/language'

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

const Home: NextPage = () => {
  const { data } = useFetchFonts()
  const { sideBar, toggleSideBar } = useSideBarContext()
  const { stylesList, removeStyle } = useStylesListContext()
  const { previewText, setPreviewText } = usePreviewTextContext()
  const [keyWord, setKeyWord] = useState('')
  const [fontSize, setFontSize] = useState(40)
  const [cateList, handleSelectCate] = useState<boolean[]>(
    new Array(CATEGORIES.length).fill(true)
  )
  const [language, setLanguage] = useState('all-languages')

  const handleOnChangeCheckBox = (position: number) => {
    const updatedCheckedState = cateList.map((item: boolean, index: number) =>
      index === position ? !item : item
    )
    handleSelectCate(updatedCheckedState)
  }

  if (previewText === '')
    setPreviewText('Almost before we knew it, we had left the ground.')

  useEffect(() => {
    const iconsStyle = document.createElement('link')
    iconsStyle.setAttribute('rel', 'stylesheet')
    iconsStyle.setAttribute(
      'href',
      'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,600,1,0'
    )
    const iconsStyle1 = document.createElement('link')
    iconsStyle1.setAttribute('rel', 'stylesheet')
    iconsStyle1.setAttribute(
      'href',
      'https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@48,400,0,0'
    )

    document.head.appendChild(iconsStyle)
    document.head.appendChild(iconsStyle1)

    return () => {
      document.head.removeChild(iconsStyle)
    }
  }, [])

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

  const { push } = useRouter()

  return (
    <div className="flex items-start">
      <div className="grow">
        <Header
          sideBar={sideBar}
          openSideBar={() => toggleSideBar(!sideBar)}
          hasStyle={stylesList.length !== 0}
        />

        <div className="sticky z-10 top-0 bg-white mx-14 my-4 flex divide-x border rounded-full font-light">
          <div className="w-1/2 lg:w-3/12 flex items-center pl-4">
            <label
              htmlFor="searchInput"
              className="text-gray-600 flex flex-col justify-center"
            >
              <span className="material-symbols-outlined">search</span>
            </label>
            <input
              id="searchInput"
              placeholder="Search fonts"
              autoComplete="off"
              autoCorrect="off"
              className="outline-none grow p-4 ml-1 placeholder:text-gray-500 focus:placeholder:text-blue-600"
              onChange={({ target: { value: val } }) => setKeyWord(val)}
            />
          </div>
          <div className="w-1/3 grow hidden lg:flex items-center pl-2.5 pr-4">
            <input
              defaultValue={
                previewText ===
                'Almost before we knew it, we had left the ground.'
                  ? ''
                  : previewText
              }
              id="previewInput"
              placeholder={`Type Something`}
              autoComplete="off"
              autoCorrect="off"
              className="grow outline-none p-4 placeholder:text-gray-500 focus:placeholder:text-blue-600"
              onChange={({ target: { value: val } }) => setPreviewText(val)}
            />
          </div>
          <div className="w-3/12 flex grow items-center pl-2.5 pr-4">
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
              className="bg-gray-200 form-range h-0.5 p-0 ml-4 rounded-full grow outline-none focus:ring-0 focus:shadow-none"
              onChange={({ target: { value: val } }) =>
                setFontSize(parseInt(val))
              }
            />
          </div>
          <div className="p-2 flex flex-col justify-center">
            <Button
              icon="redo"
              onClick={() => {
                setKeyWord('')
                setFontSize(40)
                setPreviewText(
                  'Almost before we knew it, we had left the ground.'
                )
                const previewInputVal = document.getElementById(
                  'previewInput'
                ) as HTMLInputElement
                if (previewInputVal !== null) previewInputVal.value = ''
                const searchInputVal = document.getElementById(
                  'searchInput'
                ) as HTMLInputElement
                if (searchInputVal !== null) searchInputVal.value = ''
              }}
              className="h-8 w-8 grid items-center justify-center text-xl rounded-full bg-white text-gray-600 disabled:text-gray-400 hover:bg-gray-50 hover:text-gray-800"
              disabled={
                previewText !==
                  'Almost before we knew it, we had left the ground.' ||
                fontSize !== 40 ||
                keyWord !== ''
                  ? false
                  : true
              }
            />
          </div>
        </div>

        <div className="p-2 px-14 flex">
          <h3 className="mr-4 text-blue-600">Categories</h3>
          {CATEGORIES.map((name, index) => (
            <div key={index} className="flex items-center mr-4">
              <input
                className="mr-1"
                type="checkbox"
                id={`checkbox-${index}`}
                name={name}
                value={name}
                checked={cateList[index]}
                onChange={() => handleOnChangeCheckBox(index)}
              />
              <label htmlFor={`checkbox-${index}`}>{formatText(name)}</label>
            </div>
          ))}
        </div>

        <div className="p-2 pb-10 px-14 flex">
          <h3 className="mr-4 text-blue-600">Languages</h3>
          <select
            defaultValue={language}
            onChange={({ target: { value: val } }) => setLanguage(val)}
          >
            {LANGUAGES.map((name, index) => (
              <option
                key={index}
                className="flex items-center mr-4"
                id={`checkbox-${index}`}
                value={name}
              >
                {formatText(name)}
              </option>
            ))}
          </select>
        </div>

        <div className="px-14 mb-2 text-xs text-gray-500">
          {renderFontCard.length} families
        </div>

        <div className="px-14 mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
      <SideBar
        sideBar={sideBar}
        stylesList={stylesList}
        handleRemoveStyle={removeStyle}
      />
    </div>
  )
}

export default Home
