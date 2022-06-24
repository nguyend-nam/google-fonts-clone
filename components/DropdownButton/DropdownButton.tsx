import React, { useState } from 'react'
import cx from 'classnames'

interface DropdownProps {
  displayValue: number
  options: number[]
  optionsClick: (val: number) => void
  className?: string
}

export const DropdownButton = (props: DropdownProps) => {
  const { displayValue, options, optionsClick, className } = props
  const [dropdownContent, toggleDropdown] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => {
          toggleDropdown(!dropdownContent)
        }}
        className={cx(
          'p-2 w-20 flex justify-between items-center rounded-md hover:bg-blue-50 hover:text-blue-600',
          {
            'bg-blue-50 text-blue-600': dropdownContent,
            'bg-white text-gray-700': !dropdownContent,
          },
          className
        )}
      >
        <span>{displayValue}px</span>
        <span className="material-symbols-outlined">
          {dropdownContent ? 'arrow_drop_up' : 'arrow_drop_down'}
        </span>
      </button>
      <div
        className={cx(
          'z-20 shadow-lg border border-gray-100 mt-1 rounded-xl bg-white h-40 w-20 overflow-auto absolute',
          {
            block: dropdownContent,
            hidden: !dropdownContent,
          }
        )}
      >
        {options.map((option, index) => (
          <button
            className="block hover:bg-blue-50 w-full text-left p-1 px-2"
            key={index}
            onClick={() => {
              optionsClick(option)
              toggleDropdown(!dropdownContent)
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
