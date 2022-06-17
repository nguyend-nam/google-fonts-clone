import React, { useEffect, useRef } from 'react'
import cx from 'classnames'
import { Font } from 'types/schema'

interface CardProps {
  data: Font
  onClick?: (font: Font) => void
  previewText: string
  fontSize?: number
}

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

function fontDataToInlineStyle(data: Font, fontSize: number) {
  const { subsets, family, variants } = data
  const props: string[] = []
  props.push(
    `"${family} script=${
      subsets.includes('latin') ? 'latin' : subsets[0]
    } rev=1"`
  )
  props.push(
    `font-weight: ${variants.includes('regular') ? '400' : variants[0]}`
  )
  props.push('font-style: normal')
  props.push('font-stretch: normal')
  props.push('line-height: initial')
  props.push(`font-size: ${fontSize}px`)

  return `font-family: ${props.join('; ')}`
}

export function FontCard(props: CardProps) {
  const { data, onClick, previewText, fontSize = 40 } = props
  const fontRef = useRef<HTMLDivElement>(null)
  const variantLen = data.variants.length

  useEffect(() => {
    if (fontRef.current) {
      fontRef.current.setAttribute(
        'style',
        fontDataToInlineStyle(data, fontSize)
      )
    }
  }, [data, fontSize])

  useEffect(() => {
    const style = document.createElement('style')
    style.id = `google-font-${data.family.replace(/\s+/g, '-').toLowerCase()}`
    style.innerHTML = fontDataToCSS(data)

    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [data])

  return (
    <div
      className={cx('border rounded p-4 h-full')}
      tabIndex={1}
      role="button"
      onClick={() => {
        if (onClick) {
          onClick(data)
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onClick) {
          e.preventDefault()
          onClick(data)
        }
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-lg">{data.family}</h4>
        <span className="text-xs">
          {data.variants.length} {`style${variantLen > 1 ? 's' : ''}`}
        </span>
      </div>

      <div className="mb-17" ref={fontRef}>
        {previewText}
      </div>
    </div>
  )
}
