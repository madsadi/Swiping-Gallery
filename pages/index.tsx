import type { NextPage } from 'next'
import SwipingGallery from '../component/SwipingGallery'
import Lake from '../public/lake.jpg'
import ManDog from '../public/man-and-dog.jpg'
import River from '../public/river-in-forest.jpg'
import WatterFall from '../public/watterfall.jpg'

const images:object[]=[
    {
        original: Lake,
        thumbnailHeight: 76,
        thumbnailWidth: 97
    },
    {
        original: ManDog,
        thumbnailHeight: 76,
        thumbnailWidth: 97
    },
    {
        original: River,
        thumbnailHeight: 76,
        thumbnailWidth: 97
    },
    {
        original: WatterFall,
        thumbnailHeight: 76,
        thumbnailWidth: 97
    },
]

const Home: NextPage = () => {
  return (
      <SwipingGallery images={images}/>
  )
}

export default Home
