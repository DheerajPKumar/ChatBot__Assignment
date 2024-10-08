let popup = document.querySelector(".popup");
let popupContainer = document.querySelector(".popup__container");
let popupiconDiv = document.querySelector(".popup__container-crossicondiv");
let popupDetails = document.querySelector(".popup__container-details");
let popupLogo = document.querySelector(".popup__container-logo");
let scrollContainer = document.querySelector(".chatbox__content-chatarea");

let chatbox = document.querySelector(".chatbox");
let chaticonDiv = document.querySelector(".chatbox__content-header--crossicon");
let tempEl = document.querySelector(".chatbox__content-chatarea--temperature");
let timeEl = document.querySelector(".chatbox__content-chatarea--time");
let windEl = document.querySelector(".chatbox__content-chatarea--wind");
let weatEl = document.querySelector(".chatbox__content-chatarea--weather");
let inputEl = document.querySelector(".chatbox__content-messages--input");
let optionsEl = document.querySelector(".chatbox__content-chatarea--third");
let chatContainer = document.querySelector(".chatbox__content-chatarea--fourth");
let leftContainer = document.querySelector(".chatbox__content-chatarea--fifth");
let userDiv = document.createElement("div");
let sendBtn = document.querySelector(".chatbox__content-messages--sendbtn");
let selectedWord = "";

popupContainer.addEventListener("mouseenter", () => {
    popupiconDiv.style.opacity = 1;
});

popupContainer.addEventListener("mouseleave", () => {
    popupiconDiv.style.opacity = 0;
});

popupiconDiv.addEventListener("click", () => {
    popupDetails.style.display = "none";
});

popupLogo.addEventListener("click", () => {
    chatbox.style.transform = 'translateY(0)';
    popup.style.transform = 'translateY(100%)';
});

chaticonDiv.addEventListener("click", () => {
    chatbox.style.transform = 'translateY(100%)';
    popup.style.transform = 'translateY(0)';
    chatContainer.style.display = 'none';
    leftContainer.style.display = 'none';
    optionsEl.style.display = 'flex';
});

tempEl.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
    inputEl.style.outline = 'none';
    optionsEl.style.display = "none";
    chatContainer.style.display = 'block';
    userDiv.innerText = "You";
    userDiv.classList.add("chatbox__content-chatarea--user");
    let textdiv = document.createElement("div");
    textdiv.innerText = tempEl.textContent;
    textdiv.classList.add("chatbox__content-chatarea--usertext");
    userDiv.appendChild(textdiv);
    chatContainer.appendChild(userDiv);
    leftContainer.style.display = "block";
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
});

timeEl.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
    inputEl.style.outline = 'none';
    optionsEl.style.display = "none";
    chatContainer.style.display = 'block';
    userDiv.innerText = "You";
    userDiv.classList.add("chatbox__content-chatarea--user");
    let textdiv = document.createElement("div");
    textdiv.innerText = timeEl.textContent;
    textdiv.classList.add("chatbox__content-chatarea--usertext");
    userDiv.appendChild(textdiv);
    chatContainer.appendChild(userDiv);
    leftContainer.style.display = "block";
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
});

windEl.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
    inputEl.style.outline = 'none';
    optionsEl.style.display = "none";
    userDiv.innerText = "You";
    chatContainer.style.display = 'block';
    userDiv.classList.add("chatbox__content-chatarea--user");
    let textdiv = document.createElement("div");
    textdiv.innerText = windEl.textContent;
    textdiv.classList.add("chatbox__content-chatarea--usertext");
    userDiv.appendChild(textdiv);
    chatContainer.appendChild(userDiv);
    leftContainer.style.display = "block";
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
});

weatEl.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
    inputEl.style.outline = 'none';
    optionsEl.style.display = "none";
    chatContainer.style.display = 'block';
    userDiv.innerText = "You";
    userDiv.classList.add("chatbox__content-chatarea--user");
    let textdiv = document.createElement("div");
    textdiv.innerText = weatEl.textContent;
    textdiv.classList.add("chatbox__content-chatarea--usertext");
    userDiv.appendChild(textdiv);
    chatContainer.appendChild(userDiv);
    leftContainer.style.display = "block";
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
});

optionsEl.addEventListener('click', function(event) {
    if (event.target.classList.contains('chatbox__content-chatarea--option')) {
        let selectedCategory = event.target.textContent.trim().toLowerCase();
        let finalText = selectedCategory.replace(/^[^\w]+/, '').trim();
        selectedWord = finalText.split(' ')[0];
    }
});

let inputText;
inputEl.addEventListener("input", () => {
    inputText = "";
    inputText = inputEl.value;
});

inputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendBtn.click();
    }
});

const apiKey = '66994ba9a9d0ad6d2d9d878fc92faf52';

