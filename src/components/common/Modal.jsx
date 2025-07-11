import React, { forwardRef, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Modal DaisyUI
 * https://daisyui.com/components/modal/
 */
const Modal = forwardRef(({
  open = false,
  onClose,
  backdrop = true,
  backdropClose = true,
  children,
  className = '',
  ...props
}, ref) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && open && onClose) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  const handleBackdropClick = (event) => {
    if (backdrop && backdropClose && event.target === modalRef.current && onClose) {
      onClose();
    }
  };

  if (!open) return null;

  const classes = [
    'modal',
    'modal-open',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      onClick={handleBackdropClick}
      {...props}
    >
      <div
        ref={modalRef}
        className="modal-box relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      {backdrop && <div className="modal-backdrop"></div>}
    </div>
  );
});

Modal.displayName = 'Modal';

// Modal Header
const ModalHeader = ({
  children,
  title,
  onClose,
  showClose = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`modal-header mb-4 ${className}`} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {title && <h3 className="text-lg font-bold">{title}</h3>}
          {children}
        </div>
        {showClose && onClose && (
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
            aria-label="Fermer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

ModalHeader.displayName = 'ModalHeader';

// Modal Body
const ModalBody = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`modal-body ${className}`} {...props}>
      {children}
    </div>
  );
};

ModalBody.displayName = 'ModalBody';

// Modal Footer
const ModalFooter = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`modal-action mt-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

ModalFooter.displayName = 'ModalFooter';

// Modal avec structure complète
const ModalWithStructure = ({
  open = false,
  onClose,
  title,
  children,
  actions,
  showClose = true,
  backdrop = true,
  backdropClose = true,
  className = '',
  ...props
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      backdrop={backdrop}
      backdropClose={backdropClose}
      className={className}
      {...props}
    >
      <ModalHeader title={title} onClose={onClose} showClose={showClose} />
      <ModalBody>
        {children}
      </ModalBody>
      {actions && (
        <ModalFooter>
          {actions}
        </ModalFooter>
      )}
    </Modal>
  );
};

ModalWithStructure.displayName = 'ModalWithStructure';

// Modal de confirmation
const ModalConfirm = ({
  open = false,
  onClose,
  onConfirm,
  title = 'Confirmer',
  message = 'Êtes-vous sûr de vouloir continuer ?',
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  confirmVariant = 'primary',
  destructive = false,
  loading = false,
  className = '',
  ...props
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const confirmButtonVariant = destructive ? 'error' : confirmVariant;

  return (
    <Modal
      open={open}
      onClose={onClose}
      backdrop={true}
      backdropClose={!loading}
      className={className}
      {...props}
    >
      <ModalHeader title={title} onClose={onClose} showClose={!loading} />
      <ModalBody>
        <p className="py-4">{message}</p>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </button>
        <button
          type="button"
          className={`btn btn-${confirmButtonVariant} ${loading ? 'loading' : ''}`}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? 'Chargement...' : confirmText}
        </button>
      </ModalFooter>
    </Modal>
  );
};

ModalConfirm.displayName = 'ModalConfirm';

// Modal d'alerte
const ModalAlert = ({
  open = false,
  onClose,
  title = 'Attention',
  message,
  variant = 'warning',
  buttonText = 'OK',
  className = '',
  ...props
}) => {
  const icons = {
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    success: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    error: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      backdrop={true}
      backdropClose={true}
      className={className}
      {...props}
    >
      <ModalHeader title={title} onClose={onClose} />
      <ModalBody>
        <div className="flex items-start gap-4">
          {icons[variant]}
          <div className="flex-1">
            <p>{message}</p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className={`btn btn-${variant}`}
          onClick={onClose}
        >
          {buttonText}
        </button>
      </ModalFooter>
    </Modal>
  );
};

ModalAlert.displayName = 'ModalAlert';

// Modal de formulaire
const ModalForm = ({
  open = false,
  onClose,
  onSubmit,
  title,
  children,
  submitText = 'Valider',
  cancelText = 'Annuler',
  submitVariant = 'primary',
  loading = false,
  className = '',
  ...props
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(event);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      backdrop={true}
      backdropClose={!loading}
      className={className}
      {...props}
    >
      <form onSubmit={handleSubmit}>
        <ModalHeader title={title} onClose={onClose} showClose={!loading} />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            type="submit"
            className={`btn btn-${submitVariant} ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Chargement...' : submitText}
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

ModalForm.displayName = 'ModalForm';

// Modal image
const ModalImage = ({
  open = false,
  onClose,
  src,
  alt = '',
  title,
  description,
  className = '',
  ...props
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      backdrop={true}
      backdropClose={true}
      className={className}
      {...props}
    >
      <ModalHeader title={title} onClose={onClose} />
      <ModalBody>
        {src && (
          <img
            src={src}
            alt={alt}
            className="w-full h-auto max-h-[60vh] object-contain"
          />
        )}
        {description && (
          <p className="mt-4 text-sm text-base-content/70">{description}</p>
        )}
      </ModalBody>
    </Modal>
  );
};

