import { useRouter } from 'next/router'
import { useContext } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface'
import { AppContext } from '../../context/app.context'
import { firstLevelMenu } from '../../helpers/helpers'
import styles from './Menu.module.scss'

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)
  const router = useRouter()

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
                onClick={() => openSecondLevel(m._id.secondCategory)}
                className={styles.secondLevel}
              >
                {m._id.secondCategory}
              </div>
              <div
                className={clsx(styles.secondLevelBlock, {
                  [styles.secondLevelBlockOpen]: m.isOpen,
                })}
              >
                {buildThirdLevel(m.pages, menuItem.route)}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      <>
        {pages.map((page) => (
          <Link href={`/${route}/${page.alias}`}>
            <a
              className={clsx(styles.thirdLevel, {
                [styles.thirdLevelActive]:
                  `/${route}/${page.alias}` == router.asPath,
              })}
            >
              {page.category}
            </a>
          </Link>
        ))}
      </>
    )
  }

  return <div className={styles.menu}>{buildFirstLevel()}</div>
}
