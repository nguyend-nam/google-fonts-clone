import React from 'react'
import cx from 'classnames'

interface CardProps {
  title: string
  author: string
  stylesCount: number
  previewText: string
  className?: string
}

export function Card(props: CardProps) {
  const { title, author, stylesCount, previewText, className } = props
  return (
    <button
      className={cx(
        'border border-1 border-gray-300 rounded-lg max-w-md ease-in-out duration-150 text-left hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
    >
      <div className="m-4 mb-6">
        <span className="float-right text-xs text-gray-600">
          {stylesCount}
          {stylesCount > 1 ? ' styles' : ' style'}
        </span>
        <h2 className="text-lg">{title}</h2>
        <h4 className="text-sm text-gray-600">{author}</h4>
      </div>
      <p className="text-5xl px-4 mb-24 font-normal">{previewText}</p>
    </button>
  )
}
