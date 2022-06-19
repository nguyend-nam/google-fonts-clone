import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'

interface ButtonProps {
  icon?: string
  className?: string
  onClick?: () => void
}

export function Button(props: ButtonProps) {
  const { icon, className, onClick } = props

  return (
    <button
      onClick={onClick}
      className={cx(
        'h-12 w-12 text-xl rounded-full bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800',
        className
      )}
    >
      {icon === 'theme' ? (
        <FontAwesomeIcon icon={faSun} />
      ) : icon === 'family' ? (
        <FontAwesomeIcon icon={faMicrosoft} />
      ) : (
        ''
      )}
    </button>
  )
}
