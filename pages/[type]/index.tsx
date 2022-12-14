import { GetStaticPaths, GetStaticProps } from 'next'
import axios from 'axios'
import { MenuItem } from '../../interfaces/menu.interface'
import { firstLevelMenu } from '../../helpers/helpers'
import { withLayout } from '../../layout/Layout'
import { API } from '../../helpers/api'

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}

function Type({ firstCategory }: TypeProps): JSX.Element {
  return <>{firstCategory}</>
}

export default withLayout(Type)

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map((m) => '/' + m.route),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  const firstCategoryItem = firstLevelMenu.find(
    (menu) => menu.route == params.type
  )

  if (!firstCategoryItem) {
    return {
      notFound: true,
    }
  }

  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id,
  })

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
    },
  }
}
