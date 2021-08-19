import React from 'react';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images, onImageClick }) => {
  return images.map(({ id, webformatURL, tags }) => {
    return (
      <li
        className={s.ImageGalleryItem}
        key={id}
        onClick={() => onImageClick(id)}
      >
        <img className={s.image} src={webformatURL} alt={tags} />
      </li>
    );
  });
};

export default ImageGalleryItem;
