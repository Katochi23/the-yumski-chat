const express = require("express")
const socket = require("socket.io")

const app = express()

const port = process.env.PORT || 3000

app.use(express.static("public"))

const server = app.listen(port, err => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`Server is listening on port: ${port}`)
})

const io = socket(server)

io.on("connection", socket => {
  console.log(`Socket is connected`, socket.id)
  socket.on("chat", data => {
    console.log(data)
    io.sockets.emit("chat", data)
  })
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data)
  })
})

