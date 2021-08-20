import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MdHighlightOff } from 'react-icons/md';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, showModal }) {
  const onClose = useRef(null);

  useEffect(() => {
    window.addEventListener('keydown', onClose.current);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', onClose.current);
    };
  });

  onClose.current = e => {
    if (e.code === 'Escape') {
      showModal();
    }
  };

  const closeModalbyClick = e => {
    if (e.currentTarget === e.target) {
      showModal();
    }
  };

  return createPortal(
    <div className={s.backdrop} onClick={closeModalbyClick}>
      <div className={s.modal}>
        <button type="button" onClick={() => showModal()} className={s.button}>
          <MdHighlightOff className={s.icon} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
