import { HhDataProps } from './HhData.props'
import { Card } from '../Card/Card'
import RateIcom from './rate.svg'

import styles from './HhData.module.scss'
import { priceRu } from '../../helpers/helpers'

export const HhData = ({
  count,
  juniorSalary,
  middleSalary,
  seniorSalary,
}: HhDataProps) => {
  return (
    <div className={styles.hh}>
      <Card className={styles.count}>
        <div className={styles.title}>Всего вакансий</div>
        <div className={styles.countValue}>{count}</div>
      </Card>
      <Card className={styles.salary}>
        <div>
          <div className={styles.title}>Начальный</div>
          <div className={styles.salaryValue}>{priceRu(juniorSalary)}</div>
          <div className={styles.ratw}>
            <RateIcom className={styles.filled} />
            <RateIcom />
            <RateIcom />
          </div>
        </div>
        <div>
          <div className={styles.title}>Средний</div>
          <div className={styles.salaryValue}>{priceRu(middleSalary)}</div>
          <div className={styles.ratw}>
            <RateIcom className={styles.filled} />
            <RateIcom className={styles.filled} />
            <RateIcom />
          </div>
        </div>
        <div>
          <div className={styles.title}>Профессионал</div>
          <div className={styles.salaryValue}>{priceRu(seniorSalary)}</div>
          <div className={styles.rate}>
            <RateIcom className={styles.filled} />
            <RateIcom className={styles.filled} />
            <RateIcom className={styles.filled} />
          </div>
        </div>
      </Card>
    </div>
  )
}
