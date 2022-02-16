import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from 'next/image'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
import Videos from "./videos";

const Modes = ({title}) => {
    const [index, setIndex] = useState(0)
    const [mode, setMode] = useState(title.game_modes ? title.game_modes[0] : null)
    const platform = title.platforms.map((plat) => {return plat.abbreviation})
    const playstation = platform.includes('PS1') || platform.includes('PS2') || platform.includes('PS3') ||
    platform.includes('PS4') || platform.includes('PS5')
    const computer = platform.includes('PC')
    const nintendo = platform.includes('Switch')
    useEffect(() => {
        if(mode) {
            const timerId = setInterval(
                () => setIndex((i) => (i + 1) % title.game_modes.length),
                2000
            );
            setMode(title.game_modes[index])
            return () => clearInterval(timerId)
        } 
    }, [index])


    console.log(title)
    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: { staggerChildren: 1, duration: 1}}}
        className="text-center bg-secondary text-xwhite flex flex-col w-full lg:w-2/3 mt-1 px-4">
        
        {title.summary && (
            <p 
            className="w-full text-left text-white bg-primary p-3 text-lg border-tertiary border-2">
                {title.summary}
            </p>
        )}

        <h2 className="text-xl font-bold mt-4">Modes:</h2>
        {mode ? (
        <p className="uppercase">{mode.name}</p>
        ) : 
        <p>No Known Modes</p> }
        
        {platform != 'XONE' && (
        <div className="my-2 w-full text-center">
            <h2 className="text-xl font-bold">Other Platforms</h2>
            <div className="flex justify-evenly h-auto p-1">
            {playstation && (
                <figure>
                <Image height={50} width={50} src="/playstation.svg" alt="playstation" />
                <figcaption>Playstation</figcaption>
                </figure>
            )}
            {computer && (
                <figure>
                <Image height={50} width={50} src="/computer.svg"  alt="pc" />
                <figcaption>PC</figcaption>
                </figure>
            )}
            {nintendo && (
                <figure>
                <Image height={50} width={50} src="/switch.svg" alt="switch"/>
                <figcaption>Switch</figcaption>
                </figure>
            )}
            </div>
        </div>
        )}

        <strong className="m-4 text-xl">{title.total_rating ? `Rating:${Math.round(title.total_rating)}` : 'Not Rated'}</strong>       
        {title.storyline && ( 
            <p className="text-left text-white bg-primary p-3 text-lg border-tertiary border-2">{title.storyline}</p>
        )}
        
        {title.videos && (
            <Carousel
            autoPlay={true}
            infiniteLoop={true}
            className="w-2/3 my-8 mx-auto hidden lg:flex"
            showStatus={false}
            swipeable={true}
            showThumbs={false}>
            {title.videos.map((vid) => {
                return (
                    <div key={vid.id}>
                        <iframe className="h-80" src={`https://www.youtube.com/embed/${vid.video_id}`}></iframe>
                    </div>
                )
            })}
            </Carousel>
        )}

        </motion.div>
    )
}

export default Modes