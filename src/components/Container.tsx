import React from 'react'
import { BiSolidDropletHalf } from 'react-icons/bi'
import { FaThermometerEmpty } from 'react-icons/fa'
import { FiWind } from 'react-icons/fi'
import { GiSunrise, GiSunset } from 'react-icons/gi'
import { FaTemperatureArrowUp, FaTemperatureArrowDown } from 'react-icons/fa6'
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from 'react-icons/tb'


export default function Container(){

  const detailedInfo = [
    {
      id:1, 
      Icon: FaThermometerEmpty,
      Title: "Feels like",
      value: "22°",
    },
    {
      id:2, 
      Icon: BiSolidDropletHalf,
      Title: "Humidity",
      value: "40%",
    },
    {
      id:3, 
      Icon: FiWind,
      Title: "Wind Speed",
      value: "11 km/h",
    },
  ]

  const otherInfo = [
    {
      id:1, 
      Icon: GiSunrise,
      Title: "Sun Rise",
      value: "5:33 AM",
    },
    {
      id:2, 
      Icon: GiSunset,
      Title: "Sun Set",
      value: "6:34 PM",
    },
    {
      id:3, 
      Icon: FaTemperatureArrowUp,
      Title: "Highest",
      value: "32°",
    },
    {
      id:4, 
      Icon: FaTemperatureArrowDown,
      Title: "Lowest",
      value: "11°",
    },
  ]
  return (
    <div>
      <div className='flex flex-row w-1/4 items-center justify-center'>
        <TbTemperatureCelsius size={35} className=' text-blue-500 transition ease-in-out delay-50 hover:scale-125 cursor-pointer' />
        <p className='text-2xl font-medium mx-1 text-blue-500'>|</p>
        <TbTemperatureFahrenheit size={35} className=' text-blue-500 transition ease-in-out delay-50 hover:scale-125 cursor-pointer'/>
      </div>

      <div className='flex items-center justify-center my-6'>
        <p className='text-xl font-extralight'>
            Thursday, 05 December 2024 | Local Time: 12:03 PM
        </p>
      </div>

      <div className='flex items-center justify-center my-3'>
        <p className='text-3xl font-medium'>Cuddalore, India</p>
      </div>
      <div>
        <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
          <p> Rain </p>
        </div>

        <div className='flex flex-row items-center justify-between py-3'>
          <img src='https://openweathermap.org/img/wn/01d@2x.png' alt='weather icon' className='w-20 h-20' />
          <p className='text-5xl'> 30° </p>

          <div className='flex space-y-3 flex-col items-start'>

            {
              detailedInfo.map(({id, Icon, Title, value}) => (
                <div key={id} className='flex font-light text-sm items-center justify-center'><Icon size={22} className='mr-1' />{`${Title}:`}
            <span className='font-medium ml-1'> {value}</span></div>
              ))
            }
          </div>
        </div>

        <div className='flex flex-row items-center justify-center space-x-10 text-sm py-3'>

          {
            otherInfo.map(({id, Icon, Title, value}) => (
              <div key={id} className='flex flex-row items-center'>
                <Icon size={30} />
                <p className='font-light ml-1'>
                  {`${Title}: `}
                    <span className='font-medium ml-1'>{value}</span>
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
