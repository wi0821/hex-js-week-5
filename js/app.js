let localData = [];

  axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
    .then(res => {
      localData = res["data"]["data"];
      init ();
    })
    .catch(err => {
      console.log(err);
      localData = [
        {
          "id": 0,
          "name": "同步錯誤",
          "imgUrl": "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "area": "同步錯誤",
          "description": "伺服器同步錯誤",
          "group" :0,
          "price": 0,
          "rate": 0
        },]
      init ();
    })

const ticketCards = document.querySelector(".searchList-result");
const searchList = document.querySelector("#searchList");
const searchResultCount = document.querySelector(".searchList-selector p span");

const ticketName = document.querySelector("#ticketName");
const imageURL = document.querySelector("#imageURL");
const locList = document.querySelector("#locList");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketCount = document.querySelector("#ticketCount");
const ticketRates = document.querySelector("#ticketRates");
const ticketSpecText = document.querySelector("#ticketSpecText");

const btnAddTicket = document.querySelector("#btnAddTicket");

const searchListTag = objItem => `<li class="searchList-result-card"><div class="searchList-result-wrap"><img src="${objItem["imgUrl"]}"><span class="searchList-result-wrap-loc">${objItem["area"]}</span><span class="searchList-result-wrap-rates">${objItem["rate"]}</span></div><div class="searchList-result-content"><div class="searchList-result-content-text"><h3>${objItem["name"]}</h3><p>${objItem["description"]}</p></div><div class="searchList-result-content-info"><div class="searchList-result-content-info-stock"><p><i class="fa-solid fa-circle-exclamation" style="color: #00807E; margin-right: 6px;"></i><span>剩下最後 ${objItem["group"]} 組</span></p></div><div class="searchList-result-content-info-price"><p>TWD</p><span>$${objItem["price"]}</span></div></div></div></li>`;

init ();

function init () {
    let str = "";
    let totalCount = 0;
    localData.forEach((item,index,arr) =>{
        str +=  searchListTag(item);
        totalCount = arr.length;
      })
    ticketCards.innerHTML = str;
    searchResultCount.innerText = totalCount;

    ticketName.value = "";
    imageURL.value = "";
    locList.value = "";
    ticketSpecText.value = "";
    ticketCount.value = "";
    ticketPrice.value = "";
    ticketRates.value = "";
}

function isEmpty(item) {
  let trimItem = item.trim();
  if(trimItem == null || trimItem === "") {
    return true;
  }
}

function rateRange(rate) {
  let rateNum = parseFloat(rate);
  if(rateNum <= 1 || rateNum > 10) {
    return true;
  }
}

btnAddTicket.addEventListener("click", (e) => {
  if(isEmpty(ticketName.value)) {
    return alert("請填寫套票名稱");
  } else if(isEmpty(imageURL.value)) {
    return alert("請填寫圖片網址");
  } else if(isEmpty(locList.value)) {
    return alert("請選擇景點地區");
  } else if(isEmpty(ticketPrice.value)) {
    return alert("請填寫套票金額");
  } else if(isEmpty(ticketCount.value)) {
    return alert("請填寫套票組數");
  } else if(isEmpty(ticketRates.value)) {
    return alert("請填寫套票星級");
  } else if(rateRange(ticketRates.value)) {
    return alert("請輸入正確的套票星級範圍 (1~10)");
  } else if(isEmpty(ticketSpecText.value)) {
    return alert("請填寫套票描述");
  }

  let obj = {};

  obj["id"] = localData.length ;
  obj["name"] = ticketName.value;
  obj["imgUrl"] = imageURL.value;
  obj["area"] = locList.value;
  obj["description"] = ticketSpecText.value;
  obj["group"] =  parseInt(ticketCount.value);
  obj["price"] = parseInt(ticketPrice.value);
  obj["rate"] =  parseFloat(ticketRates.value).toFixed(1);

  localData.push(obj);

  alert("新增成功");

  init ();
})

searchList.addEventListener("change", (e) => {
  init ();


  let content = "";
  let totalCount = 0;
  localData.forEach((item,index,arr) => {
    if(e.target.value === item.area || e.target.value === "all") {
      content += searchListTag(item);
      totalCount++;
    } else {
      return;
    }
  })
  ticketCards.innerHTML = content;
  searchResultCount.innerText = totalCount;

})