import { useModal, ModalHookProps } from '@/hooks/useModal';
import React, { createContext, ReactNode, useContext } from 'react';
import { Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IoClose } from 'react-icons/io5';
import { cn } from '@/lib/utils';

export interface ModalContextType {
  modalProps: ModalHookProps | null;
  openModal: (props: ModalHookProps) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({ children }: { children: ReactNode }) {
  const { opened, modalProps, openModal, closeModal } = useModal();
  const md = useMediaQuery('(max-width: 768px)');

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalProps }}>
      <Modal
        closeOnEscape
        opened={opened}
        onClose={closeModal} // This ensures that the custom onClose is called
        radius={12}
        p={0}
        size={modalProps?.size || 'auto'}
        centered
        withCloseButton={false}
      >
        <div
          className={cn(
            'flex flex-col min-w-[400px] overflow-y-hidden h-full',
            modalProps?.modalWrapperClassName,
          )}
        >
          {modalProps &&
            (modalProps.asChild ? (
              <div>{modalProps.body}</div>
            ) : (
              <>
                <header className='flex justify-between  items-start p-6 '>
                  <hgroup>
                    <h4 className='text-lg font-semibold'>{modalProps.title}</h4>

                    <p className='text-sm text-gray-500 mt-1 font-normal'>{modalProps.subtitle}</p>
                  </hgroup>

                  {modalProps.withCloseButton && (
                    <button
                      className='group bg-slate-100 hover:bg-slate-500 p-2 rounded-full'
                      onClick={() => closeModal()}
                    >
                      <IoClose
                        size={16}
                        className='shrink-0 h-fit text-slate-500 group-hover:text-slate-200'
                      />
                    </button>
                  )}
                </header>

                {modalProps.body}
              </>
            ))}
        </div>
      </Modal>

      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used within ModalProvider');
  }

  return context;
};
