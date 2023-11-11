import React from 'react'

import {IoLocationOutline} from 'react-icons/io5'
import {HiOutlineMailOpen,HiOutlinePhone} from 'react-icons/hi'


import {location,email,sendemail,phone,call} from '../data/contact'

export default function Contact() {
   return (
      <div className='text-white'>
         <div className='flex justify-center text-5xl font-semibold'>Get in Touch</div>
         <div className='flex justify-center mt-16'>
            <div className=' w-[30vw] items-center'>
               <div className='text-4xl flex  p-10'>Contact me</div>
               <div className='space-y-10 p-10 ml-5'>
                  <div className='flex gap-5 items-center text-2xl'>
                     <div ><IoLocationOutline fontSize={35} className='text-red-600'/></div>
                     <div >{location}</div>
                  </div>
                  <div >
                     <a href={sendemail} className='flex gap-5 items-center  text-2xl'>
                        <div ><HiOutlineMailOpen fontSize={35} className='text-green-600'/></div>
                        <div>{email}</div>
                     </a>
                  </div>
                  <div >
                     <a href={call} className='flex gap-5 items-center  text-2xl'>
                        <div><HiOutlinePhone fontSize={35} className='text-blue-600'/></div>
                        <div>{phone}</div>
                     </a>
                  </div>
               </div>
            </div>
            <div className=' w-[30vw] space-y-5 p-6 text-black'>
               <div className='flex gap-5'>
                  <input type="text" placeholder='Your Name...' className='w-[13vw] h-10 outline-none p-3 ' />
                  <input type="text" placeholder='Your Phone Number...' className='w-[13vw] h-10 outline-none p-3 '/>
               </div>
               <div><input type="text" placeholder='Your Email...' className='w-[27vw] h-10 outline-none p-3 '/></div>
               <div><textarea placeholder="Your message..." rows="5" className='w-[27vw]  outline-none p-3 ' ></textarea></div>
               <button type="submit" className='bg-blue-600 text-black p-2 w-[8vw] justify-center flex rounded-xl hover:bg-blue-800 hover:text-white text-lg '>Send Massage</button>
            </div>
         </div>
      </div>
   )
}
