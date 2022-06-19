interface StyleProps {
  variant: variant
  previewText: string
  onClick?: () => void
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
  const { variant, previewText, onClick, onChange } = props
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
          className="my-4 pr-4 overflow-auto break-all"
          style={variant}
          onChange={onChange}
        >
          {previewText}
        </div>
      </div>
      <button onClick={onClick} className="whitespace-nowrap text-blue-600">
        Select this style
      </button>
    </div>
  )
}
