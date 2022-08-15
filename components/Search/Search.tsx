import { KeyboardEvent, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import GlassIcon from './glass.svg'
import { SearchProps } from './Search.props'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import styles from './Search.module.scss'

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('')
  const router = useRouter()

  const handleSearch = () => {
    router.push({
      pathname: '/search',
      query: { q: search },
    })
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={clsx(styles.search, className)} {...props}>
      <Input
        className={styles.input}
        placeholder='Поиск...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance='primary'
        className={styles.button}
        onClick={handleSearch}
      >
        <GlassIcon />
      </Button>
    </div>
  )
}
