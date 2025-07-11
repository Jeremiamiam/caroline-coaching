import React, { forwardRef, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Toast DaisyUI
 * https://daisyui.com/components/toast/
 */
const Toast = forwardRef(({
  children,
  className = '',
  position = 'top-end',
  ...props
}, ref) => {
  const classes = [
    'toast',
    `toast-${position}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Toast.displayName = 'Toast';

// Toast Item individuel
const ToastItem = forwardRef(({
  children,
  variant = 'info',
  className = '',
  onClose,
  autoClose = true,
  duration = 4000,
  show, // Extract show to avoid passing it to DOM
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (autoClose && duration > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [autoClose, duration, onClose]);

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
    onClose?.();
  };

  // Use show prop to control visibility if provided
  const shouldShow = show !== undefined ? show : isVisible;
  
  if (!shouldShow) return null;

  const classes = [
    'alert',
    `alert-${variant}`,
    'cursor-pointer',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      onClick={handleClose}
      role="alert"
      {...props}
    >
      <div className="flex-1">
        {children}
      </div>
      <button
        type="button"
        className="btn btn-sm btn-ghost btn-square"
        onClick={handleClose}
        aria-label="Fermer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
});

ToastItem.displayName = 'ToastItem';

// Toast avec titre et description
const ToastWithContent = ({
  title,
  description,
  variant = 'info',
  icon,
  onClose,
  autoClose = true,
  duration = 4000,
  className = '',
  ...props
}) => {
  const defaultIcons = {
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    success: (
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    error: (
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <ToastItem
      variant={variant}
      onClose={onClose}
      autoClose={autoClose}
      duration={duration}
      className={className}
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon !== false && (icon || defaultIcons[variant])}
        <div className="flex-1">
          {title && <h3 className="font-bold">{title}</h3>}
          {description && <div className="text-sm">{description}</div>}
        </div>
      </div>
    </ToastItem>
  );
};

ToastWithContent.displayName = 'ToastWithContent';

// Toast avec actions
const ToastWithActions = ({
  title,
  description,
  variant = 'info',
  primaryAction,
  secondaryAction,
  onClose,
  autoClose = false, // Désactivé par défaut pour les actions
  duration = 4000,
  className = '',
  ...props
}) => {
  return (
    <ToastItem
      variant={variant}
      onClose={onClose}
      autoClose={autoClose}
      duration={duration}
      className={className}
      {...props}
    >
      <div className="flex-1">
        {title && <h3 className="font-bold">{title}</h3>}
        {description && <div className="text-sm mb-2">{description}</div>}
        <div className="flex gap-2">
          {primaryAction && (
            <button
              className={`btn btn-sm btn-${variant}`}
              onClick={(e) => {
                e.stopPropagation();
                primaryAction.onClick();
              }}
            >
              {primaryAction.label}
            </button>
          )}
          {secondaryAction && (
            <button
              className="btn btn-sm btn-ghost"
              onClick={(e) => {
                e.stopPropagation();
                secondaryAction.onClick();
              }}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      </div>
    </ToastItem>
  );
};

ToastWithActions.displayName = 'ToastWithActions';

// Toast Manager pour gérer plusieurs toasts
const ToastManager = ({ toasts = [], position = 'top-end', className = '', ...props }) => {
  return (
    <Toast position={position} className={className} {...props}>
      {toasts.map((toast, index) => (
        <div key={toast.id || index} className="mb-2">
          {toast}
        </div>
      ))}
    </Toast>
  );
};

ToastManager.displayName = 'ToastManager';

// Hook pour gérer les toasts
const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearToasts = () => {
    setToasts([]);
  };

  const toast = {
    success: (title, description, options = {}) => {
      return addToast({
        variant: 'success',
        title,
        description,
        ...options
      });
    },
    error: (title, description, options = {}) => {
      return addToast({
        variant: 'error',
        title,
        description,
        ...options
      });
    },
    warning: (title, description, options = {}) => {
      return addToast({
        variant: 'warning',
        title,
        description,
        ...options
      });
    },
    info: (title, description, options = {}) => {
      return addToast({
        variant: 'info',
        title,
        description,
        ...options
      });
    }
  };

  return {
    toasts,
    toast,
    removeToast,
    clearToasts
  };
};

// Toast Provider pour le contexte global
const ToastProvider = ({ children, position = 'top-end' }) => {
  const { toasts, removeToast } = useToast();

  return (
    <>
      {children}
      {toasts.length > 0 && (
        <ToastManager position={position}>
          {toasts.map(toast => (
            <ToastWithContent
              key={toast.id}
              title={toast.title}
              description={toast.description}
              variant={toast.variant}
              onClose={() => removeToast(toast.id)}
              autoClose={toast.autoClose !== false}
              duration={toast.duration || 4000}
            />
          ))}
        </ToastManager>
      )}
    </>
  );
};

ToastProvider.displayName = 'ToastProvider';

// Toast avec progress
const ToastWithProgress = ({
  title,
  description,
  progress = 0,
  variant = 'info',
  onClose,
  autoClose = false,
  className = '',
  ...props
}) => {
  return (
    <ToastItem
      variant={variant}
      onClose={onClose}
      autoClose={autoClose}
      className={className}
      {...props}
    >
      <div className="flex-1">
        {title && <h3 className="font-bold">{title}</h3>}
        {description && <div className="text-sm mb-2">{description}</div>}
        <div className="flex items-center gap-2">
          <progress className={`progress progress-${variant} flex-1`} value={progress} max="100"></progress>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
      </div>
    </ToastItem>
  );
};

ToastWithProgress.displayName = 'ToastWithProgress';

// Toast avec avatar
const ToastWithAvatar = ({
  title,
  description,
  avatar,
  variant = 'info',
  onClose,
  autoClose = true,
  duration = 4000,
  className = '',
  ...props
}) => {
  return (
    <ToastItem
      variant={variant}
      onClose={onClose}
      autoClose={autoClose}
      duration={duration}
      className={className}
      {...props}
    >
      <div className="flex items-start gap-3">
        {avatar && (
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={avatar} alt="" />
            </div>
          </div>
        )}
        <div className="flex-1">
          {title && <h3 className="font-bold">{title}</h3>}
          {description && <div className="text-sm">{description}</div>}
        </div>
      </div>
    </ToastItem>
  );
};

ToastWithAvatar.displayName = 'ToastWithAvatar';

// Toast positions
const ToastTopStart = ({ className = '', ...props }) => (
  <Toast position="top-start" className={className} {...props} />
);

const ToastTopCenter = ({ className = '', ...props }) => (
  <Toast position="top-center" className={className} {...props} />
);

const ToastTopEnd = ({ className = '', ...props }) => (
  <Toast position="top-end" className={className} {...props} />
);

const ToastMiddleStart = ({ className = '', ...props }) => (
  <Toast position="middle-start" className={className} {...props} />
);

const ToastMiddleCenter = ({ className = '', ...props }) => (
  <Toast position="middle-center" className={className} {...props} />
);

const ToastMiddleEnd = ({ className = '', ...props }) => (
  <Toast position="middle-end" className={className} {...props} />
);

const ToastBottomStart = ({ className = '', ...props }) => (
  <Toast position="bottom-start" className={className} {...props} />
);

const ToastBottomCenter = ({ className = '', ...props }) => (
  <Toast position="bottom-center" className={className} {...props} />
);

const ToastBottomEnd = ({ className = '', ...props }) => (
  <Toast position="bottom-end" className={className} {...props} />
);

// Toast avec variantes spécifiques
const ToastInfo = ({ className = '', ...props }) => (
  <ToastWithContent variant="info" className={className} {...props} />
);

const ToastSuccess = ({ className = '', ...props }) => (
  <ToastWithContent variant="success" className={className} {...props} />
);

const ToastWarning = ({ className = '', ...props }) => (
  <ToastWithContent variant="warning" className={className} {...props} />
);

const ToastError = ({ className = '', ...props }) => (
  <ToastWithContent variant="error" className={className} {...props} />
);

// PropTypes
Toast.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  position: PropTypes.oneOf([
    'top-start', 'top-center', 'top-end',
    'middle-start', 'middle-center', 'middle-end',
    'bottom-start', 'bottom-center', 'bottom-end'
  ]),
};

ToastItem.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  className: PropTypes.string,
  onClose: PropTypes.func,
  autoClose: PropTypes.bool,
  duration: PropTypes.number,
};

ToastWithContent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  onClose: PropTypes.func,
  autoClose: PropTypes.bool,
  duration: PropTypes.number,
  className: PropTypes.string,
};

ToastWithActions.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  primaryAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  secondaryAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  onClose: PropTypes.func,
  autoClose: PropTypes.bool,
  duration: PropTypes.number,
  className: PropTypes.string,
};

ToastManager.propTypes = {
  toasts: PropTypes.arrayOf(PropTypes.node),
  position: PropTypes.oneOf([
    'top-start', 'top-center', 'top-end',
    'middle-start', 'middle-center', 'middle-end',
    'bottom-start', 'bottom-center', 'bottom-end'
  ]),
  className: PropTypes.string,
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf([
    'top-start', 'top-center', 'top-end',
    'middle-start', 'middle-center', 'middle-end',
    'bottom-start', 'bottom-center', 'bottom-end'
  ]),
};

ToastWithProgress.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  progress: PropTypes.number,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  onClose: PropTypes.func,
  autoClose: PropTypes.bool,
  className: PropTypes.string,
};

ToastWithAvatar.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  avatar: PropTypes.string,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  onClose: PropTypes.func,
  autoClose: PropTypes.bool,
  duration: PropTypes.number,
  className: PropTypes.string,
};

// Attacher les noms d'affichage
ToastTopStart.displayName = 'ToastTopStart';
ToastTopCenter.displayName = 'ToastTopCenter';
ToastTopEnd.displayName = 'ToastTopEnd';
ToastMiddleStart.displayName = 'ToastMiddleStart';
ToastMiddleCenter.displayName = 'ToastMiddleCenter';
ToastMiddleEnd.displayName = 'ToastMiddleEnd';
ToastBottomStart.displayName = 'ToastBottomStart';
ToastBottomCenter.displayName = 'ToastBottomCenter';
ToastBottomEnd.displayName = 'ToastBottomEnd';
ToastInfo.displayName = 'ToastInfo';
ToastSuccess.displayName = 'ToastSuccess';
ToastWarning.displayName = 'ToastWarning';
ToastError.displayName = 'ToastError';

// Export des sous-composants
Toast.Item = ToastItem;
Toast.WithContent = ToastWithContent;
Toast.WithActions = ToastWithActions;
Toast.WithProgress = ToastWithProgress;
Toast.WithAvatar = ToastWithAvatar;
Toast.Manager = ToastManager;
Toast.Provider = ToastProvider;
Toast.TopStart = ToastTopStart;
Toast.TopCenter = ToastTopCenter;
Toast.TopEnd = ToastTopEnd;
Toast.MiddleStart = ToastMiddleStart;
Toast.MiddleCenter = ToastMiddleCenter;
Toast.MiddleEnd = ToastMiddleEnd;
Toast.BottomStart = ToastBottomStart;
Toast.BottomCenter = ToastBottomCenter;
Toast.BottomEnd = ToastBottomEnd;
Toast.Info = ToastInfo;
Toast.Success = ToastSuccess;
Toast.Warning = ToastWarning;
Toast.Error = ToastError;

export default Toast;
export { useToast }; 