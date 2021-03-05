const url = `https://newsapi.org/v2/sources?category=technology&apiKey=${process.env.NEWS_API_KEY}`
const axios = require('axios')

class NewsController {
    static getNews (req, res, next) {
       axios.get(url)
            .then(({data}) => {
                const sources = data.sources
                const randomSource = sources[Math.floor(Math.random() * sources.length)]
                //console.log(randomSource)
                res.status(200).json(randomSource)
            })
            .catch((err) => {
                console.log('ini errror-nya:', err)
                next(err)
            })
    }
}

module.exports = NewsController


