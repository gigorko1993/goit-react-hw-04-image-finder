import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { MdHighlightOff } from 'react-icons/md';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalbyEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalbyEsc);
  }

  closeModalbyEsc = e => {
    if (e.code === 'Escape') {
      this.props.showModal();
    }
  };

  closeModalbyClick = e => {
    if (e.currentTarget === e.target) {
      this.props.showModal();
    }
  };

  render() {
    return createPortal(
      <div className={s.backdrop} onClick={this.closeModalbyClick}>
        <div className={s.modal}>
          <button
            type="button"
            onClick={() => this.props.showModal()}
            className={s.button}
          >
            <MdHighlightOff className={s.icon} />
          </button>
          {this.props.children}
        </div>
      </div>,
      modalRoot,
    );
  }
}
