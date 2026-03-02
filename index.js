const express = require("express")
const socket = require("socket.io")
const cors = require("cors")

const app = express()

const port = process.env.PORT || 3000

app.use(cors())
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

