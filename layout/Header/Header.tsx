import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Sidebar } from '../Sidebar/Sidebar'
import { HeaderProps } from './Header.props'
import { ButtonIcon } from '../../components'
import Logo from '../logo.svg'

import styles from './Header.module.scss'

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const variants = {
    open: { opacity: 1, x: 0, transition: { stiffness: 20 } },
    closed: { opacity: 0, x: '100%' },
  }

  useEffect(() => {
    setOpen(false)
  }, [router])

  return (
    <header className={clsx(className, styles.header)} {...props}>
      <Logo className={styles.logo} />
      <div>
        <ButtonIcon
          onClick={() => setOpen(true)}
          appearance='white'
          icon='menu'
        />
      </div>
      <motion.div
        variants={variants}
        initial={'closed'}
        animate={open ? 'open' : 'closed'}
        className={styles.mobileMenu}
      >
        <Sidebar />
        <ButtonIcon
          className={styles.menuClose}
          appearance='white'
          icon='close'
          onClick={() => setOpen(false)}
        />
      </motion.div>
    </header>
  )
}
