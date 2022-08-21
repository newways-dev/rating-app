import { motion, useAnimation } from 'framer-motion'
import { useScrollY } from '../../hooks/useScrollY'
import styles from './Up.module.scss'
import { useEffect } from 'react'
import { ButtonIcon } from '../ButtonIcon/ButtonIcon'

export const Up = (): JSX.Element => {
  const controls = useAnimation()

  const Y = useScrollY()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    controls.start({ opacity: Y / document.body.scrollHeight })
  }, [Y, controls])

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0 }}
      className={styles.up}
    >
      <ButtonIcon onClick={scrollToTop} appearance='primary' icon='up' />
    </motion.div>
  )
}
