import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface PtagProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  fontSize: '14px' | '16px' | '18px'
  children: ReactNode
}
