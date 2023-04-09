import React from 'react'
import {useState} from 'react'
import {motion} from 'framer-motion'

export const CustomButton = ({text, task, style}) => {

  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [buttonScale, setbuttonScale] = useState(1);

  let mouseTrue =()=>{
    setIsMouseEnter(true); 
    setbuttonScale(2);
  };

  let mouseFalse =()=>{
    setIsMouseEnter(false);
    setbuttonScale(1);
  };

  let containerStyle = "align-center justify-center flex border rounded border-stone-600 w-28 h-6 bg-transparent overflow-hidden cursor-pointer hover:border-stone-500 transition ease-in-out" + " " + style;

  return (
    <>
      <div className={containerStyle} onClick={task}>
        <div className="absolute px-2 pb-2"><p className="relative z-50 right-0.7 bottom-0.5 text-md text-stone-300 " onMouseEnter={mouseTrue} onMouseOut={mouseFalse}>{text}</p></div>
        <motion.div
    initial={{ opacity: 1, scale: buttonScale }}
    animate={{ opacity: 1, scale: buttonScale }}
    transition={{ duration: 0.5 }}
            
            className=" z-30 bg-stone-900 rounded-full blur-sm w-24 h-18 shadow-sm overflow-clip"></motion.div>
        <motion.div
            whileHover={{
            scale: 3,
            transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}

    className="z-20 bg-stone-900 rounded-full blur-sm w-24 h-18 opacit- shadow-sm overflow-clip"></motion.div>
      </div>
    </>
  )
}
