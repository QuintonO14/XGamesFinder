import axios from 'axios'

export default async function handler(req, res) {
       if(req.method === 'POST') {
        const name = req.body.name
        const token = req.body.token
        const genres = await axios({
            url: 'https://api.igdb.com/v4/games/', 
            method: 'POST', 
            headers : {
              'Accept' : 'application/json',
              'Client-ID': process.env.TWITCH_CLIENT_ID,
              'Authorization' : `Bearer ${token}`,
            },
            data: `fields cover.*, genres.*, cover.cover_big, genres.*, name, platforms.*, screenshots.*, slug;  
            limit 500;
            where genres.name = "${name}" & platforms = (49);` 
          })
          if(genres) {
              res.json(genres.data)
          } else {
              console.log('Not Working')
          }
       }
}
  