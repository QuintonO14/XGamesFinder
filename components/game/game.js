import dynamic from 'next/dynamic'
const Link = dynamic(() => import('next/link'))

const Game = ({game}) => {
 
    return (
          <div className="flex flex-col justify-between border border-white h-80 overflow-x-hidden break-all scrollbar-thin overflow-y-auto
          max-h-screen rounded-sm bg-gray-700 text-center">
            <h1 className="break-normal text-center pt-2 h-14 border-b-2 border-black bg-primary text-white
            flex items-center justify-center py-2">
              {game.name.length <= 40 ? game.name : game.name.slice(0,37) + '...'}
            </h1>
            <img className="rounded-md w-1/2 mx-auto h-40" src={game.cover ? `https://${game.cover.url.replace('t_thumb', 't_cover_big').substring(2)}` : '/noimage.jpg'}
            alt="game_cover"  /> 
              <div className="flex flex-wrap justify-evenly">
              {game.genres && game.genres.length > 1 ? game.genres.filter((genre) => genre.name.length < 20).slice(0,2).map((genre) => {
                return <p className="border border-primary m-1 p-1.5 rounded-lg text-xs bg-secondary font-bold text-primary" key={genre.id}>{genre.name}</p>
              }) 
              : 
              game.genres
              ?  
              <p className="border border-primary m-1 p-1.5 rounded-lg text-xs bg-secondary text-primary font-bold">{game.genres[0].name}</p>
              : 
              <p className="border border-primary m-1 p-1.5 rounded-lg text-xs bg-secondary text-primary font-bold">No Genre</p>}
              </div>
            <Link href={{pathname: `/${game.slug}`, query: {id: game.id}}} passHref={true}>
              <button className="bg-primary border-t-2 border-black p-2 hover:text-white active:text-white">
                View Game
              </button>
            </Link>
        </div>
    )
}

export default Game;