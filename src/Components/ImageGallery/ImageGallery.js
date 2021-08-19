import React from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={s.ImageGallery}>
      <ImageGalleryItem images={images} onImageClick={onImageClick} />
    </ul>
  );
};

export default ImageGallery;
