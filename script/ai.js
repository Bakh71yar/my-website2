import {
  fetchOpenAIWithoutStream,
  getOpenAIWithStream,
} from "./../utils/fetchOpenAI.js";
import marked from "marked";

const sendButtonElement = document.getElementById("sendButton");

const createMessageElement = (message) => {
  const userMessage = document.createElement("div");
  userMessage.classList.add("mb-4", "text-right");

  userMessage.innerHTML = `
                  <div class="bg-blue-500 text-white p-4 rounded-lg max-w-md ml-auto">
                      <p>${message}</p>
                  </div>
                  <span class="text-gray-500 text-sm">You</span>
              `;

  document.getElementById("messages").appendChild(userMessage);
};

export const createAnswerElement = (answer = "") => {
  const aiMessage = document.createElement("div");
  aiMessage.classList.add("mb-4", "text-left");

  aiMessage.innerHTML = `
    <div class="bg-gray-200 text-black p-4 rounded-lg max-w-md mr-auto">
      <p>${answer}</p>
    </div>
    <span class="text-gray-500 text-sm">AI</span>
  `;
  document.getElementById("messages").appendChild(aiMessage);
  return aiMessage;
};

const handleSendButton = async (mode = "no-stream") => {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value;

  if (mode === "no-stream") {
    if (message.trim() === "") return;

    // Create a new message bubble for the user message
    createMessageElement(message);

    // Clear the input
    messageInput.value = "";

    // Scroll to the bottom
    document.getElementById("messages").scrollTop =
      document.getElementById("messages").scrollHeight;

    // Here you would send the message to the OpenAI API and handle the response
    const answer = await fetchOpenAIWithoutStream(
      "You have to give person more accurate answer and give answer as a shedule beacuse user will ask you about schedule" +
        message
    );
    createAnswerElement(answer);
  } else {
    createMessageElement(message);
    getOpenAIWithStream(messageInput.value);
    messageInput.value = "";
  }
};

// JavaScript to handle message sending
sendButtonElement.addEventListener("click", handleSendButton);
document.body.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSendButton("stream");
  }
});
