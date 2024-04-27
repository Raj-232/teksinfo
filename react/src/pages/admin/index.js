import React, { useEffect, useState } from 'react'
import { userAllGetApi } from '../../services/adminApi'
import { UserTable } from './UserTable'
import{Stack} from '@mui/material'
const Admin = () => {
    const [apiData, setApiData] = useState()
    useEffect(() => {
        const fetchAllUser = async () => {
            const { data, error } = await userAllGetApi();
            console.log(data)
            setApiData(data.data)
        }
        fetchAllUser();
    }, [])

    return (
        <Stack padding={8}>
            <UserTable data={apiData} isLoading={false} />
        </Stack>
    )
}

export default Admin