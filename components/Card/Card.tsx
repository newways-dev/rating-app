import clsx from 'clsx'
import { CardProps } from './Card.props'
import styles from './Card.module.scss'
import { ForwardedRef, forwardRef } from 'react'

export const Card = forwardRef(
  (
    { color = 'white', children, className, ...props }: CardProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.card, className, {
          [styles.blue]: color == 'blue',
        })}
        {...props}
      >
        {children}
      </div>
    )
  }
)
