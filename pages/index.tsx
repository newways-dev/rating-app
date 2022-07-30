import { useState } from 'react'
import { GetStaticProps } from 'next'
import axios from 'axios'

import { Button, Htag, Ptag, Rating, Tag } from '../components'
import { MenuItem } from '../interfaces/menu.interface'
import { withLayout } from '../layout/Layout'

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4)

  return (
    <>
      <Htag tag='h1'>Текст внутри тега</Htag>
      <Button appearance='primary' arrow='right'>
        button
      </Button>
      <Button appearance='ghost' arrow='down'>
        button
      </Button>
      <Ptag fontSize='14px'>маленький</Ptag>
      <Ptag fontSize='16px'>средний</Ptag>
      <Ptag fontSize='18px'>большой</Ptag>
      <Tag color='primary' size='medium'>
        primary tag
      </Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <ul>
        {menu.map((el) => (
          <li key={el._id.secondCategory}>{el._id.secondCategory}</li>
        ))}
      </ul>
    </>
  )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    { firstCategory }
  )

  return {
    props: {
      menu,
      firstCategory,
    },
  }
}
