//Bộ API của Dictionary
const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en";
//tạo sẵn biến để lát dom tới cho dễ
const showResult = document.querySelector(".result");
const showError = document.querySelector(".div_error");

//class gửi request cho server
class Http {
  get(url) {
    return fetch(url).then((response) => {
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
  //hàm nhận về word và thông tin của nó
  getInforWord(word) {
    return this.http.get(`${baseURL}/${word}`);
  }
}

//class hiển thị data lên giao diện
class RenderUI {
  renderInforWord(inforWord) {
    //lấy về từ vựng hay gọi cách khác là chữ ()
    const word = inforWord[0].word;
    // lấy về thông tin của chữ
    const details = inforWord[0].meanings[0]["partOfSpeech"];
    //tìm phonetics nếu trường hợp nó nằm ở vị trí thứ 2
    const text =
      inforWord[0].phonetics[0]["text"] || inforWord[0].phonetics[1]["text"];
    //clone này dùng truy cập vào mảng meanings đọc cho dễ <3
    const clone = inforWord[0];
    //tìm definitions trong mảng meanings của api
    const defi =
      clone.meanings[0]["definitions"][0]["definition"] ||
      "The API has no data about this vocabulary" ||
      clone.meanings[0]["definitions"][1]["definition"] ||
      clone.meanings[0]["definitions"][2]["definition"] ||
      clone.meanings[0]["definitions"][3]["definition"] ||
      clone.meanings[0]["definitions"][4]["definition"];
    //tìm example trong definitions (khó)
    const exam =
      clone.meanings[0]["definitions"][0]["example"] ||
      "The API has no data about this vocabulary" ||
      clone.meanings[0]["definitions"][1]["example"] ||
      clone.meanings[0]["definitions"][2]["example"] ||
      clone.meanings[1]["definitions"][1]["example"] ||
      clone.meanings[2]["definitions"][0]["example"] ||
      clone.meanings[2]["definitions"][1]["example"] ||
      clone.meanings[2]["definitions"][2]["example"] ||
      clone.meanings[2]["definitions"][3]["example"] ||
      clone.meanings[3]["definitions"][0]["example"] ||
      clone.meanings[3]["definitions"][1]["example"];

    // const listen = (clone.phonetics[0]["audio"] || clone.phonetics[1]["audio"]);
    const listen =
      clone.phonetics[0].audio ||
      "none" ||
      clone.phonetics[1].audio ||
      clone.phonetics[2].audio ||
      clone.phonetics[3].audio;

    let htmlContent = `
        <div class="result">
                <audio id="myAudio">
                    <source class="audioCheck" src="${listen}" type="audio/mpeg">
                </audio>
                <div class="word">
                    <h3>${word}</h3>
                    
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
        `;
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
  let regex = /^$/;
  let htmlContent = "";
  showError.innerHTML = "";
  if (!regex.test(word)) {
    htmlContent = `
        <div class="div_error" id="error">
                The word is not valid!
                <br>
                Please try again!
            </div>
        `;
    showError.innerHTML = htmlContent;
  } else if (word.length == 0) {
    htmlContent = `
        <div class="div_error" id="error">
                That field is required!!
            </div>
        `;
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
  store.getInforWord(word).then((inforWord) => {
    ui.renderInforWord(inforWord);
    showError.innerHTML = "";
  });
});

//chỗ hiển thị require còn gà có thời gian sẽ chỉnh sửa
/*
<button onclick="playMusic()">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
 chỗ này của phần volume nhưng chưa dùng được
 sẽ fix trong tương lai
 
 DÒNG 40 tới 43 của html 
 và 74 của js
 hehe hihi aa z
*/
