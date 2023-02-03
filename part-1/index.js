const blobID = 1070865685122662400//'<numbers here>' // paste the numbers you copied here

document.getElementById('send').addEventListener('click',sendMessage) // button click event

setInterval(function () {
	getMessages()  // periodically check messages
}, 1000)

function getMessages() {
	let xhr = new XMLHttpRequest() // build new request
	xhr.open('GET', 'https://jsonblob.com/api/jsonblob/' + blobID)
	xhr.onload = function() {
		let messageHistory = JSON.parse(xhr.responseText) // parse message data recieved from the JSON host
		let messagesDiv = document.getElementById('messages')
		messagesDiv.innerHTML = ''
		for (i = 0; i<messageHistory.messages.length; i++) { //iterate through messages
			messagesDiv.innerHTML = messagesDiv.innerHTML + `<p>${messageHistory.messages[i]}</p>` //display each message on screen
		}
	}
	xhr.send()
}

function sendMessage() {
	let message = document.getElementById('messageInput').value

	let xhr = new XMLHttpRequest() // make sure we have an accurate message history
	xhr.open('GET', 'https://jsonblob.com/api/jsonblob/' + blobID) 
	xhr.onload = function() {
		let messageHistory = JSON.parse(xhr.responseText)
		messageHistory.messages.push(message) //update messages array
		xhr = new XMLHttpRequest() // build ANOTHER request: this one to SEND data
		xhr.open('PUT', 'https://jsonblob.com/api/jsonblob/' + blobID)
		xhr.setRequestHeader('Content-type', 'application/json')
		xhr.send(JSON.stringify(messageHistory))
	}
	xhr.send()
}
