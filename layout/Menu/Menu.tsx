import { useContext, KeyboardEvent } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Link from 'next/link'
import clsx from 'clsx'

import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface'
import { AppContext } from '../../context/app.context'
import { firstLevelMenu } from '../../helpers/helpers'
import styles from './Menu.module.scss'

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)
  const router = useRouter()

  const variants = {
    visible: {
      marginBottom: 20,
      transition: { when: 'beforeChildren', staggerChildren: 0.1 },
    },
    hidden: {
      marginBottom: 0,
    },
  }

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  }

  const openSecondLevelKey = (
    keyEvent: KeyboardEvent,
    secondCategory: string
  ) => {
    if (keyEvent.code === 'Space' || keyEvent.code === 'Enter') {
      openSecondLevel(secondCategory)
      keyEvent.preventDefault()
    }
  }

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory === secondCategory) {
            m.isOpen = !m.isOpen
          }
          return m
        })
      )
  }

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((menu) => (
          <div key={menu.route}>
            <Link href={`/${menu.route}`}>
              <a>
                <div
                  className={clsx(styles.firstLevel, {
                    [styles.firstLevelActive]: menu.id === firstCategory,
                  })}
                >
                  {menu.icon}
                  <span>{menu.name}</span>
                </div>
              </a>
            </Link>
            {menu.id === firstCategory && buildSecondLevel(menu)}
          </div>
        ))}
      </>
    )
  }

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])
          ) {
            m.isOpen = true
          }
          return (
            <div key={m._id.secondCategory}>
              <div
                tabIndex={0}
                onKeyDown={(key: KeyboardEvent) =>
                  openSecondLevelKey(key, m._id.secondCategory)
                }
                onClick={() => openSecondLevel(m._id.secondCategory)}
                className={styles.secondLevel}
              >
                {m._id.secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                initial={m.isOpen ? 'visible' : 'hidden'}
                animate={m.isOpen ? 'visible' : 'hidden'}
                className={clsx(styles.secondLevelBlock)}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpen ?? false)}
              </motion.div>
            </div>
          )
        })}
      </div>
    )
  }
  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpen: boolean
  ) => {
    return pages.map((page) => (
      <motion.div variants={variantsChildren} key={page._id}>
        <Link href={`/${route}/${page.alias}`}>
          <a
            tabIndex={isOpen ? 0 : -1}
            className={clsx(styles.thirdLevel, {
              [styles.thirdLevelActive]:
                `/${route}/${page.alias}` == router.asPath,
            })}
          >
            {page.category}
          </a>
        </Link>
      </motion.div>
    ))
  }

  return <div className={styles.menu}>{buildFirstLevel()}</div>
}
