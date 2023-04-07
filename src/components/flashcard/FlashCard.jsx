import React from 'react'
import {useState, useEffect} from 'react'
import { motion } from "framer-motion"
import { useTransition } from 'react-transition-state';
import { BsFillCaretDownSquareFill, BsEyeSlash, BsEye } from 'react-icons/bs';
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
import { ChevronDownIcon } from '@chakra-ui/icons'


export const FlashCard = () => {

  const [allKanji, setallKanji] = useState([])
  const [randomKanji, setRandomKanji] = useState('');
  const [index, setIndex] = useState(0);
  const [characterInfo, setCharacterInfo] = useState({});

  const [frontShowing, setFrontShowing] = useState(true);

  const [gradeMenu, setGradeMenu] = useState(false);
  const [gradeSelected, setGradeSelected] = useState("grade-1");

  const [isNext, setIsNext] = useState(false);
  const [nextKanji, setNextKanji] = useState("");

  const [isRandom, setIsRandom] = useState(null);

  const [showInfo, setShowInfo] = useState(false);


  useEffect(() => {
    fetch('https://kanjiapi.dev/v1/kanji/grade-1')
        .then(response => response.json())
        .then(data => setallKanji(data));
  }, []);

  useEffect(() => {
    fetch(`https://kanjiapi.dev/v1/kanji/${gradeSelected}`)
        .then(setIsNext(false))
        .then(response => response.json())
        .then(data => setallKanji(data));
  }, [gradeSelected])

  useEffect(() => {
       fetch(`https://kanjiapi.dev/v1/kanji/${randomKanji}`)
        .then(response => response.json())
        .then(data => setCharacterInfo(data)); 
  }, [randomKanji])

  let getNextKanjiInfo = () => {
       fetch(`https://kanjiapi.dev/v1/kanji/${nextKanji}`)
        .then(response => response.json())
        .then(data => setCharacterInfo(data)); 
  }

  useEffect(() => {
    let randomNumber = Math.floor(Math.random() * 80);
    let randomKanji = allKanji[randomNumber];
    setRandomKanji(randomKanji);
    setIndex(randomNumber);
  }, [allKanji])  
  
   let getRandomKanji = () => {
    setIsNext(false);
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
    if(index > 30){
      setIndex(0);
      console.log(index);
      console.log('bigger');
    };
    setIndex(index + 1);
    console.log(index);
    let indexedKanji = allKanji[index];
    setNextKanji(indexedKanji);
    setIsNext(true);
    getNextKanjiInfo();
  }

  let toggleInfo = () => {
    setShowInfo(!showInfo);
    console.log(showInfo);
  };

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

  // fix index async state problem, previous button 

  return (
    

    <div className="flex content-center justify-center">
        
    <div className="fixed w-7/12 z-0 shadow-2xl shadow-emerald-700 h-96 animate-pulse rounded-4xl"></div>
      <div className="rounded-sm border-2 z-50 border-emerald-400 bg-stone-800 w-7/12 shadow-md shadow-emerald-300 ">

        <div className="px-4 flex justify-between ">

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
        
        <div className="bg-stone-900 px-4 pt-2">
          <p>index: {index}</p>
        </div>

        <div className="flex justify-center bg-stone-900 px-5 pt-8 h-46 py-5">
            <motion.div className="text-9xl">{ isNext ? nextKanji : randomKanji } </motion.div>
        </div>
  
        { showInfo ?
          <div className="flex flex-col align-center center  justify-center bg-stone-900 px-5 py-5">
            <div>meaning: { characterInfo.heisig_en}</div>
            <div>kun: {characterInfo.kun_readings ==  undefined ? '' : characterInfo.kun_readings[0]}</div>
            <div>yoni: {characterInfo.on_readings == undefined ? '' : characterInfo.on_readings[0]}</div>
          </div>
          : 
          <div className="flex flex-col align-center center  justify-center bg-stone-900 px-5 py-5">
            <div className="text-stone-900">meaning: { characterInfo.heisig_en}</div>
            <div className="text-stone-900">kun: {characterInfo.kun_readings ==  undefined ? '' : characterInfo.kun_readings[0]}</div>
            <div className="text-stone-900">yoni: {characterInfo.on_readings == undefined ? '' : characterInfo.on_readings[0]}</div>
          </div>
        }
        <div className="py-2 flex bg-stone-900 border-stone-700 px-4 pt-4 justify-between">
          <div className="bg-stone-900 border-stone-700 mr-20 cursor-pointer" onClick={toggleInfo}>{showInfo ? <BsEye/> : <BsEyeSlash/>}</div>
          <div className="flex pr-20">        
            <div className="mr-2"><button className={buttonStyle + ""}>previous</button></div> 
            <div className="randomKanjiBtn"><button className={buttonStyle} onClick={getRandomKanji}>random</button> </div>
            <div className="ml-2"><button className={buttonStyle + ""} onClick={handleNext}>next</button> </div>
          </div>
          <div></div>
        </div>
      </div>

    </div>
    
  )
}


const Foo = () => {
  const [allKanji] = useState([]);
  const [index, setIndex] = useState(0);

  const getCharacterInfo = (index) => {
    const nextKanji = allKanji[index];
    // API call and state update;
  };

  const handleNext = () => {
    const nextIndex = index > 30 ? 0 : index + 1;
    setIndex(nextIndex);
    getCharacterInfo(nextIndex);
  }
  
  const nextKanji = allKanji[index];

  return null;
};
