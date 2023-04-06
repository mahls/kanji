import React from 'react'
import {useState, useEffect} from 'react'
import { motion } from "framer-motion"
import { useTransition } from 'react-transition-state';
import { BsFillCaretDownSquareFill } from 'react-icons/bs';
import '../../App.css'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon, ChevronDownIcon } from '@chakra-ui/icons'


export const FlashCard = () => {

  const [allKanji, setallKanji] = useState([])
  const [randomKanji, setRandomKanji] = useState('');
  const [index, setIndex] = useState(0);
  const [characterInfo, setCharacterInfo] = useState({});

  const [frontShowing, setFrontShowing] = useState(true);

  const [gradeMenu, setGradeMenu] = useState(false);
  const [gradeSelected, setGradeSelected] = useState("grade-1");

  useEffect(() => {
    fetch('https://kanjiapi.dev/v1/kanji/grade-1')
        .then(response => response.json())
        .then(data => setallKanji(data));
  }, []);

  useEffect(() => {
    fetch(`https://kanjiapi.dev/v1/kanji/${gradeSelected}`)
        .then(response => response.json())
        .then(data => setallKanji(data));
  }, [gradeSelected])

  useEffect(() => {
       fetch(`https://kanjiapi.dev/v1/kanji/${randomKanji}`)
        .then(response => response.json())
        .then(data => setCharacterInfo(data)); 
  }, [randomKanji])

  useEffect(() => {
    let randomNumber = Math.floor(Math.random() * 80);
    let randomKanji = allKanji[randomNumber];
    setRandomKanji(randomKanji);
    setIndex(randomNumber);
  }, [allKanji])  
  
   let getRandomKanji = () => {
    let randomNumber = Math.floor(Math.random() * 80);
    let randomKanji = allKanji[randomNumber];
    setRandomKanji(randomKanji);
    setIndex(randomNumber);
    console.log(randomNumber);
    console.log(characterInfo);
  };

  let toggleGradeMenu = () => {
    console.log("menu");
    setGradeMenu(!gradeMenu);
    console.log(gradeMenu);
  };

  let handleGradeSelect = (grade) => {
      setGradeSelected(grade);
      console.log(gradeSelected);
      setGradeMenu(false);
  }

  let handleNext = () => {

  }

  let SelectMenu = () => {
    return (
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon /> } colorScheme="black">
        select grade
        </MenuButton>
        <MenuList>
          <MenuItem onClick={()=>{handleGradeSelect("grade-1")}}>grade 1</MenuItem>
          <MenuItem onClick={()=>{handleGradeSelect("grade-2")}}>grade 2</MenuItem>
          <MenuItem onClick={()=>{handleGradeSelect("grade-3")}}>grade 3</MenuItem>
        </MenuList>
      </Menu>
    )
  }

  let menu = <div><p onClick={toggleGradeMenu} className="cursor-pointer pt-1"><BsFillCaretDownSquareFill className="text-stone-400"/></p></div>

  let buttonStyle="bg-stone-900 rounded-sm border-2 border-stone-600 bg-stone-700 w-32";
  let gradeOptionStyle="cursor-pointer px-2 border-t-2 border-stone-900 hover:bg-stone-700"


  return (

    <div className="flex content-center justify-center">

      <div className="rounded-sm border-2 border-emerald-600 bg-stone-800 w-7/12 shadow-xl shadow-emerald-600 ">

        <div className="px-2 flex justify-between ">

          <div className="">kyōiku kanji {gradeSelected}</div>
          <SelectMenu/>
        </div>

        {
          gradeMenu &&
          <div className="z-50">  
            <div onClick={()=>{handleGradeSelect("grade-1")}} className={gradeOptionStyle}><p>grade 1</p></div>
            <div onClick={()=>{handleGradeSelect("grade-2")}} className={gradeOptionStyle}><p>grade 2</p></div>
            <div onClick={()=>{handleGradeSelect("grade-3")}} className={gradeOptionStyle}><p>grade 3</p></div>
          </div>
        }
      
        
        <div className="bg-stone-900 px-2 pt-2">
          <p>index: {index}</p>
        </div>

        <div className="flex justify-center bg-stone-900 px-5 py-5">
            <motion.div className="text-9xl">{randomKanji}</motion.div>
        </div>

        <div className="flex flex-col align-center center  justify-center bg-stone-900 px-5 py-5">
          <div>meaning: {characterInfo.heisig_en}</div>
          <div>kun: {characterInfo.kun_readings ==  undefined ? '' : characterInfo.kun_readings[0]}</div>
          <div>yoni: {characterInfo.on_readings == undefined ? '' : characterInfo.on_readings[0]}</div>
        </div>

        <div className="py-2 flex bg-stone-900 border-stone-700 justify-center px-2">
          <div className="mr-2"><button className={buttonStyle + ""}>previous</button></div> 
          <div className="randomKanjiBtn"><button className={buttonStyle} onClick={getRandomKanji}>random</button> </div>
          <div className="ml-2"><button className={buttonStyle + ""}>next</button> </div>
        </div>

      </div>

    </div>
    
  )
}



