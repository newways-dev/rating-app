import clsx from 'clsx'
import { CardProps } from './Card.props'
import styles from './Card.module.scss'

export const Card = ({
  color = 'white',
  children,
  className,
  ...props
}: CardProps) => {
  return (
    <div
      className={clsx(styles.card, className, {
        [styles.blue]: color == 'blue',
      })}
      {...props}
    >
      {children}
    </div>
  )
}
