import Content from 'components/Detail/Content'
import React from 'react'
import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
export default function 
() {
  return (
    <div>
         {/* <CustomCard
        style={{ paddingTop: 150, minHeight: '100vh' }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
    >
          <Content/>
    </CustomCard> */}
       <Content/>
    </div>
  )
}
