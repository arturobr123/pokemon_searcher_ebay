import React from 'react';

import './styles/ImageItem.css';
import ImageItem from './ImageItem';
import ItemInfo from "./ItemInfo";

class Item extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <div className='Badge'>

        <div className='Badge__section-name'>
          <ImageItem className='Badge__avatar' avatarURL={item.galleryURL} />
          <h1>
            {item.title}
          </h1>

          <br/>

          <h5>{item.subtitle}</h5>
        </div>

        <div className='Badge__section-info'>
          <ItemInfo />
        </div>
      </div>
    );
  }
}


export default Item;