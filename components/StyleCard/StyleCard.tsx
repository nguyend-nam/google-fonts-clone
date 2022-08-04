import cx from 'classnames'
import { useStylesListContext } from 'context/styleslist'
import { getFontWeight } from 'utils/get-font-weight'
import { useEffect } from 'react'

interface StyleProps {
  style: string
  variant: variant
  previewText: string
  fontSize: number
  stylesListElement: string
  onChange?: () => void
}

type variant = {
  fontFamily: string
  fontWeight: string
  fontStyle: string
  fontStretch: string
  lineHeight: string
  fontSize: number
}

export function StyleCard(props: StyleProps) {
  const { style, variant, previewText, stylesListElement, onChange } = props
  const { stylesList, addStyle, removeStyle } = useStylesListContext()
  const isAdded = stylesList.includes(stylesListElement)

  useEffect(() => {
    const style1 = document.createElement('style')
    style1.id = `google-font-${variant.fontFamily
      .split(' ')
      .slice(0, -2)
      .join(' ')
      .slice(1)
      .replace(/\s+/g, '-')
      .toLowerCase()}`
    style1.innerHTML = style

    document.head.appendChild(style1)
    return () => {
      document.head.removeChild(style1)
    }
  }, [style, variant.fontFamily])

  return (
    <div
      key={variant.fontFamily}
      className="grid grid-cols-[minmax(0,_1fr)_180px] auto-cols-auto p-4 border-b border-gray-300"
    >
      <div className="relative after:absolute after:w-20 after:h-full after:top-0 after:right-0 after:bg-gradient-to-l after:from-white">
        <div className="text-sm text-gray-600">
          {[
            getFontWeight(variant.fontWeight),
            variant.fontWeight,
            variant.fontStyle === 'italic'
              ? variant.fontStyle[0].toUpperCase() + variant.fontStyle.slice(1)
              : '',
          ].join(' ')}
        </div>
        <div
          className={cx(
            'my-4 pr-4 overflow-hidden break-all whitespace-nowrap',
            {
              'opacity-0 select-none': previewText.trim() === '',
            }
          )}
          style={variant}
          onChange={onChange}
        >
          {previewText.trim() !== '' ? previewText : 'a'}
        </div>
      </div>
      <div className="self-center flex justify-end">
        {isAdded ? (
          <button
            onClick={() => {
              removeStyle(stylesList.indexOf(stylesListElement))
            }}
            className="text-sm flex items-center whitespace-nowrap text-gray-600 p-2 rounded-sm hover:bg-gray-50 hover:text-blue-700"
          >
            Remove this style
            <span className="material-symbols-sharp ml-2">remove_circle</span>
          </button>
        ) : (
          <button
            onClick={() => {
              addStyle(stylesListElement)
            }}
            className="text-sm flex items-center whitespace-nowrap text-blue-600 p-2 rounded-sm hover:bg-gray-50 hover:text-blue-700"
          >
            Select this style
            <span className="material-symbols-sharp ml-2">add_circle</span>
          </button>
        )}
      </div>
    </div>
  )
}
