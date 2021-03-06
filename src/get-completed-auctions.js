let axios = require('axios');

const EBAY_APP_ID = 'ArturoBr-FindPoke-PRD-5d4a2fe66-b9ba0a17'; // <- replace with your own developer ID
// eBay base API request URL

let baseUri = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords" +
    "&X-EBAY-SOA-SECURITY-APPNAME=" + EBAY_APP_ID +
    "&X-EBAY-SOA-RESPONSE-DATA-FORMAT=JSON" +
    "&X-EBAY-SOA-GLOBAL-ID=EBAY-US" +
    "&X-REQUESTED-WITH=XMLHttpRequest" +
    "&X-Access-Control-Allow-Origin=*" +
    "&REST-PAYLOAD" +
    "&itemFilter(0).name=Currency" +
    "&itemFilter(0).value=USD" +
    "&itemFilter(1).value=";

let getSingleItemUri = "https://open.api.ebay.com/shopping?callname=GetSingleItem" + 
"&responseencoding=JSON" + 
"&appid=" + EBAY_APP_ID + 
"&siteid=0" + 
"&version=967" + 
"&ItemID=353323119335"; //we need to pass this item id (we got this from previous query (baseUri))


function initialApiCall(uri) {
  return axios.get(uri)
}

function getPageItems(uri, page) {
  return axios.get(uri + '&paginationInput.pageNumber=' + page)
}

async function getCompletedEbayItems(keywords, days, condition) {
    let conditionFilter;
    if (condition === 'New' || condition === 'Used'){
        conditionFilter = "&itemFilter(2).name=Condition&itemFilter(2).value="
            + condition;
    }
    else if (condition === 'Seller Refurbished'){
        conditionFilter = "&itemFilter(2).name=Condition&itemFilter(2).value=" + "2500";
    }
    else if (condition === 'Manufacturer Refurbished') {
        conditionFilter = "&itemFilter(2).name=Condition&itemFilter(2).value=" + "2000";
    }
    else {
        console.log('Defaulting condition to "Used" due to invalid parameter!');
        conditionFilter = "&itemFilter(3).name=Condition&itemFilter(3).value="
            + 'Used';
    }
  
  let timeframe = setTimeframe(days);

  //ADD FILTERS TO URL
  baseUri = baseUri + timeframe + conditionFilter + "&keywords=";
  keywords = keywords.replace(/ /g, '%20');
  let uri = baseUri + keywords;

  //URIS which contain the corect JSON for each query
  console.log(`URI: ${uri}`);
  console.log(`URI to get single item: ${getSingleItemUri}`);

  //THIS WORKS :)
  const requestedValue = await fetch("http://localhost:3000/getPokemon");
  const requestedValueJson = await requestedValue.json();
  console.log("values from API, which are correct");
  console.log(requestedValueJson);

  //this return the array of items :)
  //console.log(requestedValueJson.findItemsByKeywordsResponse[0].searchResult[0].item);

  const items = requestedValueJson.findItemsByKeywordsResponse[0].searchResult[0].item;

  return items;
}

function setTimeframe(days){
  let timeframe = new Date();
  timeframe.setDate((timeframe.getDate() - days));
  // console.log(`Searching eBay sales back to: ${timeframe.toLocaleString('en-US')}`);
  timeframe = timeframe.toISOString();
  return timeframe;
}
export {
  getCompletedEbayItems
}