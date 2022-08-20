import clsx from 'clsx'
import { useForm, Controller } from 'react-hook-form'

import { IReviewForm } from './ReviewForm.interface'
import { ReviewFormProps } from './ReviewForm.props'
import { Textarea } from '../Textarea/Textarea'
import { Rating } from '../Rating/Rating'
import { Button } from '../Button/Button'
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
  } = useForm<IReviewForm>()

  const onSubmit = (data: IReviewForm) => {
    console.log(data)
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
            control={control}
            name='rating'
            render={({ field }) => (
              <Rating
                ref={field.ref}
                isEditable
                setRating={field.onChange}
                rating={field.value}
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
      <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
        <CloseIcon className={styles.close} />
      </div>
    </form>
  )
}
