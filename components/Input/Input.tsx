import { InputPros } from './Input.props'
import styles from './Input.module.scss'
import clsx from 'clsx'

export const Input = ({ className, ...props }: InputPros): JSX.Element => {
  return <input className={clsx(styles.input, className)} {...props} />
}
