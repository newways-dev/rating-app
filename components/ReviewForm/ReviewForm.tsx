import { useState } from 'react'
import clsx from 'clsx'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'

import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface'
import { ReviewFormProps } from './ReviewForm.props'
import { Textarea } from '../Textarea/Textarea'
import { Rating } from '../Rating/Rating'
import { Button } from '../Button/Button'
import { API } from '../../helpers/api'
import { Input } from '../Input/Input'
import CloseIcon from './close.svg'

import styles from './ReviewForm.module.scss'

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>()

  const [isSuccess, setIsSucces] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.topPage.review.createDemo,
        { ...formData, productId }
      )

      if (data.message) {
        setIsSucces(true)
        reset()
      } else {
        setError('Что-то пошло не так...')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={clsx(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name', {
            required: { value: true, message: 'Заполните имя' },
          })}
          placeholder='Имя'
          error={errors.name}
        />
        <Input
          {...register('title', {
            required: { value: true, message: 'Заполните заголовок' },
          })}
          placeholder='Заголовок отзыва'
          error={errors.title}
          className={styles.title}
        />
        <div className={styles.rating}>
          <span>Оценка: </span>
          <Controller
            rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
            control={control}
            name='rating'
            render={({ field }) => (
              <Rating
                ref={field.ref}
                isEditable
                setRating={field.onChange}
                rating={field.value}
                error={errors.rating}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {
            required: { value: true, message: 'Заполните описание' },
          })}
          placeholder='Текст отзыва'
          error={errors.description}
          className={styles.description}
        />
        <div className={styles.submit}>
          <Button appearance='primary'>Отправить</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={clsx(styles.panel, styles.success)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <CloseIcon
            className={styles.close}
            onClick={() => setIsSucces(false)}
          />
        </div>
      )}
      {error && (
        <div className={clsx(styles.panel, styles.error)}>
          Что-то пошло не так, попробуйте обновить страницу
          <CloseIcon
            className={styles.close}
            onClick={() => setError(undefined)}
          />
        </div>
      )}
    </form>
  )
}
