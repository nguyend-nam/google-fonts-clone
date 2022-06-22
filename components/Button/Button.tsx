import cx from 'classnames'

interface ButtonProps {
  icon?: string
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function Button(props: ButtonProps) {
  const { icon, className, onClick, disabled } = props

  return (
    <button onClick={onClick} className={cx(className)} disabled={disabled}>
      {icon === 'family' ? (
        <span className="material-symbols-outlined">dashboard_customize</span>
      ) : icon == 'redo' ? (
        <span className="material-symbols-outlined">refresh</span>
      ) : icon == 'cross' ? (
        <span className="material-symbols-outlined">close</span>
      ) : (
        ''
      )}
    </button>
  )
}
