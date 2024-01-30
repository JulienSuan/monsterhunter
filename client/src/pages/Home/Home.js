import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Home.css"
import Start from '../../components/Start/Start'
import{AnimatePresence} from "framer-motion"
import Log from '../../components/Log/Log';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../contexts/UserProvider';

export default function Home() {
  const navigate = useNavigate();
  const {user} = useContext(UserContext)
  console.log(user)
    const [isStarted, setisStarted] = useState(true);
    useEffect(() => {
      if (user) {
        navigate("/ProfilPage");
      }
      if (!isStarted) {
        video.current.volume = .2
      }
    }, [isStarted])
    const video = useRef(null)
  return (
    <div className='home__container'>
      {!isStarted && <Log></Log>}
      {!isStarted && <video ref={video} src="/Video/video.mp4" autoPlay type="video/mp4"></video>}
      <AnimatePresence>
        {isStarted && <Start video={video} isStarted={isStarted} setisStarted={setisStarted}></Start>}
      </AnimatePresence>
    </div>
  )
}
