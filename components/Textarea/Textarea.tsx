import { TextareaProps } from './Textarea.props'
import styles from './Textarea.module.scss'
import clsx from 'clsx'

export const Textarea = ({
  className,
  ...props
}: TextareaProps): JSX.Element => {
  return <textarea className={clsx(styles.textarea, className)} {...props} />
}
