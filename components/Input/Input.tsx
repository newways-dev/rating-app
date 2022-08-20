import { InputPros } from './Input.props'
import styles from './Input.module.scss'
import clsx from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

export const Input = forwardRef(
  (
    { error, className, ...props }: InputPros,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className={clsx(className, styles.inputWrapper)}>
        <input
          ref={ref}
          className={clsx({ [styles.error]: error }, styles.input)}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    )
  }
)
