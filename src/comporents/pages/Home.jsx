import React from 'react'


import {BiSolidDownload} from 'react-icons/bi'

import Me from '../documents/image/me.png'
import CV from '../documents/cv_hk_damith_deshan.pdf'
import {links} from '../data/SocialMedia'

export default function Home() {
   return (
      <div className='flex justify-between p-16 ml-32 mr-32'>
         <div className='grid items-center justify-center pl-24 m-5 text-white '>
            <div className='text-3xl'>Hello Guys, I'm</div>
            
            <div className='-mt-5 font-semibold text-7xl'>
               <div>H.K. Damith </div>
               <div>Deshan Rajapaksha</div>
            </div>
            
            <div className='text-lg font-bold tracking-widest'>Softwere Engineer (intern) | Web Developer (intern) </div>
            
            <div className='-mt-5 w-[30vw] indent-10 '>
               I'm currently student at Sri Lanka Institute of Advanced Technological Education.
               I'm successfully complete my acadamiic program in Higher National Diploma in Information Technology in Labuduwa.
            </div>
            
            <div className='flex gap-6 '>
               {links.map((item)=>(
                  <a href={item.link} target="_blank" rel="noreferrer">
                     <button id={item.id} class={item.style}>
                        <i class={item.icon}></i>
                     </button>
                  </a>
               ))}
            </div>
            <a href={CV} className='flex gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded w-[8vw] items-center justify-items-center justify-center h-10 outline outline-offset-2 outline-cyan-500'>
               <BiSolidDownload fontSize={25}/>
               <span>See My CV</span>
            </a>
         </div>
         <div className='w-[30vw] md:shrink-0'>
            <img src={Me} draggable='false' alt='Damith_Deshan'/>
         </div>
      </div>
   )
}
