import React, { useState } from 'react'
import useFetchFonts from 'hooks/fetchFonts'
import { useRouter } from 'next/router'
import { DropdownButton } from 'components/DropdownButton'
import { FONT_SIZE } from 'constants/fontsize-options'
import { Font } from 'types/schema'
import { StyleCard } from 'components/StyleCard'
import { Header } from 'components/Header'
import { useSideBarContext } from 'context/sidebar'
import { useStylesListContext } from 'context/styleslist'
import { usePreviewTextContext } from 'context/previewtext'
import { SideBar } from 'components/SideBar'
import { getFontWeight } from 'utils/get-font-weight'
import Head from 'next/head'

function fontDataToCSS(data: Font) {
  const fontFacesList: string[] = []

  const { subsets, family, variants, files } = data

  variants.map((variant, index) => {
    const weight = variants[index] === 'regular' ? '400' : variants[index]
    const surl = files[variant]
    // const surl = url.slice(0, 4) + 's' + url.slice(4)

    fontFacesList.push(`
      @font-face {
        font-family: '${family} script=${
      subsets.includes('latin') ? 'latin' : subsets[0]
    } rev=1';
        font-style: ${weight.includes('italic') ? 'italic' : 'normal'};
        font-weight: ${weight.includes('italic') ? weight.slice(0, 3) : weight};
        font-display: block;
        src: url(${surl}) format('woff2');
      }
    `)
  })

  return fontFacesList
}

const FontDetailPage = () => {
  const { query } = useRouter()
  const { data } = useFetchFonts()
  const fontDetails = data?.find(({ family }) => family === query.id)
  const { sideBar, toggleSideBar } = useSideBarContext()
  const { stylesList, removeStyle } = useStylesListContext()
  const { previewText, setPreviewText } = usePreviewTextContext()
  const [fontSize, setFontSize] = useState(64)

  if (!fontDetails) {
    return <div>Loading...</div>
  }

  const onChangePreviewText = (val: string) => {
    if (val === '')
      setPreviewText('Almost before we knew it, we had left the ground.')
    else setPreviewText(val)
  }

  let variantStyles = []
  const fontFaces = fontDataToCSS(fontDetails)

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
        fontCategory: fontDetails.category,
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
        fontCategory: fontDetails.category,
      }
      variantStyles.push(props)
    }
  }

  return (
    <>
      <Head>
        <title>{fontDetails.family} - NextJS Google Fonts</title>
      </Head>
      <div className="flex">
        <div className="grow min-w-full sm:min-w-min">
          <Header
            sideBar={sideBar}
            openSideBar={() => toggleSideBar(!sideBar)}
            hasStyle={stylesList.length !== 0}
          />
          <div className="p-4 sm:p-14 pt-8">
            <div className="sticky top-0 z-30 flex justify-between py-6 bg-white">
              <h1 className="text-4xl">{fontDetails.family}</h1>
            </div>
            <section id="standard-styles">
              <div className="py-10 border-b border-gray-300">
                <h2 className="text-3xl">Styles</h2>
                <div className="block sm:flex mt-10">
                  <div className="relative w-full sm:w-2/3 mr-4">
                    <input
                      type="text"
                      value={previewText}
                      className="p-4 px-8 w-full rounded-full border border-gray-400"
                      onChange={({ target: { value: val } }) =>
                        setPreviewText(val)
                      }
                      onBlur={() => {
                        if (previewText === '')
                          setPreviewText(
                            'Almost before we knew it, we had left the ground.'
                          )
                      }}
                    />
                    <label className="absolute p-0.5 left-8 -top-2.5 bg-white text-gray-500 text-xs">
                      Type here to preview text
                    </label>
                  </div>
                  <div className="w-full sm:w-1/3 mt-4 sm:mt-0 flex items-center pl-2.5 pr-4">
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
                      className="bg-gray-200 form-range h-0.5 ml-4 rounded-full grow outline-none focus:ring-0 focus:shadow-none"
                      onChange={({ target: { value: val } }) =>
                        setFontSize(parseInt(val))
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                {variantStyles.map((variant, index) => (
                  <StyleCard
                    style={fontFaces[index]}
                    key={
                      variant.fontFamily +
                      variant.fontStyle +
                      variant.fontWeight
                    }
                    variant={variant}
                    previewText={previewText}
                    fontSize={variant.fontSize}
                    stylesListElement={[
                      variant.fontFamily
                        .split(' ')
                        .slice(0, -2)
                        .join(' ')
                        .slice(1),
                      getFontWeight(variant.fontWeight),
                      variant.fontWeight,
                      variant.fontStyle === 'italic'
                        ? variant.fontStyle[0].toUpperCase() +
                          variant.fontStyle.slice(1)
                        : '',
                      variant.fontCategory,
                    ].join(' ')}
                    onChange={() => onChangePreviewText}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
        <SideBar
          sideBar={sideBar}
          stylesList={stylesList}
          handleRemoveStyle={removeStyle}
          openSideBar={() => toggleSideBar(!sideBar)}
        />
      </div>
    </>
  )
}

export default FontDetailPage
