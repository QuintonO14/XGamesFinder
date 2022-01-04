import dynamic from 'next/dynamic'
const Link = dynamic(() => import('next/link'))

const Similar = ({title}) => {
    return (
        <div className="bg-primary w-full pb-4">
            <h2 className="text-2xl text-xwhite w-2/3 text-center mx-auto m-2">Games Like It</h2>
            <div className="w-full lg:w-11/12 xl:w-5/6 block text-xwhite text-center mx-auto">
            {title.similar_games.map((same) => {
                if(same.platforms) {
                for(var i = 0; i < same.platforms.length; i++) {
                    if(same.platforms[i].abbreviation == 'X360' || same.platforms[i].abbreviation === 'XONE') {
                        return (
                        <Link href={{pathname: `/${same.slug}`, query: {id: same.id}}} passHref={true} key={same.id}>    
                        <div className="cursor-pointer bg-tertiary border-2 border-secondary inline-block w-1/3 md:w-36
                        my-2 mx-1">
                            <h3 className="border-b-2 border-secondary bg-primary truncate text-lg px-2" key={same.id}>{same.name}</h3>
                            <img className="rounded-sm mx-auto w-full h-40" src={`https://${same.cover.url.replace('t_thumb', 't_cover_big').substring(2)}`}
                            alt="similar_cover" />
                        </div> 
                        </Link>
                        )
                    }
                }
                }

            })}
            </div>
        </div>
    )
}

export default Similar