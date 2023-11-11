import React from 'react'
import ProgressBar from "@ramonak/react-progress-bar";

import {frontend,backend,database,other,technical} from '../data/skills'

const skill = (skill)=>{
   return(
      <div>
         <div className='grid grid-cols-2 mt-3 gap-x-20 gap-y-3'>
            {skill.map((data)=>(
               <div className='flex '>
                  <table >
                     <tr>
                        <td className='flex justify-between text-lg'>
                           <div>{data.title}</div>
                           <div>{data.presentage} %</div>
                        </td>
                     </tr>
                     <tr>
                        <td><ProgressBar width='500px' completed = {data.presentage}  bgColor = '#5eead4' animateOnRender = {true} isLabelVisible = {false} /> </td>
                     </tr>
                  </table>
               </div>
            ))}
         </div>
      </div>
   )
}

export default function Skill() {
   return (
      <div className='justify-center gap-16 pl-24 pr-24 mt-5 ml-40 mr-40 '>
         <div className='p-16 text-white '>
            <div>
               <div className='flex justify-center text-5xl font-semibold'>Programming Skills</div>
               <div className='flex justify-center pl-12 pr-12 mt-5 text-lg text-center'>I have worked with many different programming languages. I use React JS for web applications. I fall into Java when I'm building prototypes or working on my hobby projects.</div>
{/*--------------------------------------------------------Front End Skills------------------------------------------------------------------*/}  
               <div className='p-5 pl-12 mt-10 '>
                  <div className='flex justify-start text-2xl font-semibold underline text-sky-300'>Front End</div>
                  {skill(frontend)}
               </div>
{/*---------------------------------------------------------Back end Skills-------------------------------------------------------------*/}
               <div className='p-5 pl-12 mt-10'>
                  <div className='flex justify-start text-2xl font-semibold underline text-sky-300'>Back End</div>
                  {skill(backend)}
               </div>
{/*---------------------------------------------------------Database -------------------------------------------------------------*/}
               <div className='p-5 pl-12 mt-10 '>
                  <div className='flex justify-start text-2xl font-semibold underline text-sky-300'>Database</div>
                  {skill(database)}
               </div>
{/*----------------------------------------------------------Other Skills----------------------------------------------------------------*/}
               <div className='p-5 pl-12 mt-10 '>
                  <div className='flex justify-start text-2xl font-semibold underline text-sky-300'>Other</div>
                  {skill(other)}
               </div>
            </div>

            <div>
               <div className='flex justify-center mt-16 text-5xl font-semibold'>Technical Skills</div>
               <div className='grid grid-cols-4 mt-16 gap-x-20 gap-y-3'>
                  {technical.map((data)=>(
                     <div className='grid justify-center space-y-3 justify-items-center'>
                        <div ><img className='w-[5vw] h-[5vw]' src ={data.icon} alt={data.id} draggable='false'/></div>
                        <div className='text-lg'>{data.title}</div>
                     </div>
                  ))}
               </div>
            </div>
            
         </div>
      </div>
   )
}
