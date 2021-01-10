import React from 'react';

function ImageItem(props) {
  const url = props.avatarURL;

  return (
    <img
      className={props.className}
      src={url}
      alt="Item"
    />
  );
}

export default ImageItem;