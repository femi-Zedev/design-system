'use client';

import { useState } from 'react';

export interface ModalHookProps {
  title?: string;
  subtitle?: string | React.JSX.Element;
  body: React.JSX.Element;
  asChild?: boolean;
  data?: any;
  size?: string;
  withCloseButton?: boolean;
  modalWrapperClassName?: string;
  onClose?: () => void; // Optional onClose handler
}

export const useModal = () => {
  const [opened, setOpened] = useState(false);
  const [modalProps, setModalProps] = useState<ModalHookProps | null>(null);

  const openModal = (props: ModalHookProps) => {
    setModalProps(props);
    setOpened(true);
  };

  const closeModal = () => {
    if (modalProps?.onClose) {
      modalProps.onClose(); // Call the onClose handler if provided
    }
    setOpened(false);
    setModalProps(null);
  };

  return { opened, modalProps, openModal, closeModal };
};
