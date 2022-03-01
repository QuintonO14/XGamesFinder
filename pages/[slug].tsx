import axios from "axios";
import dynamic from 'next/dynamic'
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from 'next/router'
const Head = dynamic(() => import('next/head'))
const Artworks = dynamic(() => import('../components/slug/artworks'))
const Developers = dynamic(() => import('../components/slug/developers'))
const Genres = dynamic(() => import('../components/slug/genre'))
const Info = dynamic(() => import('../components/slug/info'))
const Similar = dynamic(() => import('../components/slug/similar'))
const Videos = dynamic(() => import('../components/slug/videos'))

const Slug = ({title}) => {
    const [visible, setVisible] = useState(false)
    const image = title.screenshots
    const art = title.artworks
    const works = art ? art.concat(image) : image
    const router = useRouter()


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

    const variants = { 
      initial: { height: 0},
      animate: { height: 100, transition: { delayChildren: 0.5} }
    }
    return (
        <div id="slug" className="flex relative flex-col font-mono text-sm lg:text-lg items-center min-h-screen h-auto bg-secondary text-primary">
             <Head>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <meta charSet="utf-8" />
              <title>XGFinder | {title.name}</title>
              <meta name="description" content={`Information on the game ${title.name}, including screenshots,
              videos, and other games like it`} />
            </Head> 
            <h1 className="w-full text-4xl font-bold text-center bg-primary text-xwhite py-2 border-b-2 border-primary">
              {title.name}
            </h1>
            <div className="lg:flex lg:m-4">
              <div className="flex flex-col items-center lg:border-2 border-tertiary text-center mt-1 w-full lg:w-1/3 lg:bg-primary lg:rounded-sm">
                <Developers title={title} />
                {works &&  (
                  <Artworks works={works.filter((x) => x !== undefined)} />
                )}
                {title.genres && (
                    <Genres game={title} />
                )}
              </div>
              <Info title={title} />
            </div>
            {title.videos && (
                <Videos title={title} /> 
            )}
            {title.similar_games && (
                <Similar title={title} />
            )}
          <button
          className="text-xwhite w-12 h-12 rounded-lg border border-primary text-primary bg-white fixed top-10 left-10"
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
      return res.data[0]
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
