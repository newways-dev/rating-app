import { useEffect, useReducer } from 'react'
import { Advantages, HhData, Htag, Product, Sort, Tag } from '../../components'
import { TopLevelCategory } from '../../interfaces/page.interface'
import { TopPageComponentProps } from './TopPageComponent.props'
import { SortEnum } from '../../components/Sort/Sort.props'
import styles from './TopPageComponent.module.scss'
import { sortReducer } from './sort.reducer'

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps) => {
  const [{ sort, products: sortedProducts }, dispatchSort] = useReducer(
    sortReducer,
    {
      sort: SortEnum.Rating,
      products,
    }
  )

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort })
  }

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products })
  }, [products])

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag='h1'>{page.title}</Htag>
        {products && (
          <Tag color='grey' size='medium'>
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div>
        {sortedProducts &&
          sortedProducts.map((product) => (
            <Product layout key={product._id} product={product} />
          ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag='h2'>Вакансии - {page.category}</Htag>
        <Tag color='red' size='medium'>
          hh.ru
        </Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag='h2'>Преимущества</Htag>
          <Advantages advantges={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag='h2'>Получаемые навыки</Htag>
      {page.tags.map((tag) => (
        <Tag key={tag} color='primary'>
          {tag}
        </Tag>
      ))}
    </div>
  )
}