function fetchWeatherData(type, city, callback) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let value;
            switch(type) {
                case 'temperature':
                    value = `Temperature: ${data.main.temp}°C`;
                    break;
                case 'time':
                    value = `Local Time: ${new Date(data.dt * 1000).toLocaleTimeString()}`;
                    break;
                case 'wind':
                    value = `Wind Speed: ${data.wind.speed} m/s`;
                    break;
                case 'weather':
                    value = `Weather: ${data.weather[0].description}`;
                    break;
                default:
                    value = 'Data not available';
            }
            callback(value);
        })
        .catch(error => {
            validCity();
            console.error('Error fetching the weather data:', error);
        });
}

function validCity() {
    let fetchDataDiv = document.createElement("div");
    fetchDataDiv.innerHTML = `
        <div class="chatbox__content-chatarea--fifthup chatbox__content-chatarea--upper">
            <div class="caption__avatar--content chatbox__content-chatarea--imagecontainer">
                <img src="./assets/icon.png" alt="logoimage" class="caption__avatar--image chatbox__content-chatarea--image">
            </div>
            <span class="caption__text chatbox__content-chatarea--text">ChatBot</span>
        </div>
        <div class="chatbox__content-chatarea--first chatbox__content-chatarea--message1">Please enter a valid City Name! 🤕</div>
    `;

    leftContainer.appendChild(fetchDataDiv);
}

