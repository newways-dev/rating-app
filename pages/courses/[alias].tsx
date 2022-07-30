import { GetStaticPaths } from 'next'
import axios from 'axios'

import { ProductModel } from '../../interfaces/product.interface'
import { TopPageModel } from '../../interfaces/page.interface'
import { MenuItem } from '../../interfaces/menu.interface'
import { withLayout } from '../../layout/Layout'

interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
  page: TopPageModel
  products: ProductModel[]
}

const firstCategory = 0

function Course({ products }: CourseProps): JSX.Element {
  return <>{products.length}</>
}

export default withLayout(Course)

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    { firstCategory }
  )

  return {
    paths: menu.flatMap((m) => m.pages.map((p) => '/courses/' + p.alias)),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    { firstCategory }
  )

  const { data: page } = await axios.get<TopPageModel>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias
  )

  const { data: products } = await axios.post<TopPageModel>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
    { category: page.category, limit: 10 }
  )

  return {
    props: {
      menu,
      firstCategory,
      page,
      products,
    },
  }
}
