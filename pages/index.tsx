import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRedo } from '@fortawesome/free-solid-svg-icons'
import { PREVIEW } from '../constants/preview-options'
import { FONT_SIZE } from '../constants/fontsize-options'
import { Button } from '../components/Button'
import { DropdownButton } from '../components/DropdownButton'
import { DropdownButtonString } from '../components/DropdownButtonString'
import { FontCard } from '../components/FontCard'
import { Font } from 'types/schema'

const Home: NextPage = () => {
  const [fonts, setFonts] = useState<Font[]>([])
  const [sideBar, toggleSideBar] = useState(false)
  const [preview, setPreview] = useState('Sentence')
  const [fontSize, setFontSize] = useState(40)

  const openSideBar = () => {
    toggleSideBar(!sideBar)
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDUIf6phYGeXaLPM3u0ffq1p6Q7B9nmpr0'
      )
      const data = (await response.json()) as { items: Font[] }
      const fontsData = data.items
      setFonts(fontsData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
    @font-face {
      font-family: 'Nuosu SIL script=latin rev=1';
      font-style: normal;
      font-weight: 400;
      font-display: block;
      src: url(https://fonts.gstatic.com/l/font?kit=8vIK7wM3wmRn_kc4uAjeEWxdO_3C7D6IQ8ukaiI9CMO9OyN_kBHy6Q6lbi4&skey=d5abc6cd0675e9e8&v=v1) format('woff2');
    }
    `

    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="flex items-start">
      <div className="grow">
        <header className="grow p-2 px-14 border border-t-0 border-x-0 border-b-1 border-b-gray-300 flex justify-between items-center">
          <button className="flex items-center">
            <Image
              src="/../public/Google-Fonts-Logo.png"
              alt="Google fonts logo"
              width={45}
              height={25}
            />
            <h1 className="text-gray-600 font-light text-2xl ml-2">
              <span className="font-medium">Google</span> Fonts
            </h1>
          </button>
          <nav>
            <Button icon="theme" className="mr-7 rotate-22.5" />
            <Button
              icon="family"
              onClick={openSideBar}
              className={sideBar ? 'text-blue-500' : 'text-gray-500'}
            />
          </nav>
        </header>

        <div className="mx-16 my-4 flex divide-x divide-gray-300 border border-gray-300 rounded-full font-light">
          <div className="w-3/12 flex items-center pl-4">
            <label htmlFor="searchInput" className="text-gray-600">
              <FontAwesomeIcon icon={faSearch} />
            </label>
            <input
              id="searchInput"
              placeholder="Search fonts"
              autoComplete="off"
              autoCorrect="off"
              className="outline-none grow p-4 ml-1 placeholder:text-gray-500 focus:placeholder:text-blue-600"
            />
          </div>
          <div className="w-1/3 grow flex items-center pl-2.5 pr-4">
            <DropdownButtonString
              displayValue={preview}
              options={PREVIEW}
              optionsClick={(val: string) => setPreview(val)}
            />
            <input
              id="previewInput"
              placeholder={`Type ${preview}`}
              autoComplete="off"
              autoCorrect="off"
              className="grow outline-none p-4 placeholder:text-gray-500 focus:placeholder:text-blue-600"
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
          <button className="w-max p-2.5 px-4 text-gray-600">
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </div>
        <div className="container mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fonts.slice(0, 20).map((font) => (
            <FontCard
              key={font.family}
              data={font}
              fontSize={fontSize}
              onClick={(font) => {
                alert(`You clicked on "${font.family}"`)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
