import React from 'react'
import {education, certificate} from '../data/education'

import{BsPatchCheck} from 'react-icons/bs'

export default function Education() {
   return (
      <div>
         <div className='flex justify-center text-white'>
            <div>
               <div className='flex justify-center text-5xl font-semibold'>Education</div>
               <div className='mt-10 grid grid-cols-2 gap-4 w-[65vw]'>
                  {education.map((item)=>(
                     <div className='flex p-5 m-5 space-y-5 text-lg border-2 place-items-center rounded-3xl bg-cyan-200 bg-opacity-30'>
                        <div className='w-[15vw] justify-center flex '><img src={item.logo} alt='logo' className='' draggable='false' /></div>
                        <div className='p-3 space-y-3 text-lg font-semibold text-black'>
                           <div>{item.couse}</div>
                           <div>{item.institute}</div>
                           <div>{item.start} {item.finish.length===0 ? "" : `to ${item.finish}` }</div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>  
         </div>
         <div className='flex justify-center mt-10 mb-12 text-white'>
            <div>
               <div className='flex justify-center text-5xl font-semibold '>Certificate</div>
               <div className='mt-10 grid grid-cols-2 gap-4 w-[65vw]'>
                  {certificate.map((item)=>(
                     <div className='flex justify-between p-5 m-5 space-y-5 text-lg border-2 place-items-center rounded-3xl bg-cyan-200 bg-opacity-30'>
                        <div className='flex gap-5 place-items-center'>
                           <div className='w-[15vw] justify-center block '><img src={item.certificateSrc} draggable='false' alt='logo' className='h-[10vw]'/></div>
                           <div className='items-start space-y-3 text-xl font-semibold text-black '>
                              <div className=''>
                                 <div>Course : {item.course}</div>
                                 <div>Institute : {item.institute}</div>
                                 <div>Date : {item.date}</div>
                              </div>
                           
                           </div>
                        </div>
                        <a className='text-green-600'  target="_blank" rel="noreferrer" href={item.verify} ><BsPatchCheck fontSize={30}/></a>
                     </div>
                  ))}
               </div>
            </div>  
         </div>
      </div>
      
   )
}
