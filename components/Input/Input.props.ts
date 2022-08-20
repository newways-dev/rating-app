import { FieldError } from 'react-hook-form'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export interface InputPros
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: FieldError
}
