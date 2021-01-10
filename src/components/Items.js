import React from 'react';
import Item from "./Item";

function Items(props) {
  console.log("aaaaaaahhhhhh");
  console.log(props.items);

  const items = props.items;

  if (items.length === 0) {
    return (
      <div>
        <h3>No cards were found, may be you can help us creating the card than you were serching</h3>
      </div>
    );
  }

  return (
    <div>
     <h4>RESULTS</h4>
      <div className='all-item-area pd-bottom-100'>
      {items.map((item) => {
        return (
            <Item key={item.itemId} item={item} />
        );
       })}
      </div>
    </div>
  );
}

export default Items;
