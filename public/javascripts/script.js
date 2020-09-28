const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  const html = data.map((item) => `<p>${JSON.parse(item).name}: ${JSON.parse(item).message}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {

  evt.preventDefault();
  const message = document.getElementById("message");
  const name = document.getElementById("author");
 
  let content={
      name : name.value,
      message : message.value
    }
    ws.send(JSON.stringify(content));
    console.log(JSON.stringify(content)+"  ACA");
  message.value = "";
  name.value = "";
  };

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);