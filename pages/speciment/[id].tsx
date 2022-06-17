import React, { useState } from 'react'
import useFetchFonts from 'hooks/fetchFonts'
import { useRouter } from 'next/router'
import { DropdownButton } from 'components/DropdownButton'
import { FONT_SIZE } from 'constants/fontsize-options'
import { Font } from 'types/schema'
import { StyleCard } from 'components/StyleCard'
import { Header } from 'components/Header'
import { useSideBarContext } from 'context/sidebarcontext'
import { useStylesListContext } from 'context/styleslistcontext'
import { SideBar } from 'components/SideBar'

function fontDataToCSS(data: Font) {
  const { subsets, family, variants, files } = data
  const weight = variants.includes('regular') ? 'regular' : variants[0]
  const url = files[weight]

  return `
  @font-face {
    font-family: '${family} script=${
    subsets.includes('latin') ? 'latin' : subsets[0]
  } rev=1';
    font-style: normal;
    font-weight: ${weight};
    font-display: block;
    src: url(${url}) format('woff2');
  }
  `
}

const FontDetailPage = () => {
  const { query } = useRouter()
  const { data } = useFetchFonts()
  const fontDetails = data?.find(({ family }) => family === query.id)
  const { sideBar, toggleSideBar } = useSideBarContext()
  const { stylesList, addStyle, removeStyle } = useStylesListContext()
  const [fontSize, setFontSize] = useState(64)
  const [previewText, setPreviewText] = useState(
    'Almost before we knew it, we had left the ground.'
  )

  let variantStyles = []
  const openSideBar = () => {
    toggleSideBar(sideBar)
  }

  const handleAddStyle = (newStyle: string) => {
    addStyle(newStyle)
  }

  const handleRemoveStyle = (index: number) => {
    removeStyle(index)
  }

  if (!fontDetails) {
    return <div>Loading...</div>
  }

  const style = document.createElement('style')
  style.id = `google-font-${fontDetails.family
    .replace(/\s+/g, '-')
    .toLowerCase()}`
  style.innerHTML = fontDataToCSS(fontDetails)

  document.head.appendChild(style)

  const { subsets, family } = fontDetails
  for (let i = 0; i < fontDetails.variants.length; i++) {
    if (fontDetails.variants[i].includes('italic')) {
      const props = {
        fontFamily: `"${family} script=${
          subsets.includes('latin') ? 'latin' : subsets[0]
        } rev=1"`,
        fontWeight: `${
          fontDetails.variants[i].slice(0, 3) === 'ita'
            ? '400'
            : fontDetails.variants[i].slice(0, 3)
        }`,
        fontStyle: `italic`,
        fontStretch: `normal`,
        lineHeight: `initial`,
        fontSize: fontSize,
      }
      variantStyles.push(props)
    } else {
      const props = {
        fontFamily: `"${family} script=${
          subsets.includes('latin') ? 'latin' : subsets[0]
        } rev=1"`,
        fontWeight: `${
          fontDetails.variants[i] === 'regular'
            ? '400'
            : fontDetails.variants[i]
        }`,
        fontStyle: `regular`,
        fontStretch: `normal`,
        lineHeight: `initial`,
        fontSize: fontSize,
      }
      variantStyles.push(props)
    }
  }

  return (
    <div className="flex">
      <div className="grow">
        <Header
          sideBar={sideBar}
          openSideBar={openSideBar}
          hasStyle={stylesList.length !== 0}
        />
        <div className="p-14 pt-8">
          <div className="sticky top-0 z-10 flex justify-between py-6 bg-white">
            <h1 className="text-4xl">{fontDetails.family}</h1>
          </div>
          <section id="standard-styles">
            <div className="py-10 border-b border-gray-300">
              <h2 className="text-3xl">Styles</h2>
              <div className="flex mt-10">
                <div className="relative w-2/3 mr-4">
                  <input
                    type="text"
                    value={previewText}
                    className="p-4 px-8 w-full rounded-full border border-gray-400"
                    onChange={({ target: { value: val } }) =>
                      setPreviewText(val)
                    }
                  />
                  <label className="absolute p-0.5 left-8 -top-2.5 bg-white text-gray-500 text-xs">
                    Type here to preview text
                  </label>
                </div>
                <div className="w-1/3 flex items-center pl-2.5 pr-4">
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
              </div>
            </div>
            <div>
              {variantStyles.map((variant) => (
                <StyleCard
                  key={
                    variant.fontFamily + variant.fontStyle + variant.fontWeight
                  }
                  variant={variant}
                  previewText={previewText}
                  onClick={() =>
                    handleAddStyle(
                      variant.fontFamily
                        .split(' ')
                        .slice(0, -2)
                        .join(' ')
                        .slice(1) +
                        ' ' +
                        (variant.fontWeight === '100'
                          ? 'Thin'
                          : variant.fontWeight === '200'
                          ? 'ExtraLight'
                          : variant.fontWeight === '300'
                          ? 'Light'
                          : variant.fontWeight === '400'
                          ? 'Regular'
                          : variant.fontWeight === '500'
                          ? 'Medium'
                          : variant.fontWeight === '600'
                          ? 'SemiBold'
                          : variant.fontWeight === '700'
                          ? 'Bold'
                          : variant.fontWeight === '800'
                          ? 'ExtraBold'
                          : 'Black') +
                        ' ' +
                        variant.fontWeight +
                        ' ' +
                        (variant.fontStyle === 'italic'
                          ? variant.fontStyle[0].toUpperCase() +
                            variant.fontStyle.slice(1)
                          : '')
                    )
                  }
                  onChange={() => setPreviewText}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
      <SideBar
        sideBar={sideBar}
        stylesList={stylesList}
        handleRemoveStyle={handleRemoveStyle}
      />
    </div>
  )
}

export default FontDetailPage
