//class gửi request cho server
const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en";
const showResult = document.querySelector(".result");
const showError = document.querySelector(".div_error")
class Http {
    get(url) {
        return fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            });
    }
}
//class nhận về word
class Store {
    constructor() {
        this.http = new Http();
    }
    getInforWord(word) {
        return this.http.get(`${baseURL}/${word}`);
    }
};


//class hiển thị data lên giao diện 
class RenderUI {
    renderInforWord(inforWord) {
        const arrayWord = inforWord[0].word;
        const details = (inforWord[0].meanings)[0]["partOfSpeech"];
        // const text = (inforWord[1].phonetics)[0]["text"] || (inforWord[1].phonetics)[1]["text"];
        //tìm phonetics nếu trường hợp nó nằm ở vị trí thứ 2
        const text = (inforWord[0].phonetics)[0]["text"] || (inforWord[0].phonetics)[1]["text"];
        //clone này dùng truy cập vào mảng meanings đọc cho dễ <3
        const clone = inforWord[0];
        //tìm definitions trong mảng meanings của api
        const defi =
            (clone.meanings[0]["definitions"])[0]["definition"] || "cai dmm api rac"
            || (clone.meanings[0]["definitions"])[1]["definition"]
            || (clone.meanings[0]["definitions"])[2]["definition"]
            || (clone.meanings[0]["definitions"])[3]["definition"]
            || (clone.meanings[0]["definitions"])[4]["definition"]
        //tạo 1 con biến đi vào thằng definitions làm việc cho dễ
        // const clone2 = clone.meanings[1]["definitions"];
        //tìm example trong definitions (khó)
        const exam =
            // (clone.meanings[0]["definitions"])[0]["example"]
            // || (clone.meanings[2]["definitions"])[0]["example"]
            // || (clone.meanings[1]["definitions"])[0]["example"]
            (clone.meanings[0]["definitions"])[0]["example"] || "cai dmm api rac"
            || (clone.meanings[0]["definitions"])[1]["example"]
            || (clone.meanings[0]["definitions"])[2]["example"]
            || (clone.meanings[1]["definitions"])[1]["example"]
            || (clone.meanings[2]["definitions"])[0]["example"]
            || (clone.meanings[2]["definitions"])[1]["example"]
            || (clone.meanings[2]["definitions"])[2]["example"]
            || (clone.meanings[2]["definitions"])[3]["example"]
            || (clone.meanings[3]["definitions"])[0]["example"]
            || (clone.meanings[3]["definitions"])[1]["example"];

        // const listen = (clone.phonetics[0]["audio"] || clone.phonetics[1]["audio"]);

        const listen = (clone.phonetics)[0].audio || "none" || (clone.phonetics)[1].audio || (clone.phonetics)[2].audio || (clone.phonetics)[3].audio;

        let htmlContent =
            `
        <div class="result">
                <audio id="myAudio">
                    <source class="audioCheck" src="${listen}" type="audio/mpeg">
                </audio>
                <div class="word">
                    <h3>${arrayWord}</h3>
                    <button onclick="playMusic()">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${details}</p>
                    <p>${text}</p>
                </div>
                <p class="word-meaning">
                    ${defi}
                </p>
                <p class="word-example">
                    ${exam} 
                </p>
            </div>
        `
        //hiển thị lên giao diện
        showResult.innerHTML = htmlContent;
    }
}
function playMusic() {
    let audio = document.querySelector("#myAudio");
    if (document.querySelector(".audioCheck").getAttribute("src") != "none") {
        audio.play();
    }
}
function handleInput() {
    let word = document.querySelector("#inp-word").value.trim();
    let regex = /^[a-zA-Z]*$/;
    let htmlContent = "";
    showError.innerHTML = "";
    if (!regex.test(word)) {
        htmlContent = `
        <div class="div_error" id="error">
                The word is not valid!
                <br>
                Please try again!
            </div>
        `
        showError.innerHTML = htmlContent;
    } else if (word.length == 0) {
        htmlContent = `
        <div class="div_error" id="error">
                That field is required!!
            </div>
        `
        showError.innerHTML = htmlContent;
    }
}

document.querySelector(".father__input").addEventListener("submit", (event) => {
    event.preventDefault();
    //dom data of input
    let word = document.querySelector("#inp-word").value.trim();
    // instance of 2 class Store and RenderUI
    let store = new Store();
    let ui = new RenderUI();
    handleInput();
    store.getInforWord(word)
        .then((inforWord) => {
            ui.renderInforWord(inforWord);
            showError.innerHTML = "";
        })
});





