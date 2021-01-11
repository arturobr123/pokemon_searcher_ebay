

export async function fetchItem(itemID) {

  let uri = "http://localhost:3000/getSpecificItem?itemID=";

  if(itemID !== null && itemID !== undefined){
      uri = uri + itemID;
  }

  const requestedValue = await fetch(uri);
  const requestedValueJson = await requestedValue.json();
  console.log("ITEM INFO");
  console.log(requestedValueJson);

  return requestedValueJson;
}  