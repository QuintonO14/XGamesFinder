import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
const Link = dynamic(() => import('next/link'))


const Similar = ({title}) => {
    const [ref, inView] = useInView({threshold: 0.1})
    const controls = useAnimation()
    const games = useAnimation()

    useEffect(() => {
        if(inView) {
            controls.start("visible")
            games.start("visible")
        } else {
            controls.start("hidden")
            games.start("hidden")
        }
    })

    const variants = {
        "visible" : {
            opacity: 1
        },
        "hidden" : {
            opacity: 0
        }
    }

    const altVariants = {
        "visible" : {
            scale: 1,
        },
        "hidden" : {
            scale: 0
        }
    }
    return (
        <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={controls}
        className="bg-primary w-11/12 pb-4 my-4 border-2 border-tertiary">
            <h2 className="text-2xl text-xwhite w-2/3 text-center mx-auto m-2">Games Like It</h2>
            <div 
            className="w-full lg:w-11/12 xl:w-5/6 block text-xwhite text-center mx-auto">
            {title.similar_games.map((same) => {
                if(same.platforms) {
                for(var i = 0; i < same.platforms.length; i++) {
                    if(same.platforms[i].abbreviation == 'X360' || same.platforms[i].abbreviation === 'XONE') {
                        return (
                        <Link href={{pathname: `/${same.slug}`, query: {id: same.id}}} passHref={true} 
                        key={same.id} >    
                        <motion.div 
                        variants={altVariants}
                        initial="hidden"
                        animate={games}
                        ref={ref}
                        className="cursor-pointer bg-tertiary border-2 border-secondary inline-block w-5/12 md:w-36
                        my-2 mx-1">
                            <h3 className="border-b-2 border-tertiary bg-secondary truncate text-lg px-2" key={same.id}>{same.name}</h3>
                            <div className="mx-auto w-full h-40 overflow-hidden relative">
                                <Image 
                                src={`https://${same.cover.url.replace('t_thumb', 't_cover_small_2x').substring(2)}`}
                                placeholder="blur"
                                blurDataURL={`https://${same.cover.url.replace('t_thumb', 't_cover_small_2x').substring(2)}`}
                                alt="similar_cover"
                                layout='fill'
                                />
                            </div>
                        </motion.div> 
                        </Link>
                        )
                    }
                }
                }
            })}
            </div>
        </motion.div>
    )
}

export default Similar