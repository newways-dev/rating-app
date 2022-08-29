import React, { FC, useState, KeyboardEvent, useRef } from 'react'
import clsx from 'clsx'

import { AppContextProvider, IAppContext } from '../context/app.context'
import { LayoutProps } from './Layout.props'
import { Header } from './Header/Header'
import { Sidebar } from './Sidebar/Sidebar'
import { Footer } from './Footer/Footer'
import { Up } from '../components'
import styles from './Layout.module.scss'

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLink, setIsSkipLink] = useState<boolean>(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const skipContentAction = (keyEvent: KeyboardEvent) => {
    if (keyEvent.code === 'Space' || keyEvent.code === 'Enter') {
      keyEvent.preventDefault()
      bodyRef.current.focus()
    }
    setIsSkipLink(false)
  }

  return (
    <div className={styles.wrapper}>
      <a
        onFocus={() => setIsSkipLink(true)}
        tabIndex={1}
        onKeyDown={skipContentAction}
        className={clsx(styles.skipLink, {
          [styles.displayedLink]: isSkipLink,
        })}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div ref={bodyRef} tabIndex={0} className={styles.body}>
        {children}
      </div>
      <Footer className={styles.footer} />
      <Up />
    </div>
  )
}

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FC<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    )
  }
}
