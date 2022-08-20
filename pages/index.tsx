import { useState } from 'react'
import { GetStaticProps } from 'next'
import axios from 'axios'

import {
  Button,
  Htag,
  Input,
  Ptag,
  Rating,
  Search,
  Tag,
  Textarea,
} from '../components'
import { MenuItem } from '../interfaces/menu.interface'
import { withLayout } from '../layout/Layout'
import { API } from '../helpers/api'

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
      <Input placeholder='test' />
      <Textarea placeholder='test textarea' />
      <Search />
    </>
  )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  })

  return {
    props: {
      menu,
      firstCategory,
    },
  }
}
