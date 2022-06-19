import React, { useMemo, useState } from 'react'
import type { NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRedo } from '@fortawesome/free-solid-svg-icons'
import { DropdownButton } from '../components/DropdownButton'
import { DropdownButtonString } from '../components/DropdownButtonString'
import { FontCard } from '../components/FontCard'
import { useRouter } from 'next/router'
import useFetchFonts from 'hooks/fetchFonts'
import { Header } from '../components/Header'
import { SideBar } from 'components/SideBar'
import { useSideBarContext } from 'context/sidebarcontext'
import { useStylesListContext } from 'context/styleslistcontext'
import { usePreviewTextContext } from 'context/previewtextcontext'
import { Font } from 'types/schema'
import { PREVIEW } from '../constants/preview-options'
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
  const [previewType, setPreviewType] = useState('Sentence')
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

  const onChangePreviewText = (val: string) => {
    if (val === '')
      setPreviewText('Almost before we knew it, we had left the ground.')
    else setPreviewText(val)
  }

  const { push } = useRouter()

  return (
    <div className="flex items-start">
      <div className="grow">
        <Header
          sideBar={sideBar}
          openSideBar={() => toggleSideBar(!sideBar)}
          hasStyle={stylesList.length !== 0}
        />

        <div className="sticky top-0 bg-white mx-14 my-4 flex divide-x divide-gray-300 border border-gray-300 rounded-full font-light">
          <div className="w-1/2 lg:w-3/12 flex items-center pl-4">
            <label htmlFor="searchInput" className="text-gray-600">
              <FontAwesomeIcon icon={faSearch} />
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
            <DropdownButtonString
              displayValue={previewType}
              options={PREVIEW}
              optionsClick={(val: string) => setPreviewType(val)}
            />
            <input
              id="previewInput"
              placeholder={`Type ${previewType}`}
              autoComplete="off"
              autoCorrect="off"
              className="grow outline-none p-4 placeholder:text-gray-500 focus:placeholder:text-blue-600"
              onChange={({ target: { value: val } }) =>
                onChangePreviewText(val)
              }
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
          <button
            className="w-max p-2.5 px-4 text-gray-600"
            onClick={() => {
              setKeyWord('')
              setPreviewType('Sentence')
              setFontSize(40)
            }}
          >
            <FontAwesomeIcon icon={faRedo} />
          </button>
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
                  push(`/speciment/${font.family}`)
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
