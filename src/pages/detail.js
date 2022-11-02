import Content from 'components/Detail/Content'
import React from 'react'
import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import DefaultNavbar from 'components/DefaultNavbar';
import Header from 'components/Detail/Header';
import DefaultFooter from 'components/DefaultFooter';
export default function
  () {
  return (
    <>
    <div className="absolute mb-20 bg-black w-full z-20">
        <DefaultNavbar />
    </div>
    <main className=''>
     <Header />
     <Content />
    </main>
    <DefaultFooter className="mt-20"/>
</>

  )
}
