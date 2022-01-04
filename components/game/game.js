import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
const Link = dynamic(() => import('next/link'))

const Game = ({game, item}) => {
 
    return (
          <motion.div variants={item} className="flex flex-col justify-between border border-white h-80 overflow-x-hidden break-all scrollbar-thin overflow-y-auto
          max-h-screen rounded-sm bg-secondary text-center">
            <h1 className="break-normal text-center pt-2 border-b-2 border-black bg-primary text-white
            p-2 truncate">
              {game.name}
            </h1>
            <img className="rounded-md w-1/2 mx-auto h-44" src={game.cover ? `https://${game.cover.url.replace('t_thumb', 't_cover_big').substring(2)}` : '/noimage.jpg'}
            alt="game_cover"  /> 
              <div className="flex flex-wrap justify-evenly">
              {game.genres && game.genres.length === 1 ? 
              <p className="border border-primary m-1 p-1.5 rounded-lg text-xs bg-tertiary text-primary font-bold">{game.genres[0].name}</p>
              : game.genres && game.genres.length > 1 ? game.genres.filter((genre) => genre.name.length < 20).slice(0,2).map((genre) => {
                return <p className="border border-primary m-1 p-1.5 rounded-lg text-xs bg-tertiary font-bold text-primary" key={genre.id}>{genre.name}</p>
              }) : <p className="border border-primary m-1 p-1.5 rounded-lg text-xs bg-tertiary text-primary font-bold">No Genre</p>}
              </div>
            <Link href={{pathname: `/${game.slug}`, query: {id: game.id}}} passHref={true}>
              <button className="bg-primary border-t-2 border-black p-2 hover:text-white active:text-white text-lg font-semibold">
                View
              </button>
            </Link>
        </motion.div>
    )
}

export default Game;