// 變數設定
let cropType = "N04";
let data = [];
let newData = [];
let orderType = "averagePrice";
let orderDirection = "increase";
let searchContent = "";
const buttonGroup = document.querySelector(".button-group");
const searchGroup = document.querySelector(".seach-group");
const searchKey = document.querySelector(".seach-group input");
const showResult = document.querySelector(".show-result");
const showList = document.querySelector(".showList");
const webSelect = document.querySelector(".sort-select");
const moblieSelect = document.querySelector(".mobile-select");
const tHead = document.querySelector(".js-sort-advanced");
// 資料庫預先載入
axios.get("https://hexschool.github.io/js-filter-data/data.json")
    .then(function(response){
        data = response.data;
    });

// 點擊套用作物種類

buttonGroup.addEventListener("click",function(e){
    if (e.target.nodeName === "BUTTON" || e.target.nodeName === "FONT"){
        if (e.target.textContent === "蔬果"){
            cropType = "N04";
            buttonGroup.innerHTML = `<button data-type="N04" type="button" class="vegetablesBtn btn btn-type border-dark border-2 active-btn" >蔬果</button>
            <button data-type="N05" type="button" class="fruitsBtn btn btn-type border-dark border-2">水果</button>
            <button data-type="N06" type="button" class="flowersBtn btn btn-type border-dark border-2">花卉</button>`
        } else if (e.target.textContent === "水果"){
            cropType = "N05";
            buttonGroup.innerHTML = `<button data-type="N04" type="button" class="vegetablesBtn btn btn-type border-dark border-2" >蔬果</button>
            <button data-type="N05" type="button" class="fruitsBtn btn btn-type border-dark border-2 active-btn">水果</button>
            <button data-type="N06" type="button" class="flowersBtn btn btn-type border-dark border-2">花卉</button>`
        } else if (e.target.textContent === "花卉"){
            cropType = "N06";
            buttonGroup.innerHTML = `<button data-type="N04" type="button" class="vegetablesBtn btn btn-type border-dark border-2" >蔬果</button>
            <button data-type="N05" type="button" class="fruitsBtn btn btn-type border-dark border-2">水果</button>
            <button data-type="N06" type="button" class="flowersBtn btn btn-type border-dark border-2 active-btn">花卉</button>`
        }
    }else {
        return;
    }
});

//搜尋功能

searchGroup.addEventListener("click",function(e){
    if (e.target.nodeName !== "BUTTON"){
        return;
    };
    if (searchKey.value == ""){
        alert ("請輸入作物名稱 ! ex : 椰子、草莓。");
        return;
    };
    searchContent = searchKey.value;
    showResult.textContent = `查看「${searchContent}」的比價結果`;
    showList.innerHTML = `<tr>
    <td colspan="7" class="text-center p-3">資料載入中...</td>
    </tr>`;
    // 根據種類與關鍵字，過濾出符合資料。
    newData = data.filter(function(item){
        return item.種類代碼 == cropType && item.作物名稱.match(searchContent);
    });
    // 查無資料表示
    if (newData == ""){
        showList.innerHTML = `<tr>
        <td colspan="7" class="text-center p-3">查詢不到「${searchContent}」的交易資訊</td>
        </tr>`;
        return;
    };

    showNewList();
});

// 資料呈現函式

function showNewList(){
    // 資料排序步驟
    if (orderDirection === "increase"){
        if (orderType === "upPrice"){
            newData.sort(function(a,b){
                return a.上價 - b.上價 ;
            });
        } else if (orderType === "middlePrice"){
            newData.sort(function(a,b){
                return a.中價 - b.中價 ;
            });
        } else if (orderType === "downPrice"){
            newData.sort(function(a,b){
                return a.下價 - b.下價 ;
            });
        } else if (orderType === "averagePrice"){
            newData.sort(function(a,b){
                return a.平均價 - b.平均價 ;
            });
        } else if (orderType === "dealMount"){
            newData.sort(function(a,b){
                return a.交易量 - b.交易量 ;
            });
        };
    } else if (orderDirection === "decrease"){
        if (orderType === "upPrice"){
            newData.sort(function(a,b){
                return b.上價 - a.上價 ;
            });
        } else if (orderType === "middlePrice"){
            newData.sort(function(a,b){
                return b.中價 - a.中價 ;
            });
        } else if (orderType === "downPrice"){
            newData.sort(function(a,b){
                return b.下價 - a.下價 ;
            });
        } else if (orderType === "averagePrice"){
            newData.sort(function(a,b){
                return b.平均價 - a.平均價 ;
            });
        } else if (orderType === "dealMount"){
            newData.sort(function(a,b){
                return b.交易量 - a.交易量 ;
            });
        };
    };
    
    // 符合資料呈現到網頁上
    let str = "";
    newData.forEach(function(item,index){
        str += `<tr>
        <td>${item.作物名稱}</td>
        <td>${item.市場名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td>
        </tr>`;
        showList.innerHTML = str;
    });
};

// 選單排列功能

webSelect.addEventListener("change",function(e){
    if (e.target.value === "排序篩選"){
        return;
    } else if (e.target.value === "依上價排序"){
        orderType = "upPrice";
    } else if (e.target.value === "依中價排序"){
        orderType = "middlePrice";
    } else if (e.target.value === "依下價排序"){
        orderType = "downPrice";
    } else if (e.target.value === "依平均價排序"){
        orderType = "averagePrice";
    } else if (e.target.value === "依交易量排序"){
        orderType = "dealMount";
    };
    showNewList();
});

moblieSelect.addEventListener("change",function(e){
    if (e.target.value === "排序"){
        return;
    } else if (e.target.value === "上價"){
        orderType = "upPrice";
    } else if (e.target.value === "中價"){
        orderType = "middlePrice";
    } else if (e.target.value === "下價"){
        orderType = "downPrice";
    } else if (e.target.value === "平均價"){
        orderType = "averagePrice";
    } else if (e.target.value === "交易量"){
        orderType = "dealMount";
    };
    showNewList();
});

// 進階箭頭排序功能

tHead.addEventListener("click",function(e){
    if (e.target.nodeName !== "I"){
        return;
    };

    if (e.target.dataset.sort === "up"){
        orderDirection = "increase";
        if(e.target.dataset.price === "上價"){
            orderType = "upPrice";
        } else if(e.target.dataset.price === "中價"){
            orderType = "middlePrice";
        } else if(e.target.dataset.price === "下價"){
            orderType = "downPrice";
        } else if(e.target.dataset.price === "平均價"){
            orderType = "averagePrice";
        } else if(e.target.dataset.price === "交易量"){
            orderType = "dealMount";
        };
    } else if (e.target.dataset.sort === "down"){
        orderDirection = "decrease";
        if(e.target.dataset.price === "上價"){
            orderType = "upPrice";
        } else if(e.target.dataset.price === "中價"){
            orderType = "middlePrice";
        } else if(e.target.dataset.price === "下價"){
            orderType = "downPrice";
        } else if(e.target.dataset.price === "平均價"){
            orderType = "averagePrice";
        } else if(e.target.dataset.price === "交易量"){
            orderType = "dealMount";
        };
    };

    showNewList();
});