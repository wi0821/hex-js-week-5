let data = [
    {
      "id": 0,
      "name": "肥宅心碎賞櫻3日",
      "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      "area": "高雄",
      "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      "group": 87,
      "price": 1400,
      "rate": 10.0
    },
    {
      "id": 1,
      "name": "貓空纜車雙程票",
      "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台北",
      "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      "group": 99,
      "price": 240,
      "rate": 2.0
    },
    {
      "id": 2,
      "name": "台中谷關溫泉會1日",
      "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台中",
      "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      "group": 20,
      "price": 1765,
      "rate": 7.0
    },
  ];

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
    data.forEach((item,index,arr) =>{
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

  obj["id"] = data.length ;
  obj["name"] = ticketName.value;
  obj["imgUrl"] = imageURL.value;
  obj["area"] = locList.value;
  obj["description"] = ticketSpecText.value;
  obj["group"] =  parseInt(ticketCount.value);
  obj["price"] = parseInt(ticketPrice.value);
  obj["rate"] =  parseFloat(ticketRates.value).toFixed(1);

  data.push(obj);

  alert("新增成功");

  init ();
})

searchList.addEventListener("change", (e) => {
  let content = "";
  let totalCount = 0;
  data.forEach((item,index,arr) => {
    if(e.target.value === item.area || e.target.value === "all") {
      content += searchListTag(item);
      console.log(index)
      totalCount++;
    } else {
      return;
    }
  })
  ticketCards.innerHTML = content;
  searchResultCount.innerText = totalCount;
})