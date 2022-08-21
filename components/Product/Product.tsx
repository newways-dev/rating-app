import { ForwardedRef, forwardRef, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import clsx from 'clsx'

import { declOfNum, priceRu } from '../../helpers/helpers'
import { ReviewForm } from '../ReviewForm/ReviewForm'
import { ProductProps } from './Product.props'
import { Divider } from '../Divider/Divider'
import { Rating } from '../Rating/Rating'
import { Button } from '../Button/Button'
import { Review } from '../Review/Review'
import { Card } from '../Card/Card'
import { Tag } from '../Tag/Tag'

import styles from './Product.module.scss'

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false)
      const reviewRef = useRef<HTMLDivElement>(null)

      const scrollToReview = () => {
        setIsReviewOpen(true)
        reviewRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }

      const variants = {
        visible: { opacity: 1, height: 'auto' },
        hidden: { opacity: 0, height: 0 },
      }

      return (
        <div ref={ref} className={className} {...props}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <Image
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              {priceRu(product.price)}
              {product.oldPrice && (
                <Tag className={styles.oldPrice} color='green'>
                  {priceRu(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              {priceRu(product.credit)}/{' '}
              <span className={styles.month}>мес</span>
            </div>
            <div className={styles.rating}>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((category) => (
                <Tag className={styles.category} key={category} color='ghost'>
                  {category}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle}>цена</div>
            <div className={styles.creditTitle}>кредит</div>
            <div className={styles.ratingTitle}>
              <a href='#ref' onClick={scrollToReview}>
                {product.reviewCount}
                {declOfNum(product.reviewCount, [
                  ' отзыв',
                  ' отзыва',
                  ' отзывов',
                ])}
              </a>
            </div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
              {product.characteristics.map((c) => (
                <div className={styles.characteristics} key={c.name}>
                  <span className={styles.characteristicsName}>{c.name}</span>
                  <span className={styles.characteristicsDots}></span>
                  <span className={styles.characteristicsValue}>{c.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div> {product.advantages}</div>
                </div>
              )}
              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>Недостатки</div>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>
            <Divider className={clsx(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
              <Button appearance='primary'>Узнать подробнее</Button>
              <Button
                onClick={() => setIsReviewOpen(!isReviewOpen)}
                className={styles.reviewButton}
                appearance='ghost'
                arrow={isReviewOpen ? 'down' : 'right'}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            animate={isReviewOpen ? 'visible' : 'hidden'}
            variants={variants}
            initial='hidden'
          >
            <Card ref={reviewRef} color='blue' className={styles.reviews}>
              {product.reviews.map((r) => (
                <div key={r._id}>
                  <Review review={r} />
                  <Divider />
                </div>
              ))}
              <ReviewForm productId={product._id} />
            </Card>
          </motion.div>
        </div>
      )
    }
  )
)
