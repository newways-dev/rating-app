import { PtagProps } from './Ptag.props'
import styles from './Ptag.module.scss'
import clsx from 'clsx'

export const Ptag = ({
  fontSize,
  children,
  className,
  ...props
}: PtagProps): JSX.Element => {
  return (
    <p
      className={clsx(styles.paragraph, className, {
        [styles.small]: fontSize == '14px',
        [styles.medium]: fontSize == '16px',
        [styles.large]: fontSize == '18px',
      })}
      {...props}
    >
      {children}
    </p>
  )
}
