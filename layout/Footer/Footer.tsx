import React from 'react'
import { FooterProps } from './Footer.props'
import { format } from 'date-fns'
import clsx from 'clsx'

import styles from './Footer.module.scss'

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer className={clsx(className, styles.footer)} {...props}>
      <div>
        OwlTop &copy; 2020 - {format(new Date(), 'yyyy')} Все права защищены
      </div>
      <a href='#' target='_blank'>
        Пользовательское соглашение
      </a>
      <a href='#' target='_blank'>
        Политика конфиденциальности
      </a>
    </footer>
  )
}
