import { KeyboardEvent, useEffect, useState } from 'react'
import { RatingProps } from './Rating.props'
import StarIcon from './star.svg'
import styles from './Rating.module.scss'
import clsx from 'clsx'

export const Rating = ({
  isEditable = false,
  rating,
  setRating,
  ...props
}: RatingProps): JSX.Element => {
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
    <div {...props}>
      {ratingArray.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  )
}
