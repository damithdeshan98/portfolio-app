import React from 'react'

import {group,individual} from '../data/Projects'

import {SiGithub} from 'react-icons/si'

const projectdata = (type)=>{
   return(
      <div>
         <div className='ml-10'>
            {type.map((project)=>(
               <div className='p-5 pl-10 mt-10 mr-10 text-xl border-2 rounded-3xl'>
                  <div className='flex justify-center mb-8 text-2xl text-teal-300 underline'>{project.title}</div>
                  <div className='flex gap-10'>
                     <div className='min-w-[25vw] max-w-[25vw]'><img src={project.imageSrc} draggable='false' alt='logo' className='w-[28vw]' /></div>
                     <div className='space-y-4'>
                        <div className='flex gap-5'>Programming Languages : 
                           <div className='text-xl font-bold text-sky-500'>{project.languages}</div>
                        </div>
                        {project.database ? 
                           <div className='flex gap-5 '>
                              <div>Database : </div> 
                              <div className='text-xl font-bold text-sky-500'>{project.database}</div>
                           </div> 
                        :
                           ""
                        }
                        <div>
                           <div> Discription :</div>
                           <div className='indent-16'> {project.discription}</div>
                        </div>
                     </div>
                  </div>
                  <div className='flex justify-center mt-5 '>
                     <a href={project.gitlink} target="_blank" rel="noreferrer">
                        <SiGithub fontSize={45} className=''/>
                     </a>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default function Project() {
   return (
      <div className='flex justify-center text-white'>
         <div>
            <div className='flex justify-center text-5xl font-semibold '>My Projects</div>
            <div className='w-[60vw] flex mt-10 '>
               <div>
                  <div >
                     <div className='mb-5 text-3xl font-semibold text-green-400'>A c a d e m i c p r o j e c t</div>
                     {projectdata(group)}
                  </div>
                  <div className='mt-12 mb-12' >
                     <div className='mb-5 text-3xl font-semibold text-green-400'>S e l f - m o t i v a t e d p r o j e c t</div>
                     {projectdata(individual)}
                  </div>
               </div> 
            </div>
         </div>
      </div>
   )
}
