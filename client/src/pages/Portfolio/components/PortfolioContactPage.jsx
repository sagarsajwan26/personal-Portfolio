import React from 'react'
import Button from '../../../Components/input/Button'
import { useNavigate } from 'react-router-dom'

const PortfolioContactPage = () => {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen my-10 md:my-[10vw] py-10 md:py-[10vw] px-4 md:px-[10vw] grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-[3vw] font-[Urbanist] items-center'>
      <div className='flex flex-col items-center lg:items-start justify-between gap-8 lg:gap-0 text-center lg:text-left'>
        <div>
          <h4 className='text-2xl md:text-3xl lg:text-[2.5vw] font-bold mb-5 uppercase text-[#4f4b4b]'>
            {' '}
            Sagar sajwan
          </h4>
          <h1 className='text-4xl md:text-6xl lg:text-[7vw] font-bold leading-tight lg:leading-[0.8]'>
            Work <br />
            with me
          </h1>
        </div>

        <div className='text-lg md:text-xl font-[Besley]'>
          <p className='mb-2'>123 Any where St. Any City , st 12345</p>
          <p className='mb-2'>+91 7454823359</p>
          <p className='mb-4'>sagarsajwan26@gmail.com</p>

          <Button
            onClick={() => navigate('/sagarsajwan/contact')}
            className='mt-5 rounded-full hover:bg-black hover:text-white px-6 py-3'
            label='Contact'
          />
        </div>
      </div>

      <div className='flex justify-center lg:justify-end'>
        <img
          className='h-64 md:h-80 lg:h-full w-64 md:w-80 lg:w-[60%] object-cover rotate-3 lg:rotate-6 grayscale-50 rounded-lg'
          src='https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
        />
      </div>
    </div>
  )
}

export default PortfolioContactPage
