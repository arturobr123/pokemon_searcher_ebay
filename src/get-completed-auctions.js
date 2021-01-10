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

//IT WORKS, PASTE THIS IN CHROME (check console to see url when do a search)
let getSingleItemUri = "https://open.api.ebay.com/shopping?callname=GetSingleItem" + 
"&responseencoding=JSON" + 
"&appid=" + EBAY_APP_ID + 
"&siteid=0" + 
"&version=967" + 
"&ItemID=353323119335";

//MY CHANGES
// let options = {
//   'operation-name': 'findCompletedItems',
//   'keywords': "charizard",
//   'sortOrder': 'EndTimeSoonest'
// };

// const ebayEndpoint = axios.create({
//   method: 'get',
//   url: 'http://svcs.ebay.com/services/search/FindingService/v1',
//   headers: {
//     'X-EBAY-SOA-GLOBAL-ID': 'EBAY-US',
//     'X-EBAY-SOA-RESPONSE-DATA-FORMAT': 'JSON',
//     'X-EBAY-SOA-SECURITY-APPNAME': EBAY_APP_ID
//   },
//   headers: {'X-Requested-With': 'XMLHttpRequest'},
//   });


//RIGHT NOT IS NOT WORKING, BUT WHEN I SEARCH, IN THE CONSOLE, THE URL WILL BE LOG,
//COPY THAT URL AND PASTE IT IN CHROME, I SHOULD SEE THE JSON RESULTS

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
  baseUri = baseUri + timeframe + conditionFilter + "&keywords=";
  keywords = keywords.replace(/ /g, '%20');
  let uri = baseUri + keywords;
  console.log(`URI: ${uri}`);
  console.log(`URI to get single item: ${getSingleItemUri}`);
  let responses = async() => {
    const returnedItems = initialApiCall(uri)
        .then(response => {
          let pageCount = response.data.findCompletedItemsResponse[0].paginationOutput[0].totalPages[0];
          // limit pagination to 50 from results
          if (pageCount > 50){ pageCount = 50 };
          
          // let totalItems = response.data.findCompletedItemsResponse[0].paginationOutput[0].totalEntries[0];
          // console.log('Total completed items: ' + totalItems);
          // console.log('Paginated results: ' + pageCount);
        
          let promiseArray = [];
          for (let i = 0; i < pageCount; i++) {
            let pageNum = i + 1;
            promiseArray.push(getPageItems(uri, pageNum));
          }
          return Promise.all(promiseArray);
        })
        .catch(err => {
          console.log(err)
        });
    return returnedItems;
  }
  return await responses();
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