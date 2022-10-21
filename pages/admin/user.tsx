import { PeopleOutline } from '@mui/icons-material'
import React from 'react'
import { AdminLayout } from '../../components/layout'

const UserPage = () => {
  return (
    <AdminLayout 
        title='Usuarios'
        subTitle='Matenimiento de usuarios'
        icon={<PeopleOutline />}
    >
        
    </AdminLayout>
  )
}

export default UserPage