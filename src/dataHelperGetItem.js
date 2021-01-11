export async function fetchItem() {
  const requestedValue = await fetch("http://localhost:3000/getSpecificItem");
  const requestedValueJson = await requestedValue.json();
  console.log("ITEM INFO");
  console.log(requestedValueJson);

  return requestedValueJson;
}  