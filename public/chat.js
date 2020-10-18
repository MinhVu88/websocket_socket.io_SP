// make a socket connection to the Express server (index.js)
const socket = io.connect("http://localhost:3000");

// query the dom
const output = document.querySelector("#output"),
  feedback = document.querySelector("#feedback"),
  handle = document.querySelector("#handle"),
  msg = document.querySelector("#message"),
  btn = document.querySelector("#send");

msg.addEventListener("keypress", () => {
  socket.emit("typing", { user: handle.value });
});

btn.addEventListener("click", () => {
  socket.emit("sent", { message: msg.value, user: handle.value });
});

socket.on("sent", data => {
  feedback.innerHTML = "";

  msg.value = "";

  output.innerHTML += `<p><strong>${data.user}</strong>: ${data.message}</p>`;
});

socket.on("typing", data => {
  feedback.innerHTML = `<p><em>${data.user} is typing a message...</em></p>`;
});