ModalImage.displayName = 'ModalImage';

// Modal plein écran
const ModalFullscreen = ({
  open = false,
  onClose,
  children,
  className = '',
  ...props
}) => {
  const classes = [
    'modal-box w-full max-w-full h-full max-h-full rounded-none m-0',
    className
  ].filter(Boolean).join(' ');

  return (
    <Modal
      open={open}
      onClose={onClose}
      backdrop={true}
      backdropClose={true}
      className="modal-fullscreen"
      {...props}
    >
      <div className={classes}>
        {children}
      </div>
    </Modal>
  );
};

ModalFullscreen.displayName = 'ModalFullscreen';

// Modal drawer (latéral)
const ModalDrawer = ({
  open = false,
  onClose,
  position = 'right',
  children,
  className = '',
  ...props
}) => {
  const positionClasses = {
    left: 'modal-box-left',
    right: 'modal-box-right',
    top: 'modal-box-top',
    bottom: 'modal-box-bottom'
  };

  const classes = [
    'modal-box h-full max-h-full rounded-none m-0 max-w-sm',
    positionClasses[position],
    className
  ].filter(Boolean).join(' ');

  return (
    <Modal
      open={open}
      onClose={onClose}
      backdrop={true}
      backdropClose={true}
      className={`modal-drawer modal-drawer-${position}`}
      {...props}
    >
      <div className={classes}>
        {children}
      </div>
    </Modal>
  );
};

ModalDrawer.displayName = 'ModalDrawer';

// Modal avec tailles
const ModalSmall = ({ className = '', ...props }) => (
  <Modal className={`modal-small ${className}`} {...props} />
);

const ModalMedium = ({ className = '', ...props }) => (
  <Modal className={`modal-medium ${className}`} {...props} />
);

const ModalLarge = ({ className = '', ...props }) => (
  <Modal className={`modal-large ${className}`} {...props} />
);

const ModalXLarge = ({ className = '', ...props }) => (
  <Modal className={`modal-xlarge ${className}`} {...props} />
);

// Modal avec animation
const ModalFade = ({ className = '', ...props }) => (
  <Modal className={`modal-fade ${className}`} {...props} />
);

const ModalSlide = ({ className = '', ...props }) => (
  <Modal className={`modal-slide ${className}`} {...props} />
);

const ModalZoom = ({ className = '', ...props }) => (
  <Modal className={`modal-zoom ${className}`} {...props} />
);

// PropTypes
Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  backdrop: PropTypes.bool,
  backdropClose: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

ModalHeader.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func,
  showClose: PropTypes.bool,
  className: PropTypes.string,
};

ModalBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

ModalFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

ModalWithStructure.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  actions: PropTypes.node,
  showClose: PropTypes.bool,
  backdrop: PropTypes.bool,
  backdropClose: PropTypes.bool,
  className: PropTypes.string,
};

ModalConfirm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmVariant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'ghost', 'link', 'info', 'success', 'warning', 'error']),
  destructive: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

ModalAlert.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  buttonText: PropTypes.string,
  className: PropTypes.string,
};

ModalForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  submitVariant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'ghost', 'link', 'info', 'success', 'warning', 'error']),
  loading: PropTypes.bool,
  className: PropTypes.string,
};

ModalImage.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
};

ModalFullscreen.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

ModalDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  children: PropTypes.node,
  className: PropTypes.string,
};

ModalSmall.propTypes = {
  className: PropTypes.string,
};

ModalMedium.propTypes = {
  className: PropTypes.string,
};

ModalLarge.propTypes = {
  className: PropTypes.string,
};

ModalXLarge.propTypes = {
  className: PropTypes.string,
};

ModalFade.propTypes = {
  className: PropTypes.string,
};

ModalSlide.propTypes = {
  className: PropTypes.string,
};

ModalZoom.propTypes = {
  className: PropTypes.string,
};

// Attacher les noms d'affichage
ModalSmall.displayName = 'ModalSmall';
ModalMedium.displayName = 'ModalMedium';
ModalLarge.displayName = 'ModalLarge';
ModalXLarge.displayName = 'ModalXLarge';
ModalFade.displayName = 'ModalFade';
ModalSlide.displayName = 'ModalSlide';
ModalZoom.displayName = 'ModalZoom';

// Export des sous-composants
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Template = ModalWithStructure; // Alias pour cohérence avec les autres composants
Modal.WithStructure = ModalWithStructure;
Modal.Confirm = ModalConfirm;
Modal.Alert = ModalAlert;
Modal.Form = ModalForm;
Modal.Image = ModalImage;
Modal.Fullscreen = ModalFullscreen;
Modal.Drawer = ModalDrawer;
Modal.Small = ModalSmall;
Modal.Medium = ModalMedium;
Modal.Large = ModalLarge;
Modal.XLarge = ModalXLarge;
Modal.Fade = ModalFade;
Modal.Slide = ModalSlide;
Modal.Zoom = ModalZoom;

export default Modal; 