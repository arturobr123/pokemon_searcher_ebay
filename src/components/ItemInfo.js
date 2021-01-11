import React, { Fragment, useEffect, useState } from 'react';

import {fetchItem} from "../dataHelperGetItem";

class ItemInfo extends React.Component {


  // const requestedValue = await fetch("http://localhost:3000/getSpecificItem");
  // const requestedValueJson = await requestedValue.json();
  // console.log("ITEM INFO");
  // console.log(requestedValueJson);

  // const data = await fetchItem();
  // console.log("data of one item");
  // console.log(data);

  state = {
    loading: true,
    error: null,
    data: undefined,
    modalIsOpen: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  //inspire by GRADE_CARD_MARKETPLACE/src/pages/BadgeDetailsContainer.js
  fetchData = async () => {
    // const { match } = this.props;
    // const { params } = match;
    
    const data = await fetchItem();

    console.log("data of one item");
    console.log(data);
    console.log(data.Item);

    this.setState({data : data});

  };


  render() {
    return (
      <div className='Badges__container'>

        {this.state.data && 
          <div>
          {this.state.data.Item.PictureURL.map((image, index) => {
            return (
              <img
                key={index}
                src={image}
                alt="Item"
                width="120px" 
                height="120px"
              />
            );
          })}
          </div>
         }
    </div>);
  }


};

export default ItemInfo;