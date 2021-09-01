const Genre = ({game}) => {
    return (
        <div className="flex flex-wrap justify-evenly">
        {game.genres && game.genres.length > 1 && game.genres.filter((genre) => genre.name.length < 20).map((genre) => {
          return <p className="border-2 border-primary m-1 p-1 rounded-lg text-md bg-secondary text-primary font-bold" key={genre.id}>{genre.name}</p>
        })}
        </div>
    )
}

export default Genre