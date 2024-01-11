const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

// for dropdown
const dropdown=document.querySelectorAll(".dropdown select");
for(let select of dropdown){
for(currencyCode in countryList){
let nOption=document.createElement("option");
nOption.innerText=currencyCode;
nOption.value=currencyCode;
if(select.name==="from" && currencyCode==="INR"){
    nOption.selected="selected";
}else if(select.name==="to" && currencyCode==="USD"){
    nOption.selected="selected";
}
select.append(nOption);
}
// for update flag
select.addEventListener("change",(e)=>{
    changeFlag(e.target);
})
}

// for update flag

const changeFlag=(e)=>{
    let currencyCode=e.value;
    let countryCode=countryList[currencyCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=e.parentElement.querySelector("img");
    img.src=newSrc;
    // console.log(countryCode);
}

const result=document.querySelector(".msg");

const fromCurrency=document.querySelector(".from select");

const toCurrency=document.querySelector(".to select");
// console.log("currrrrr====",fromCurrency.value,toCurrency.value);
const btn=document.querySelector("button");
btn.addEventListener("click",async(e)=>{
    e.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountValue=amount.value;
    if(amountValue==="" || amountValue<1){
        amountValue=1;
        amount.value="1";
    }
    console.log(amountValue);
    const URL=`${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[toCurrency.value.toLowerCase()];
    let finalAmount=amountValue * rate;
    result.innerHTML=`${amountValue} ${fromCurrency.value} = ${finalAmount.toFixed(3)} ${toCurrency.value}`;
    console.log(finalAmount);
})
