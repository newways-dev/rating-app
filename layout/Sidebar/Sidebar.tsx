import React from 'react'
import { SidebarProps } from './Sidebar.props'
import { Menu } from '../Menu/Menu'

import styles from './Sidebar.module.scss'

export const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
  return (
    <div {...props}>
      <Menu />
    </div>
  )
}
