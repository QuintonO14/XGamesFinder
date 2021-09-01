import dynamic from 'next/dynamic'
const Link = dynamic(() => import('next/link'))

const Similar = ({title}) => {
    return (
        <div className="bg-primary w-full pb-4">
        <h2 className="text-2xl text-white w-2/3 text-center mx-auto mb-2">Games Like It</h2>
        <div className="w-full lg:w-11/12 xl:w-5/6 block text-white text-center mx-auto">
        {title.similar_games.map((same) => {
            if(same.platforms) {
            for(var i = 0; i < same.platforms.length; i++) {
                if(same.platforms[i].abbreviation == 'X360' || same.platforms[i].abbreviation === 'XONE') {
                    return (
                    <Link href={{pathname: `/${same.slug}`, query: {id: same.id}}} passHref={true} key={same.id}>    
                    <div className="cursor-pointer bg-secondary border border-white inline-block w-1/3 md:w-36
                      h-40 my-2 mx-1">
                        <h3 className="border-b-2 border-black bg-primary" key={same.id}>{same.name.length < 18 ? same.name :
                        same.name.slice(0,15) + "..."}</h3>
                        <img className="rounded-sm mx-auto h-32" src={`https://${same.cover.url.replace('t_thumb', 't_cover_big').substring(2)}`}
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