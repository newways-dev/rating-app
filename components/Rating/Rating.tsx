import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react'
import clsx from 'clsx'
import { RatingProps } from './Rating.props'
import StarIcon from './star.svg'
import styles from './Rating.module.scss'

export const Rating = forwardRef(
  (
    { error, isEditable = false, rating, setRating, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    )

    const changeDisplay = (i: number) => {
      if (!isEditable) {
        return
      }
      constructRating(i)
    }

    const onClick = (i: number) => {
      if (!isEditable || !setRating) {
        return
      }
      setRating(i)
    }

    const handleSpace = (i: number, event: KeyboardEvent<SVGAElement>) => {
      if (event.code != 'Space' && !setRating) {
        return
      }
      setRating(i)
    }

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map(
        (starElement: JSX.Element, index: number) => {
          return (
            <span
              className={clsx(styles.star, {
                [styles.filled]: index < currentRating,
                [styles.editable]: isEditable,
              })}
              onMouseEnter={() => changeDisplay(index + 1)}
              onMouseLeave={() => changeDisplay(rating)}
              onClick={() => onClick(index + 1)}
            >
              <StarIcon
                tabIndex={isEditable ? 0 : -1}
                onKeyDown={(event: KeyboardEvent<SVGAElement>) =>
                  isEditable && handleSpace(index + 1, event)
                }
              />
            </span>
          )
        }
      )
      setRatingArray(updatedArray)
    }

    useEffect(() => {
      constructRating(rating)
    }, [rating])

    return (
      <div
        className={clsx({ [styles.error]: error }, styles.ratingWrapper)}
        {...props}
        ref={ref}
      >
        {ratingArray.map((star, index) => (
          <span key={index}>{star}</span>
        ))}
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    )
  }
)
