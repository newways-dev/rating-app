import { AdvantagesProps } from './Advantages.props'
import CheckIcom from './check.svg'
import styles from './Advantages.module.scss'

export const Advantages = ({ advantges }: AdvantagesProps) => {
  return (
    <>
      {advantges.map((a) => (
        <div key={a._id} className={styles.advantage}>
          <CheckIcom className={styles.icon} />
          <div className={styles.title}>{a.title}</div>
          <hr className={styles.vline} />
          <div>{a.description}</div>
        </div>
      ))}
    </>
  )
}
