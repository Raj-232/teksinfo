import { useEffect, useState } from "react";
import { userGetApi } from "../../services/adminApi";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [apiData, setApiData] = useState()
  const navigate=useNavigate();
  useEffect(() => {
    const fetchAllUser = async () => {
      const id = localStorage.getItem("userId")
      const { data, error } = await userGetApi(id);
      console.log(data)
      setApiData(data?.data)
    }
    fetchAllUser();
  }, [])
  return (
    <Stack justifyContent="center" alignItems="center" height={"100vh"} spacing={4}>

      <Typography variant="h6">{apiData?.name}</Typography>
      <Typography variant="h6">{apiData?.email}</Typography>
      <Typography variant="h6">{apiData?.mobileNumber}</Typography>
      <Button onClick={()=>navigate('/signin')}>Logout</Button>



    </Stack>
  )
}

export default Home