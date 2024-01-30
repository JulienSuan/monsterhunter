import React, { useRef, useState } from 'react'
import "./Start.css"
import {motion} from "framer-motion"
import useMouse from '@react-hook/mouse-position'
import Palico from '../Palico/Palico'
import sound from "../../sounds/start.mp3"

const newSoung = new Audio(sound)


newSoung.volume = .1


export default function Start({setisStarted, isStarted}) {

    const mouseref = useRef(null)
    const [coords, setcoords] = useState({
        x: 0,
        y: 0
    });

    const mouse = useMouse(document.body)
    const [isClicked, setisClicked] = useState(false);
    const handleClick = () => {
        newSoung.play()
        setTimeout(() => {
            
            setisStarted(false)
        }, 1000);
        setcoords({
            x: mouse.x, 
            y: mouse.y
        })
        setisClicked(true)
    }


  return (
    <motion.div  exit={{opacity: 0}} onClick={() =>  handleClick()}  ref={mouseref} className='start__container'>
        <Palico text={"Bonjour Chasseur ! Voilà le tips d'aujourd'hui ! Savez vous que les popos peuvent manger un tigrex !?"}></Palico>
        <motion.div  initial={{ scale: 1, opacity: 0.1 }}
        animate={isClicked ? { scale: 3, opacity: 1, x: coords.x, y: coords.y } : { scale: 1, opacity: 0.1, x: mouse.x, y: mouse.y }} style={isClicked ? {scale: 1.25, opacity: 1} : {scale: 1, opacity: .1}}  className="start__container__tampon">
        </motion.div>
    </motion.div>
  )
}
