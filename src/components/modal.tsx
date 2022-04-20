import styles from '../styles/Home.module.scss';

type ModalType = {
  is_visible: boolean;
  onClose: () => void;
  children: React.ReactElement;
  title: string;
};

const Modal: React.FC<ModalType> = ({
  is_visible,
  onClose,
  children,
  title,
}) => {
  const closeModal = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    is_visible && (
      <div className={styles['modal-overlay']}>
        <div className={styles.modal}>
          <div className={styles['modal-header']}>
            {title && <span>{title}</span>}
            <a href="#" onClick={closeModal}>
              x
            </a>
          </div>
          <div className={styles['modal-body']}>{children}</div>
        </div>
      </div>
    )
  );
};

export default Modal;
