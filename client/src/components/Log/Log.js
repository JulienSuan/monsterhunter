import React, { useEffect, useState } from 'react'
import "./Log.css"
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import image from "../../images/1d94353d6734d8ecb379d0ab9470776fbb95a39a_hq.gif"
import axios from "axios"
import { useNavigate } from "react-router-dom";


export default function Log() {
    
    const navigate = useNavigate();
    const [isFull, setisFull] = useState(false);
    const [isHide, setisHide] = useState(true);
    const [values, setvalues] = useState({
        mail: "",
        password: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isFull) {
            try {
                const res = await axios.post("http://localhost:3001/api/mhgu/v1/signup",  {
                  email: values.mail,
                  password: values.password
                })
                console.log(res.data)
                if (res) {
                  localStorage.setItem("token","Bearer " +  res.data.token)  
                  localStorage.setItem("user", JSON.stringify(res.data.user))
                  navigate("/HomePage")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        console.log(values.mail)
        console.log(values.password)
        if (values.mail && values.password) {
            setisFull(true)
        } else {
            setisFull(false)
        }
    }, [values])


  return (
    <form className='log__container' onSubmit={handleSubmit}>
        <div className="log__container__input">
            <input type="text" id='email' value={values.mail} onChange={(e) => setvalues({...values, mail: e.target.value})} required/>
            <label htmlFor='email'>
                e-mail
            </label>
        </div>
        <div className="log__container__input">
            <input type={isHide ? `password` : "text" }  value={values.password} onChange={(e) => setvalues({...values, password: e.target.value})} id="password" required/>
            <label htmlFor='password'>
                password 
            </label>
            {isHide ? <HiEyeSlash onClick={() => setisHide(!isHide)} className='log__container__input__icon'></HiEyeSlash> : <HiEye onClick={() => setisHide(!isHide)}  className='log__container__input__icon'></HiEye>}
        </div>
        <button className={isFull ? `log__container__button` : `log__container__button--active`} onClick={handleSubmit}>S'inscrire</button>
        <img className='gifscreen' src={image} alt="" srcset="" />
    </form>
  )
}
