import axios from 'axios'
import dynamic from 'next/dynamic';
import { useState } from 'react'
const Head = dynamic(() => import('next/head'))
const Game = dynamic(() => import('../components/game/game'))

export default function Home({games, genres, connected}) {
  const [page, setPage] = useState(0)
  const [title, setTitle] = useState(null)
  const [searched, setSearched] = useState(null)
  const [displayedGames, setDisplay] = useState(games)
  const maxPage = Math.ceil(games.length / 15)

  const next = () => {
    setPage(page + 1)
    if(typeof window !== "undefined") {
      window.scroll({top: 0, behavior:'smooth'})
    }
  }
  const getGenre = async (e) => {
    const body = {
      name: e,
      token: connected.access_token
    }
    await axios('/api/games', {
      method: 'POST',
      data: body
    }).then((res) => {
      document.getElementById("search").reset()
      setDisplay(res.data)
      setPage(0)
    })
  }

  const searchGame = async(e) => {
    e.preventDefault()
    const body = {
      token: connected.access_token,
      title: title.replace(/[^a-zA-Z ]/g, "")
    }
    await axios('/api/search', {
      method: 'POST',
      data: body
    }).then((res) => {
      setDisplay(res.data)
      setSearched(title)
      setPage(0)
    }) 
  }

  const prev = () => {
    setPage(page - 1)
  }

  return (
    <>
     <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <title>XGFinder</title>
        <meta name="application-name" content="Xbox Games Finder" />
        <meta name="description" content="Find new Xbox games to play and get a good preview of their 
        contents before jumping in to play them" />
        <link rel="icon" type="image/png" sizes="16x16" href="/xbox.ico" />
       </Head> 
      <div className="w-11/12 md:w-1/2 mx-auto border border-white flex flex-col items-center text-center">
      <form id="search" onSubmit={searchGame} className="w-full">
        <input 
        type="search"
        placeholder="Search for a game..."
        className="w-full text-center p-1 focus:outline-none text-lg"
        minLength={3}
        onChange={(e) => setTitle(e.target.value)} /> 
      </form>
      <select 
      className="w-full text-md text-center bg-primary scrollbar scrollbar-track-white scrollbar-thumb-secondary text-white
      scrollbar-thumb-rounded scrollbar-track-rounded p-2 focus:outline-none" 
      onChange={(e) => getGenre(e.target.value)}
      defaultValue="DEFAULT"
      >
        <option value="DEFAULT" disabled>Choose a Genre</option>
        {genres.filter((g => g.id !== 36)).map((genre) => {
          return <option key={genre.id} value={genre.name}>{genre.name}</option>
        })}
      </select>
      </div>
      <div className="relative grid grid-flow-row z-10 sm:grid-cols-3 sm:grid-rows-5 lg:grid-cols-3 lg:grid-rows-5
      xl:grid-cols-5 xl:grid-rows-3 w-2/3 md:w-11/12 mx-auto my-6 gap-2">
        {displayedGames.slice(page * 15, 15*(page + 1)).map((game) => {
          return (
            <Game key={game.id} game={game} connected={connected} /> 
          )
        })}
      </div>
      <div className="flex justify-evenly w-11/12 mx-auto pb-6 relative">
          {page != 0 ? (
          <>
          <button 
          className="bg-secondary text-primary border-4 shadow-md border-white py-1 px-4 rounded-xl hover:bg-primary 
          hover:text-white" 
          onClick={prev}>Back
          </button>
          </>
          ) 
          : null}
          {page !== maxPage && displayedGames.length ? <button 
          className="bg-secondary text-primary border-4 shadow-md border-white py-1 px-4 rounded-xl hover:bg-primary 
          hover:text-white" 
          onClick={next}>Next</button> 
          : null}
          {!displayedGames.length && <p className="bg-primary text-white p-2 rounded-lg text-lg">No results for {`'${searched}'`}</p>}
      </div>
    </>
  )
}

export async function getServerSideProps () {
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

    const games = await axios({
      url: 'https://api.igdb.com/v4/games/',
      method: 'POST', 
      headers : {
        'Accept' : 'application/json',
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization' : `Bearer ${connected.access_token}`,
      },
      data: `fields cover.*, genres.*, cover.cover_big, genres.*, name, platforms.*, screenshots.*, slug;  
      limit 150; 
      where platforms = (49);` 
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return err
    })

    const genres = await axios({
      url: 'https://api.igdb.com/v4/genres/',
      method: 'POST', 
      headers : {
        'Accept' : 'application/json',
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization' : `Bearer ${connected.access_token}`,
      },
      data: `fields id, name;
      limit 100;` 
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return err
    })


    return {
      props: {
        games: games,
        connected: connected,
        genres: genres
      }
    }
}
