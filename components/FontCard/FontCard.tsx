import React from 'react'
import cx from 'classnames'

interface CardProps {
  title: string
}

export function FontCard(props: CardProps) {
  const { title } = props
  const divStyle = {
    fontFamily: 'Nuosu SIL script=latin rev=1',
    fontWeight: 400,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'initial',
    fontSize: '40px',
  }
  return (
    <div
      style={divStyle}
      className={cx(
        'border border-1 border-gray-300 rounded-lg max-w-md ease-in-out duration-150 text-left hover:-translate-y-0.5 hover:shadow-md'
      )}
    >
      {title}
    </div>
  )
}
