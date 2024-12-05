import React from 'react'
import Image from 'next/image';

export default function Forecast({title, data}) {
  
  return (
    <div>
       <div className='flex items-center justify-start mt-6'>
        <p className='font-medium uppercase'>{title}</p>
       </div>

       <hr className='my-1' />

       <div className='flex items-center justify-between'>
          {data.map((d, index)=>(
            <div key={index} className='flex flex-col items-center justify-center'>
              <p className='font-light text-sm'>{d.title}</p>
              <Image
                src={d.icon}
                alt="alt"
                width={96}
                height={96}
                className="w-12 my-1"
              />
              <p className='font-medium'>{d.temp.toFixed()}°</p>
            </div>
          ))}
       </div>
    </div>
  )
}