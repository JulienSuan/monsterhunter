import React, { useContext, useEffect } from 'react'
import Home from './../Home/Home';
import { UserContext } from '../../contexts/UserProvider';
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';

export default function HomePage() {
  const handleFile = async (e) => {
    if (e.target.files[0] !== undefined) {
 
      const form = new FormData()
      let file = e.target.files[0]
      form.append("test", file)
      const datas = await axios.post("http://localhost:3001/api/mhgu/v1/testaaa",form, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      console.log(datas)
    }
  }
  
  const navigate = useNavigate()
  const {isConnected, user} = useContext(UserContext);
  console.log(isConnected)
  console.log(user)

  useEffect(() => {  
      isConnected()
      if (!user) {
        navigate("/")
      }
  }, [])

  return (
    <div>
        <input type="file" onChange={handleFile} name="test" id="" />
    </div>
  )
}
