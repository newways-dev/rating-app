import { GetStaticProps } from 'next'
import axios from 'axios'

import { MenuItem } from '../interfaces/menu.interface'
import { withLayout } from '../layout/Layout'
import { API } from '../helpers/api'

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}

function Search({ menu }: HomeProps): JSX.Element {
  return <>search</>
}

export default withLayout(Search)

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
