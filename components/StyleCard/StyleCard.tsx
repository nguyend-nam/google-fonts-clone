import cx from 'classnames'
import { useStylesListContext } from 'context/styleslist'
import { getFontWeight } from 'utils/get-font-weight'

interface StyleProps {
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
  const { variant, previewText, stylesListElement, onChange } = props
  const { stylesList, addStyle, removeStyle } = useStylesListContext()
  const isAdded = stylesList.includes(stylesListElement)
  return (
    <div
      key={variant.fontFamily}
      className="grid grid-cols-[minmax(0,_1fr)_190px] auto-cols-auto p-4 border-b border-gray-300"
    >
      <div>
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
          className={cx('my-4 pr-4 overflow-auto break-all whitespace-nowrap', {
            'opacity-0 select-none': previewText.trim() === '',
          })}
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
            className="flex items-center whitespace-nowrap text-blue-600 p-2 rounded-sm hover:bg-gray-50 hover:text-blue-700"
          >
            Remove this style
            <span className="material-symbols-sharp ml-2">remove_circle</span>
          </button>
        ) : (
          <button
            onClick={() => {
              addStyle(stylesListElement)
            }}
            className="flex items-center whitespace-nowrap text-blue-600 p-2 rounded-sm hover:bg-gray-50 hover:text-blue-700"
          >
            Select this style
            <span className="material-symbols-sharp ml-2">add_circle</span>
          </button>
        )}
      </div>
    </div>
  )
}
