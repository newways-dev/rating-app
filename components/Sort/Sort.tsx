import { SortProps } from './Sort.props'
import { SortEnum } from './Sort.props'
import SortIcon from './sort.svg'
import clsx from 'clsx'

import styles from './Sort.module.scss'

export const Sort = ({
  sort,
  setSort,
  className,
  ...props
}: SortProps): JSX.Element => {
  return (
    <div className={clsx(styles.sort, className)} {...props}>
      <span
        onClick={() => setSort(SortEnum.Rating)}
        className={clsx({ [styles.active]: sort === SortEnum.Rating })}
      >
        <SortIcon className={styles.sortIcon} />
        По&nbsp;рейтингу
      </span>
      <span
        onClick={() => setSort(SortEnum.Price)}
        className={clsx({ [styles.active]: sort === SortEnum.Price })}
      >
        <SortIcon className={styles.sortIcon} />
        По&nbsp;цене
      </span>
    </div>
  )
}
