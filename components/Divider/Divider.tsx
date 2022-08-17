import { DividerProps } from './Divider.props'
import styles from './Divider.module.scss'
import clsx from 'clsx'

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
  return <hr className={clsx(styles.hr, className)} {...props} />
}
