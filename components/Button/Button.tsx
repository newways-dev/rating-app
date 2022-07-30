import { ButtonProps } from './Button.props'
import ArrowIcon from './arrow.svg'
import clsx from 'clsx'

import styles from './Button.module.scss'

export const Button = ({
  appearance,
  children,
  arrow = 'none',
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={clsx(styles.button, className, {
        [styles.primary]: appearance == 'primary',
        [styles.ghost]: appearance == 'ghost',
      })}
      {...props}
    >
      {children}
      {arrow !== 'none' && (
        <span
          className={clsx(styles.arrow, { [styles.down]: arrow == 'down' })}
        >
          <ArrowIcon />
        </span>
      )}
    </button>
  )
}
