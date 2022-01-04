import axios from 'axios'

export default async function handler(req, res) {
       if(req.method === 'POST') {
        const title = req.body.title
        const token = req.body.token
        const game = await axios({
            url: 'https://api.igdb.com/v4/games/', 
            method: 'POST', 
            headers : {
              'Accept' : 'application/json',
              'Client-ID': process.env.TWITCH_CLIENT_ID,
              'Authorization' : `Bearer ${token}`,
            },
            data: `fields cover.*, genres.*, cover.cover_big, genres.*, name, platforms.*, screenshots.*, slug;
            limit: 100;
            search "${title}";
            where platforms = (49);`
          })
          if(game) {
              res.json(game.data)
          } else {
              console.log('Not Working')
          }
       }
}
  