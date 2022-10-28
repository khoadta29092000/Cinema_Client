import Content from 'components/Detail/Content'
import React from 'react'
import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import DefaultNavbar from 'components/DefaultNavbar';
export default function
  () {
  return (
    <div>
      <div className="absolute mb-20 bg-black w-full z-20">
        <DefaultNavbar />
      </div>


      <Content />
    </div>
  )
}