sendBtn.addEventListener("click", () => {
    let city = inputEl.value.trim();
    if (city && selectedWord) {
        fetchWeatherData(selectedWord, city, (weatherData) => {
            let userDatadiv = document.createElement("div");
            userDatadiv.innerText = "You";
            userDatadiv.classList.add("chatbox__content-chatarea--user");
            let textdiv = document.createElement("div");
            textdiv.innerText = city;
            textdiv.classList.add("chatbox__content-chatarea--usertext");
            userDatadiv.appendChild(textdiv);

            let fetchDataDiv = document.createElement("div");
            fetchDataDiv.innerHTML = `
                <div class="chatbox__content-chatarea--fifthup chatbox__content-chatarea--upper">
                    <div class="caption__avatar--content chatbox__content-chatarea--imagecontainer">
                        <img src="./assets/icon.png" alt="logoimage" class="caption__avatar--image chatbox__content-chatarea--image">
                    </div>
                    <span class="caption__text chatbox__content-chatarea--text">ChatBot</span>
                </div>
                <div class="chatbox__content-chatarea--first chatbox__content-chatarea--message1">${weatherData}</div>
                <div class="chatbox__content-chatarea--second chatbox__content-chatarea--message2">Looking for more information?</div>
                <div class="chatbox__content-chatarea--navigation">
                    <button type="button" class="chatbox__content-chatarea--button1">Yes</button>
                    <button type="button" class="chatbox__content-chatarea--button2">No</button>
                </div>
            `;

            // scrollContainer.scrollTop = scrollContainer.scrollHeight;

            leftContainer.appendChild(userDatadiv);
            leftContainer.appendChild(fetchDataDiv);
            scrollContainer.scrollTop = scrollContainer.scrollHeight;

            let yesBtn = fetchDataDiv.querySelector('.chatbox__content-chatarea--button1');
            let noBtn = fetchDataDiv.querySelector('.chatbox__content-chatarea--button2');

            yesBtn.addEventListener('click', () => {
                let fetchDataDiv = document.createElement("div");
                fetchDataDiv.innerHTML = `
                    <div class="chatbox__content-chatarea--fifthup chatbox__content-chatarea--upper">
                        <div class="caption__avatar--content chatbox__content-chatarea--imagecontainer">
                            <img src="./assets/icon.png" alt="logoimage" class="caption__avatar--image chatbox__content-chatarea--image">
                        </div>
                        <span class="caption__text chatbox__content-chatarea--text">ChatBot</span>
                    </div>
                    <div class="chatbox__content-chatarea--second chatbox__content-chatarea--message2">${city} or Any other city?</div>
                    <div class="chatbox__content-chatarea--navigation">
                        <button type="button" class="chatbox__content-chatarea--button1">${city}</button>
                        <button type="button" class="chatbox__content-chatarea--button2">Other</button>
                    </div>
                `;

                let sameCity = fetchDataDiv.querySelector('.chatbox__content-chatarea--button1');
                let otherCity = fetchDataDiv.querySelector('.chatbox__content-chatarea--button2');

                sameCity.addEventListener('click', () => {
                    resetChatArea();
                    let selectedWord = "";
                    let optionsEl = document.querySelectorAll(".chatbox__content-chatarea--third");
                    optionsEl.forEach(option => {
                        option.addEventListener("click", (event) => {
                            let selectedCategory = event.target.textContent.trim().toLowerCase();
                            let finalText = selectedCategory.replace(/^[^\w]+/, '').trim();
                            selectedWord = finalText.split(' ')[0];
                            console.log("first", selectedWord);
                        });
                    });
                    
                    setTimeout(() => {
                        fetchWeatherData(selectedWord, city, (selectedWord) => {
                            console.log("inside same fetch", selectedWord);
                            let fetchDataDiv = document.createElement("div");
                            fetchDataDiv.innerHTML = `
                                <div class="chatbox__content-chatarea--fifthup chatbox__content-chatarea--upper">
                                    <div class="caption__avatar--content chatbox__content-chatarea--imagecontainer">
                                        <img src="./assets/icon.png" alt="logoimage" class="caption__avatar--image chatbox__content-chatarea--image">
                                    </div>
                                    <span class="caption__text chatbox__content-chatarea--text">ChatBot</span>
                                </div>
                                <div class="chatbox__content-chatarea--first chatbox__content-chatarea--message1">${selectedWord}</div>
                                <div class="chatbox__content-chatarea--second chatbox__content-chatarea--message2">Looking for more information?</div>
                                <div class="chatbox__content-chatarea--navigation">
                                    <button type="button" class="chatbox__content-chatarea--button1">Yes</button>
                                    <button type="button" class="chatbox__content-chatarea--button2">No</button>
                                </div>
                            `;
                
                            leftContainer.appendChild(fetchDataDiv);
                            scrollContainer.scrollTop = scrollContainer.scrollHeight;
                        });
                        
                    }, 3000);
                });

                otherCity.addEventListener('click', () => {
                    resetChatArea();
                    let fetchDataDiv = document.createElement("div");
                    fetchDataDiv.innerHTML = `
                        <div class="chatbox__content-chatarea--fifthup chatbox__content-chatarea--upper">
                            <div class="caption__avatar--content chatbox__content-chatarea--imagecontainer">
                                <img src="./assets/icon.png" alt="logoimage" class="caption__avatar--image chatbox__content-chatarea--image">
                            </div>
                            <span class="caption__text chatbox__content-chatarea--text">ChatBot</span>
                        </div>
                        <div class="chatbox__content-chatarea--fifthdo">
                            'Please enter your city name in the typing area! 😊'
                        </div>
                    `;

                    leftContainer.appendChild(fetchDataDiv);
                });
                
                leftContainer.appendChild(fetchDataDiv);
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            });

            noBtn.addEventListener('click', () => {
                let userDatadiv = document.createElement("div");
                userDatadiv.innerText = "You";
                userDatadiv.classList.add("chatbox__content-chatarea--user");
                let textdiv = document.createElement("div");
                textdiv.innerText = "No";
                textdiv.classList.add("chatbox__content-chatarea--usertext");
                userDatadiv.appendChild(textdiv);

                let fetchDataDiv = document.createElement("div");
                fetchDataDiv.innerHTML = `
                    <div class="chatbox__content-chatarea--fifthup chatbox__content-chatarea--upper">
                        <div class="caption__avatar--content chatbox__content-chatarea--imagecontainer">
                            <img src="./assets/icon.png" alt="logoimage" class="caption__avatar--image chatbox__content-chatarea--image">
                        </div>
                        <span class="caption__text chatbox__content-chatarea--text">ChatBot</span>
                    </div>
                    <div class="chatbox__content-chatarea--first chatbox__content-chatarea--message1">Thank You! 😊</div>
                    <div class="chatbox__content-chatarea--navigation">
                        <button type="button" class="chatbox__content-chatarea--startchat">Start the chat again</button>
                    </div>
                `;

                let chatBtn = fetchDataDiv.querySelector('.chatbox__content-chatarea--startchat');

                chatBtn.addEventListener('click', () => {
                    resetChatArea();
                    let fetchDataDiv = document.createElement("div");
                    fetchDataDiv.innerHTML = `
                        <div class="chatbox__content-chatarea--fifthup chatbox__content-chatarea--upper">
                            <div class="caption__avatar--content chatbox__content-chatarea--imagecontainer">
                                <img src="./assets/icon.png" alt="logoimage" class="caption__avatar--image chatbox__content-chatarea--image">
                            </div>
                            <span class="caption__text chatbox__content-chatarea--text">ChatBot</span>
                        </div>
                        <div class="chatbox__content-chatarea--fifthdo">
                            'Please enter your city name in the typing area! 😊'
                        </div>
                    `;

                    leftContainer.appendChild(fetchDataDiv);
                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
                });
                
                leftContainer.appendChild(userDatadiv);
                leftContainer.appendChild(fetchDataDiv);
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            });

            scrollContainer.scrollTop = scrollContainer.scrollHeight;

            inputEl.value = "";
            inputEl.setAttribute("disabled", "disabled");
        });
    }
});

function resetChatArea() {
    chatContainer.style.display = 'none';
    chatContainer.innerHTML = '';
    leftContainer.innerHTML = '';
    leftContainer.style.display = 'none';
    optionsEl.style.display = 'flex';
    inputEl.value = '';
}