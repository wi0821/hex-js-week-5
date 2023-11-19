let localData = [];

const ticketCards = document.querySelector(".searchList-result");
const searchList = document.querySelector("#searchList");
const searchResultCount = document.querySelector(".searchList-selector p span");

const ticketForm = document.querySelector(".addTicket-form");
const ticketName = document.querySelector("#ticketName");
const imageURL = document.querySelector("#imageURL");
const locList = document.querySelector("#locList");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketCount = document.querySelector("#ticketCount");
const ticketRates = document.querySelector("#ticketRates");
const ticketSpecText = document.querySelector("#ticketSpecText");

const btnAddTicket = document.querySelector("#btnAddTicket");

const searchListTag = objItem => `<li class="searchList-result-card"><div class="searchList-result-wrap"><img src="${objItem["imgUrl"]}"><span class="searchList-result-wrap-loc">${objItem["area"]}</span><span class="searchList-result-wrap-rates">${objItem["rate"]}</span></div><div class="searchList-result-content"><div class="searchList-result-content-text"><h3><a href="#">${objItem["name"]}</a></h3><p>${objItem["description"]}</p></div><div class="searchList-result-content-info"><div class="searchList-result-content-info-stock"><p><i class="fa-solid fa-circle-exclamation" style="color: #00807E; margin-right: 6px;"></i><span>剩下最後 ${objItem["group"]} 組</span></p></div><div class="searchList-result-content-info-price"><p>TWD</p><span>$${objItem["price"]}</span></div></div></div></li>`;

init();

function init() {
  axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  .then(res => {
    localData = res["data"]["data"];
    renderList();
    renderChart();
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
      renderList();
      renderChart();
  })
}

function renderList() {
    let str = "";
    localData.forEach((item) =>{
        str +=  searchListTag(item);
      })
    ticketCards.innerHTML = str;
    searchResultCount.innerText = localData.length;
}

function renderChart() {
  let tempObj = {};

  localData.forEach(item => {

    let area = item["area"];

    if (tempObj[area]) {
        tempObj[area]++;
    } else {
        tempObj[area] = 1;
    }

  })
  console.log(tempObj);

  let tempData = Object.keys(tempObj);
  console.log(tempData)

  let newAry = [];

  tempData.forEach(item => {
    let tempAry = [];
    tempAry.push(item);
    tempAry.push(tempObj[item]);
    console.log(tempAry);
    newAry.push(tempAry);
  })
  console.log(newAry);

  const chart = c3.generate({
    bindto: '.searchList-chart',
    data: {
        mimeType: 'json',
        type : 'donut',
        columns: newAry,
        colors: {
          "台北": "#26C0C7",
          "台中": "#5151D3",
          "高雄": "#E68618",
        },
        onclick: function (d, i) { console.log("onclick", d, i); },
    },
    donut: {
      label: {
        show: false,
      },
      width: 24,
      title: '套票地區比重',
    }
  });

}

function isEmpty(item) {
  let trimItem = item.trim();
  if(trimItem == null || trimItem === "") {
    return true;
  }
}

function rateRange(rate) {
  let rateNum = parseFloat(rate);
  if(rateNum < 1 || rateNum > 10) {
    return true;
  }
}

btnAddTicket.addEventListener("click", (e) => {
  console.log(e);
  e.preventDefault(); // 防止送出後跳窗

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
  obj["rate"] =  parseFloat(ticketRates.value);

  localData.push(obj);

  alert("新增成功");
  ticketForm.reset();

  renderList();
  renderChart();
  searchList.selectedIndex = 1; //重設選單為全部地區
})

searchList.addEventListener("change", (e) => {
  renderList();

  let content = "";
  let totalCount = 0;
  localData.forEach((item) => {
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



const chartDom = document.querySelector(".main");
const myChart = echarts.init(chartDom, null, { renderer: 'canvas' });
const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      color: [
          '#feca57',
          '#ff6b6b',
          '#48dbfb',
          '#1dd1a1',
          '#5f27cd',
          '#576574'
      ],
      radius: ['45%', '70%'],
      avoidLabelOverlap: true,
      label: {
        show: true,
        position: 'center',
        fontSize: 24,
        fontWeight: 'bold'
      },
      emphasis: {
        label: {
          show: false,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
};


const testData = [{name: "小明", age: 25}, {name:"小王", age:30}, {name:"小李", age:40}, {name:"小陳", age:15}]
let newArr = [];

function getData(array) {

  testData.forEach((item) => {
    let obj = {};
    obj.value = item.age;
    obj.name = item.name;
    newArr.push(obj);
  });

}

getData(testData);

option.series[0].data = newArr;

myChart.setOption(option);
// myChart.showLoading();
console.log(option.series[0].data);
