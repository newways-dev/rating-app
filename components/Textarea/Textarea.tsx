import { ForwardedRef, forwardRef } from 'react'
import { TextareaProps } from './Textarea.props'
import styles from './Textarea.module.scss'
import clsx from 'clsx'

export const Textarea = forwardRef(
  (
    { error, className, ...props }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
    return (
      <div className={clsx(styles.textareaWrapper, className)}>
        <textarea
          ref={ref}
          className={clsx({ [styles.error]: error }, styles.textarea)}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    )
  }
)
