import React from 'react'
import classNames from 'classnames';
import {Link, useLocation} from 'react-router-dom'

import {NavBar} from '../shared/Navbar'


export default function Hedder() {

   const { pathname } = useLocation();

   return (
      <div className='sticky top-0 flex justify-between w-auto h-16 p-5 mt-5 mb-5' >
         <div className='flex ml-16 text-3xl text-white'>H.K. Damith Deshan</div>
         <div className='flex gap-10 mr-16 text-xl text-center '>
            {NavBar.map((item)=>(
               <Link to={item.path} className='hover:no-underline'>
                  <div className={classNames(`${pathname === item.path ? 'text-white' : 'text-neutral-500'}`)}>
                     <span className='flex gap-5 text-xl '>{item.label}</span>
                  </div>
               </Link>
            ))}
            
         </div>
      </div>
   )
}
