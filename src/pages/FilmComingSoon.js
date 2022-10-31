import DefaultFooter from 'components/DefaultFooter'
import DefaultNavbar from 'components/DefaultNavbar'
import Content from 'components/FilmComingSoon/Content'
import React from 'react'

export default function FilmComingSoon() {
  return (
    <>
    <div className="absolute mb-20 bg-black w-full z-20">
        <DefaultNavbar />
    </div>
    <main className='pt-20'>
        {/* <Header /> */}
        <Content />
    </main>
    <DefaultFooter className="mt-20"/>
</>
  )
}
