import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

import { PeopleOutline } from '@mui/icons-material'
import { AdminLayout } from '../../components/layout'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Grid, MenuItem, Select } from '@mui/material'
import { FullScreenLoading } from '../../components/ui'

import { IUser } from '../../interfaces'
import { tesloApi } from '../../api'

const UserPage = () => {

    const {data, error} = useSWR<IUser[]>('/api/admin/users')
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
      if (data) {
        setUsers(data)
      }
    }, [data])
    
    if (!data && !error) return (<FullScreenLoading/>)

    const onRoleUpdated = async( userId: string, newRole: string ) => {
        const previosUsers = users.map( user => ({ ...user }))
        const updatedUsers = users.map( user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }))
        setUsers(updatedUsers)
        try {
            await tesloApi.put('/admin/users', {userId, role: newRole})
        } catch (error) {
            setUsers(previosUsers)
            alert('No se puede actualizar el usuario')
        } 
    }

    const columns : GridColDef[] = [
        {field: 'email', headerClassName: 'Correo', width: 250},
        {field: 'name', headerClassName: 'Nombre completo', width: 300},
        {
            field: 'role', 
            headerClassName: 'Rol', 
            width: 300,
            renderCell: ({row}) => {
                return (
                    <Select
                        value={row.role}
                        label='Rol'
                        sx={{ width: '300px' }}
                        onChange={({target}) => onRoleUpdated( row.id, target.value)}
                    >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='client'>Client</MenuItem>
                    </Select>
                )
            }
        },
    ]

    const rows = users.map( user=> ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))
    
  return (
    <AdminLayout 
        title='Usuarios'
        subTitle='Matenimiento de usuarios'
        icon={<PeopleOutline />}
    >
    <Grid container>
        <Grid item xs={12} sx={{ height:650, width: '100%' }}>
        <DataGrid
            rows={ rows }
            columns={ columns }
            pageSize={10}
            rowsPerPageOptions={ [10] }
        />
        </Grid>
    </Grid>
        
    </AdminLayout>
  )
}

export default UserPage