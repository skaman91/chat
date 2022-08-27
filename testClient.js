const sendBtn = document.querySelector('button[id="send"]')
const getMsgBtn = document.querySelector('button[id="print"]')
const chatBox = document.querySelector('#chatbox')
const ids = new Set()

// setInterval(function msgPrint (getMessages) {
//   document.getElementById('print').click()
// }, 50)
setInterval(getMessages, 500)

sendBtn.addEventListener('click', async function (event) {
  event.preventDefault()

  const text = document.querySelector('input').value

  if (text.length === 0) {
    // alert('Введите сообщение')
  } else {
    const id = Math.floor(Math.random() * 1000)

    const textObject = {
      id,
      message: text
    }

    console.log(textObject)
    await fetch('http://127.0.0.1:8000', {
      method: 'POST',
      body: JSON.stringify(textObject)
    })
  }

  document.getElementById('textbox').value = ''
})

/**
 *
 * @param event
 */
async function getMessages (event) {
  const response = await fetch('http://127.0.0.1:8000')
  const { msg: messages } = await response.json()

  if (!messages) {
    return
  }

  for (const message of messages) {
    const { id: rawId, message: msg } = JSON.parse(message)
    const id = rawId.toString()

    if (!ids.has(id)) {
      const newP = document.createElement('p')
      // const now = new Date().toLocaleTimeString()

      newP.innerHTML = msg.toString()
      chatBox.appendChild(newP)
      ids.add(id)

      newP.scrollIntoView(top)
    }
  }
}
