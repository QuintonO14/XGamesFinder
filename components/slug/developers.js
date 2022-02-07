import Image from 'next/image'
const Developers = ({title}) => {
    return (
        <div className="flex flex-col w-3/4">
            <div className="text-xwhite text-center">
            <h2 className="text-lg">Developed by:</h2>
            {title.involved_companies?.map((comp) => {
                return (
                        <p key={comp.id}>{comp.company.name}</p>
                )
            })}
              <div className="rounded-md my-2 h-96 w-full lg:w-2/3 mx-auto border-8 border-primary overflow-hidden relative">
                  <Image
                  src={title.cover ? `https://${title.cover.url.replace('t_thumb', 't_cover_big_2x').substring(2)}` : '/noimage.jpg'}
                  alt="game_cover"
                  layout="fill"
                  />
              </div>
            </div>
        </div>
    )
}

export default Developers