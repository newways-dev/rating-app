import clsx from 'clsx'
import { motion } from 'framer-motion'
import { ButtonProps } from './Button.props'
import ArrowIcon from './arrow.svg'

import styles from './Button.module.scss'

export const Button = ({
  appearance,
  children,
  arrow = 'none',
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
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
    </motion.button>
  )
}
