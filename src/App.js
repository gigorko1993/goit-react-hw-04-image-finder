import React, { Component } from 'react';
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

class App extends Component {
  state = {
    value: '',
    page: 1,
    images: [],
    status: 'idle',
    loader: false,
    showModal: false,
    modalContent: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, value } = this.state;
    if (value !== prevState.value || page !== prevState.page) {
      if (page === 1) {
        this.resetImages();
      }

      this.setState({ loader: true });

      fetchImages(page, value)
        .then(res => {
          if (res.hits.length < 12) {
            toast.warn('All images are loaded', {
              toastId: 'anotherCustomId',
            });
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...res.hits],
            status: 'resolved',
          }));
        })
        .catch(() => this.setState({ status: 'rejected' }))
        .finally(() => {
          this.setState({ loader: false });
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    }
  }

  setValue = val => {
    this.setState(prevState => {
      if (prevState.value === val.toLowerCase()) {
        alert('alert');
        toast.dark('Try to change your input :)', {
          toastId: 'customId',
        });
        return;
      }

      return { value: val.toLowerCase(), page: 1 };
    });
  };

  resetImages = () => {
    this.setState({ images: [] });
  };

  setPage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  showModal = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal };
    });
  };

  onImageClick = id => {
    const modalImg = this.state.images.find(el => el.id === id);
    this.setState({ modalContent: modalImg });
    this.showModal();
  };

  render() {
    const { images, loader, status, showModal, modalContent } = this.state;

    return (
      <div>
        <Searchbar setValue={this.setValue} />

        {status === 'idle' ? (
          <h2 className={s.title}>Input your query to find images</h2>
        ) : null}
        {status === 'resolved' ? (
          <>
            <ImageGallery images={images} onImageClick={this.onImageClick} />
            <Button onClick={this.setPage} />
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
        {status === 'rejected' ? (
          <h2 className={s.title}>Error. Try to change your query</h2>
        ) : null}
        {showModal && (
          <Modal showModal={this.showModal}>
            <img src={modalContent.largeImageURL} alt={modalContent.tags} />
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
