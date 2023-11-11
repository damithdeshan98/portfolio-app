import React from 'react'

import Me from '../documents/image/me.png'

import {name, email, call, birthDay,location } from '../data/contact'
import {links} from '../data/SocialMedia'
import {whatido} from '../data/whatIDo'

export default function About() {
   
   return (
      <div className='text-white'> 
         <div className='flex justify-center gap-16 pl-24 pr-24 mt-10 ml-40 mr-40 '>
            <div className='grid justify-items-center'>
               <div className='w-[25vw] '>
                  <img src={Me} draggable='false' alt='Damith_Deshan'/>
               </div>
               <div className='mt-5 text-4xl'>{name}</div>
            </div>
            <div>
               <div className='text-5xl font-semibold '>Biography</div>
               <div className='w-[45vw] indent-14 text-lg mt-8 text-gray-300'>
                  Now learning React.JS and NodeJS. My coursework and extracurricular activities have honed my problem-solving 
                  skills and collaborative mindset. I am motivated to learn from experienced professionals and apply my 
                  skills to real-world challenges. I am excited about the opportunity to contribute and grow as a software 
                  developer.
               </div>
               <div className='mt-5 space-y-4 text-lg ml-14'>
                  <div  className='flex gap-5'>
                     <div>Name :</div>
                     <div className='text-gray-400'>{name}</div>
                  </div>  
                  <div  className='flex gap-5'>
                     <div>Birth Day :</div>
                     <div className='text-gray-400'>{birthDay}</div>
                  </div>
                  <div className='flex gap-5'>
                     <div >Phone No :</div>
                     <div><a className='text-gray-400 hover:text-green-400' href={call} target="_blank" rel="noreferrer">Voice Call ?</a></div>
                  </div>
  
                  <div className='flex gap-5'>
                     <div>Email :</div>
                     <div className='text-gray-400'>{email}</div>
                  </div>
                  <div  className='flex gap-5'>
                     <div>Location :</div>
                     <div className='text-gray-400'>{location}</div>
                  </div>
   
               </div>
               <div className='mt-10'>
                  <div className='flex gap-6 '>
                     {links.map((item)=>(
                        <a href={item.link} target="_blank" rel="noreferrer">
                           <button id={item.id} class={item.style}>
                              <i class={item.icon}></i>
                           </button>
                        </a>
                     ))}
                  </div>
               </div>
            </div>
         </div>
         <div className='gap-16 pt-10 pl-24 pr-24 mt-10 ml-40 mr-40 border-t-4 border-double'>
            <div className='text-5xl font-semibold '>What I do ? </div>
            <div className='grid grid-cols-3 gap-10 p-10 '>
               {whatido.map((item)=>(
                  <div className='p-5 bg-sky-500 bg-opacity-40 rounded-3xl'>
                     <div className='text-gray-400'><i class={item.icon} ></i></div>
                     <div className='mt-4 mb-4 text-2xl font-semibold'>{item.title}</div>
                     <div className='text-gray-400'>{item.discription}</div>
                  </div>
               ))}  
            </div>
         </div>
      </div>
   )
}

