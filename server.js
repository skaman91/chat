const { Server: NodeServer } = require('http')

class Server {
  constructor (port, host) {
    this.port = port
    this.host = host
    this.server = null
  }

  static messages = []
  start () {
    if (!this.server) {
      this.server = new NodeServer(this.requestListener)
      this.server.listen(this.port, this.host, () => {
        console.log('server is running')
      })
    }
  }

  requestListener (req, res) {
    if (req.method === 'GET') {
      // console.log(req.method)
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept,')
      res.end(JSON.stringify({
        msg: Server.messages
      }))
    }

    if (req.method === 'POST') {
      req.on('data', function (data) {
        const buffer = Buffer.from(data)

        const result = buffer.toString()

        console.log('got data', result)
        // console.log('received messages', messages)
        Server.messages.push(result)
      }).on('end', function () {
        // messages.push(JSON.parse(jsonString))
        // console.log(messages)
        // console.log(JSON.parse(jsonString))

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept,')
        res.end('Done')
      })
    }
  }
}

const server = new Server(8000, '127.0.0.1')

server.start()

// const messages = []
//
// // const receivedMsg = []
// const server = new Server((req, res) => {
//   // console.log(req.method, req.url)
//   if (req.method === 'GET') {
//     // console.log(req.method)
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'application/json')
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept,')
//     res.end(JSON.stringify({
//       messages
//     }))
//   }
//
//   if (req.method === 'POST') {
//     req.on('data', function (data) {
//       const buffer = Buffer.from(data)
//
//       const result = buffer.toString()
//
//       console.log('got data', result)
//       // console.log('received messages', messages)
//       messages.push(result)
//     }).on('end', function () {
//       // messages.push(JSON.parse(jsonString))
//       // console.log(messages)
//       // console.log(JSON.parse(jsonString))
//
//       res.statusCode = 200
//       res.setHeader('Content-Type', 'application/json')
//       res.setHeader('Access-Control-Allow-Origin', '*')
//       res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept,')
//       res.end('Done')
//     })
//   }
// })
//
// server.listen(8000, '127.0.0.1', () => {
//   console.log('server is running')
// })
