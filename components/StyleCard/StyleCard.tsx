import cx from 'classnames'

interface StyleProps {
  variant: variant
  previewText: string
  fontSize: number
  onClickAdd?: () => void
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
  const { variant, previewText, onClickAdd, onChange } = props
  return (
    <div
      key={variant.fontFamily}
      className="flex justify-between items-center p-4 border-b border-gray-300"
    >
      <div>
        <div className="text-sm text-gray-600">
          {variant.fontWeight === '100'
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
            : 'Black'}{' '}
          {variant.fontWeight}{' '}
          {variant.fontStyle === 'italic'
            ? variant.fontStyle[0].toUpperCase() + variant.fontStyle.slice(1)
            : ''}{' '}
        </div>
        <div
          className={cx('my-4 pr-4 overflow-auto break-all', {
            'opacity-0 select-none': previewText.trim() === '',
            '': previewText.trim() !== '',
          })}
          style={variant}
          onChange={onChange}
        >
          {previewText.trim() !== '' ? previewText : 'a'}
        </div>
      </div>
      <button
        onClick={onClickAdd}
        className="flex items-center whitespace-nowrap text-blue-600 p-2 rounded-sm hover:bg-gray-50 hover:text-blue-700"
      >
        Select this style
        <span className="material-symbols-sharp ml-2">add_circle</span>
      </button>
    </div>
  )
}
