import React from 'react';

import './styles/ImageItem.css';
import ImageItem from './ImageItem';

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
        </div>

        <div className='Badge__section-info'>
          <h3>{item.subtitle}</h3>
        </div>
      </div>
    );
  }
}


export default Item;