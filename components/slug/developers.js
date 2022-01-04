const Developers = ({title}) => {
    return (
        <div className="flex flex-col w-3/4">
            <div className="text-xwhite text-center">
            <h2 className="text-lg">Developed by:</h2>
            {title.involved_companies.map((comp) => {
                return (
                        <p key={comp.id}>{comp.company.name}</p>
                )
            })}
             <img className="rounded-md my-2 w-full lg:w-1/2 mx-auto border-8 border-primary" src={title.cover ? `https://${title.cover.url.replace('t_thumb', 't_cover_big').substring(2)}` : '/noimage.jpg'}
              alt="game_cover"  /> 
            </div>
        </div>
    )
}

export default Developers