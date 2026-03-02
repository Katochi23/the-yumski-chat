const socket = io.connect("http://localhost:3000/")


const screen = document.getElementById("screen")
const feedBack = document.getElementById("feedback")

const form = document.getElementById("msg")



form.addEventListener("submit", e => {
  e.preventDefault()
  const handle = document.getElementById("handle")
  const message = document.getElementById("message")
  if (handle.value.trim().length < 1 || message.value.trim().length < 1) {
    console.log("please input fields must include at least a character")
    return
  }
  socket.emit("chat", {
    handle: handle.value,
    message: message.value
  })
})

document.getElementById("message").onkeypress = function() {
  if (this.previousElementSibling.value.trim().length < 1) {
    console.log(`${this.previousElementSibling.id}`)
    this.disabled = true
    alert("you must have a handle to proceed!");
    this.previousElementSibling.focus();
    return
  }

  socket.emit("typing", this.previousElementSibling.value + "")
}

document.getElementById("handle").onkeypress = function() {
  if (this.value.trim().length >= 1 && this.nextElementSibling.disabled) {
    this.nextElementSibling.disabled = false
  }
}

socket.on("chat", data => {
  feedBack.innerHTML = ""
  screen.innerHTML += `<p><strong><em>${data.handle}</em></strong>: ${data.message}</p>`
})

socket.on("typing", data => {
  feedBack.innerHTML = `${data} is typing...`
})
