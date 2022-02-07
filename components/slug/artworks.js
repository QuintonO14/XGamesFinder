import { useState } from "react"
import Lightbox from "react-image-lightbox"
import 'react-image-lightbox/style.css';
import { motion } from "framer-motion";

const Artworks = ({works}) => {
    const [gamesArt, setArt] = useState(10)
    const [isOpen, setOpen] = useState(false)
    const [photoIndex, setIndex] = useState(0)
    const images = works.slice(0,10).map((image) => {return image.url.replace('t_thumb', 't_screenshot_big')})
    
    const showMore = () => {
        if(gamesArt === 10) {
        setArt(works.length)
        } else {
            setArt(10)
        }
    }

    const variants = {
      visible: i => ({
        opacity: 1,
        transition: {
          delay: i * 0.1,
        },
      }),
      hidden: { opacity: 0}
    }
    
    return (
    <>
        <div className="block w-3/4 md:w-full items-center text-center my-2"> 
        {works.slice(0, gamesArt).map((image, i) => {
            return  <motion.img
             key={image.id} 
             custom={i}
             initial="hidden"
             animate="visible"
             variants={variants}
             className="rounded-md inline-block m-1" 
             onClick={() => setOpen(true)} 
             src={`https://${image.url.substring(2)}`}
             alt="game_cover"  /> 
        })}
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            enableZoom={true}
            onCloseRequest={() => setOpen(false)}
            onMovePrevRequest={() =>
              setIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setIndex((photoIndex + 1) % images.length)
            }
          />
        )}
        </div>
        {works.length > 9 && (
          <button 
          className="bg-secondary m-2 text-xwhite hover:bg-tertiary rounded-lg p-2 
          md:p-1 border-2 border-xwhite hover:border-primary hover:text-primary
          md:hover:border-secondary md:hover:text-secondary"
          onClick={showMore}>{gamesArt === 10 ? 'See More' : 'See Less'}
          </button>
        )}
    </>
    )
}

export default Artworks