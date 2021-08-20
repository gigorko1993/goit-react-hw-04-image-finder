import React, { useState, useEffect } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import Modal from './Components/Modal';
import Button from './Components/Button';

import s from './App.module.css';

import { fetchImages } from './Components/api';

const STATUS = {
  IDLE: 'idle',
  RESOLVED: 'resolved',
  REJECT: 'reject',
};
export default function App() {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    if (value === '') {
      return;
    }
    if (page === 1) {
      setImages([]);
    }
    setLoader(true);

    fetchImages(page, value)
      .then(res => {
        if (res.hits.length < 12) {
          toast.warn('All images are loaded', {
            toastId: 'anotherCustomId',
          });
        }

        setImages(prevImages => [...prevImages, ...res.hits]);
        setStatus(STATUS.RESOLVED);
      })
      .catch(() => setStatus(STATUS.REJECT))
      .finally(() => {
        setLoader(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  }, [page, value]);

  const setQuery = val => {
    if (value === val.toLowerCase()) {
      alert('alert');
      toast.dark('Try to change your input :)', {
        toastId: 'customId',
      });
      return;
    }
    setValue(val.toLowerCase());
    setPage(1);
  };

  const onImageClick = id => {
    const modalImg = images.find(el => el.id === id);
    setModalContent(modalImg);
    setShowModal(prevState => !prevState);
  };

  return (
    <div>
      <Searchbar onClick={setQuery} />

      {status === 'idle' ? (
        <h2 className={s.title}>Input your query to find images</h2>
      ) : null}
      {status === 'resolved' ? (
        <>
          <ImageGallery images={images} onImageClick={onImageClick} />
          <Button
            onClick={() => {
              setPage(prevPage => prevPage + 1);
            }}
          />
        </>
      ) : null}
      {loader && (
        <Loader
          className="Loader"
          type="Oval"
          color="#9900cc"
          height={180}
          width={180}
        />
      )}
      {status === 'reject' ? (
        <h2 className={s.title}>Error. Try to change your query</h2>
      ) : null}
      {showModal && (
        <Modal
          showModal={() => {
            setShowModal(prevState => !prevState);
          }}
        >
          <img src={modalContent.largeImageURL} alt={modalContent.tags} />
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
}
