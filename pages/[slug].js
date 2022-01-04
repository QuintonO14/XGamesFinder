import axios from "axios";
import dynamic from 'next/dynamic'
import { useState } from "react";
import { useRouter } from 'next/router'
const Head = dynamic(() => import('next/head'))
const Artworks = dynamic(() => import('../components/slug/artworks'))
const Developers = dynamic(() => import('../components/slug/developers'))
const Genres = dynamic(() => import('../components/slug/genre'))
const Modes = dynamic(() => import('../components/slug/modes'))
const Similar = dynamic(() => import('../components/slug/similar'))
const Story = dynamic(() => import('../components/slug/story'))
const Summary = dynamic(() => import('../components/slug/summary'))
const Videos = dynamic(() => import('../components/slug/videos'))

const Slug = ({title}) => {
    const image = title[0].screenshots
    const [visible, setVisible] = useState(false)
    const art = title[0].artworks
    const works = art ? art.concat(image) : image
    const router = useRouter()
    console.log(title)


    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 20){
        setVisible(true)
      } 
      else if (scrolled <= 10){
        setVisible(false)
      }
    };

    const home = async() => {
        await router.push('/')
    }

    if(typeof window !== 'undefined') {
      window.addEventListener('scroll', toggleVisible)
    }
    return (
        <div id="slug" className="flex relative flex-col font-mono text-sm md:text-md items-center min-h-screen h-auto bg-secondary text-primary">
             <Head>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <meta charSet="utf-8" />
              <title>XGFinder | {title[0].name}</title>
              <meta name="description" content={`Information on the game ${title[0].name}, including screenshots,
              videos, and other games like it`} />
              <link rel="icon" type="image/png" sizes="16x16" href="/xbox.ico" />
            </Head> 
            <h1 className="w-full text-4xl font-bold text-center bg-primary text-xwhite py-2 border-b-2 border-primary">
              {title[0].name}
            </h1>
            <div className="md:flex md:m-4">
              <div className="flex flex-col items-center md:border-2 border-tertiary text-center mt-1 w-full md:w-1/2 md:bg-primary md:rounded-sm">
                {title[0].involved_companies && (
                  <Developers title={title[0]} />
                )}  
                {works &&  (
                  <Artworks works={works} title={title[0]} />
                )}
                {title[0].genres && (
                    <Genres game={title[0]} />
                )}
              </div>
              <div className="w-full md:w-1/2 place-self-center border-tertiary md:border-2 md:ml-4 md:rounded-sm bg-primary">
                {title[0].summary && (
                    <Summary title={title[0]} /> 
                )}
                {title[0].game_modes || title[0].platforms ? (
                    <Modes title={title[0]} />
                ) : null}
              </div>
            </div>
             {title[0].storyline ? (
                <Story title={title[0]} /> 
            ) : null}
            {title[0].videos && (
                <Videos title={title[0]} /> 
            )}
              {title[0].similar_games && (
                <Similar title={title[0]} />
            )}
          <button
          className="text-xwhite w-12 h-12 rounded-md border border-primary text-primary bg-white fixed top-10 left-10"
          onClick={home} style={{display: visible ? 'block' : 'none'}}><img src="./home.svg" className="w-full h-full" />
          </button>
        </div>
    )
}

export default Slug;

export async function getServerSideProps (context) {
    const id = context.query.id
    const connected = await
    axios.post(`https://id.twitch.tv/oauth2/token?`, {}, {
        params: {
          'client_id' : process.env.TWITCH_CLIENT_ID,
          'client_secret' : process.env.TWITCH_CLIENT_SECRET,
          'grant_type' : 'client_credentials'
        }
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return err
    })

    const title = await axios({
      url: 'https://api.igdb.com/v4/games/',
      method: 'POST', 
      headers : {
        'Accept' : 'application/json',
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization' : `Bearer ${connected.access_token}`,
      },
      data: `fields artworks.*, collection.*, collection.games.*, cover.*, dlcs.*, game_modes.*, genres.*, name, 
      platforms.*, rating, screenshots.*, similar_games.*, similar_games.cover.*, similar_games.name, 
      similar_games.slug, similar_games.platforms.*, storyline, summary, total_rating, involved_companies.company.*, videos.*;
      where id = ${id};` 
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return err
    })

    return {
      props: {
        title: title,
        connected: connected,
      }
    }
}
