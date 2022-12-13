const http = require('http')
const fs = require('fs')

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
require('dotenv').config()

// eslint-disable-next-line no-undef
const ServerPort = process.env.SERVER_PORT

http
  .get(`http://localhost:${ServerPort}/v1/docs/swagger.yaml`, (res) => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    })
    res.on('end', () => {
      fs.writeFile('./docs/gncsApi.yaml', data, (err) => {
        if (err) {
          console.error(err)
        }
      })
    })
  })
  .on('error', (err) => {
    console.error(err.message)
  })
