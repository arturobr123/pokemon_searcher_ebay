import * as g from './get-completed-auctions';
let outliers = require('outliers');

let analysis = {};
let options = {
    listingType: 'FixedPrice' // can alternatively be 'Auction' and/or 'AuctionWithBIN'
};

const thisDataHelper = {
  
  name: 'dataHelper',
  getResults: function (keywords, days, condition, listingType) {
    // limit search to 30 days for relevancy and expediency
    // if (days > 30){
    //   console.log(`Timeframe of ${days} days exceeds` +
    //   `threshold for useful data return, setting to 30 days.`);
    //   days = 30;
    // }
    
    let results = filteredResults(keywords, days, condition, listingType)
        .then(items => {
          if (items.length === 0){
            console.log('No items were found')
            return
          }
          else {
            return items;
          }
        })
        .catch(err => {
          console.log(err)
        });
    return results;
  }
};

async function filteredResults(keywords, days, condition, listingType) {
  analysis.keywords = keywords;
  let results = '';
  if (listingType === 'Auction'){
      results = g.getCompletedEbayItems(keywords, days, condition);
  }
  // else if (listingType === 'Fixed'){
  //   results = f.getCompletedFixedPrice(keywords, days, condition);
  // }

  //MY CHANGE
  return  results;
}


export {
  thisDataHelper
}