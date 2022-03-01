const Genre = ({game}) => {
  let genres = []
  if(game.genres) {
    genres = game.genres
  }

 
    return (
        <div className="flex flex-wrap justify-evenly">
          {genres.map((g, i) => { 
            return (
              <span 
              key={i} 
              className="border border-primary m-1 p-1.5 rounded-lg text-sm bg-tertiary md:bg-secondary 
              font-bold text-primary">
                {g.name}
              </span>
             )
            })}
        </div>
    )
}

export default Genre