import express from 'express'
import path from 'path'

const app = express()
const root = path.join(__dirname, 'public')

app.use('/public', express.static(root))

app.get('*', (req, res, _next) => {
  res.sendFile('index.html', { root })
})

app.listen(process.env.PORT || 8000)
