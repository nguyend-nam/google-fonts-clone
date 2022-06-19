import React, { useState } from 'react'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

  const openSideBar = () => {
    toggleDropdown(!dropdownContent)
  }

  return (
    <div className="relative">
      <button
        onClick={openSideBar}
        className={cx(
          'p-2 w-20 flex justify-between items-center rounded-md hover:bg-blue-50 hover:text-blue-700',
          {
            'bg-blue-50 text-blue-700': dropdownContent,
            'bg-white text-gray-700': !dropdownContent,
          },
          className
        )}
      >
        {displayValue}px
        <FontAwesomeIcon icon={dropdownContent ? faCaretUp : faCaretDown} />
      </button>
      <div
        className={cx(
          'shadow-lg border border-gray-100 mt-1 rounded-xl bg-white h-40 w-20 overflow-auto',
          {
            'block absolute': dropdownContent,
            'hidden absolute': !dropdownContent,
          }
        )}
      >
        {options.map((option, index) => (
          <button
            className="block hover:bg-blue-50 w-full text-left p-1 px-2"
            key={index}
            onClick={() => optionsClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
