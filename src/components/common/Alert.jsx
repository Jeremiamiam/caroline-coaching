import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Alert DaisyUI
 * https://daisyui.com/components/alert/
 */
const Alert = forwardRef(({
  children,
  variant = 'info',
  className = '',
  dismissible = false,
  onDismiss,
  icon,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const classes = [
    'alert',
    `alert-${variant}`,
    className
  ].filter(Boolean).join(' ');

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
    <div ref={ref} className={classes} role="alert" {...props}>
      {icon !== false && (icon || defaultIcons[variant])}
      <div className="flex-1">
        {children}
      </div>
      {dismissible && (
        <button
          type="button"
          className="btn btn-sm btn-ghost btn-square"
          onClick={handleDismiss}
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
});

Alert.displayName = 'Alert';

// Alert Template avec titre et description
const AlertTemplate = ({
  title,
  description,
  variant = 'info',
  icon,
  actions,
  dismissible = false,
  onDismiss,
  className = '',
  ...props
}) => {
  return (
    <Alert
      variant={variant}
      icon={icon}
      dismissible={dismissible}
      onDismiss={onDismiss}
      className={className}
      {...props}
    >
      <div>
        {title && <h3 className="font-bold">{title}</h3>}
        {description && <div className="text-sm">{description}</div>}
        {actions && (
          <div className="flex gap-2 mt-2">
            {actions}
          </div>
        )}
      </div>
    </Alert>
  );
};

AlertTemplate.displayName = 'AlertTemplate';

// Alert avec actions
const AlertWithActions = ({
  title,
  description,
  message,
  variant = 'info',
  actions = [],
  primaryAction,
  secondaryAction,
  onDismiss,
  className = '',
  ...props
}) => {
  // Support des deux API : actions array ou primaryAction/secondaryAction
  const actionButtons = actions.length > 0 
    ? actions.map((action, index) => (
        <button
          key={index}
          className={`btn btn-sm ${action.variant === 'ghost' ? 'btn-ghost' : `btn-${action.variant || variant}`}`}
          onClick={action.onClick}
        >
          {action.label}
        </button>
      ))
    : [
        primaryAction && (
          <button
            key="primary"
            className={`btn btn-sm btn-${variant}`}
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
          </button>
        ),
        secondaryAction && (
          <button
            key="secondary"
            className="btn btn-sm btn-ghost"
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.label}
          </button>
        )
      ].filter(Boolean);

  return (
    <AlertTemplate
      title={title}
      description={description || message}
      variant={variant}
      dismissible={!!onDismiss}
      onDismiss={onDismiss}
      actions={actionButtons}
      className={className}
      {...props}
    />
  );
};

AlertWithActions.displayName = 'AlertWithActions';

// Alerts avec variantes spécifiques
const AlertInfo = forwardRef(({ className = '', ...props }, ref) => (
  <Alert ref={ref} variant="info" className={className} {...props} />
));

const AlertSuccess = forwardRef(({ className = '', ...props }, ref) => (
  <Alert ref={ref} variant="success" className={className} {...props} />
));

const AlertWarning = forwardRef(({ className = '', ...props }, ref) => (
  <Alert ref={ref} variant="warning" className={className} {...props} />
));

const AlertError = forwardRef(({ className = '', ...props }, ref) => (
  <Alert ref={ref} variant="error" className={className} {...props} />
));

// Alert avec liste
const AlertWithList = ({
  title,
  items = [],
  variant = 'info',
  icon,
  className = '',
  ...props
}) => {
  return (
    <Alert
      variant={variant}
      icon={icon}
      className={className}
      {...props}
    >
      <div>
        {title && <h3 className="font-bold mb-2">{title}</h3>}
        <ul className="list-disc list-inside space-y-1">
          {items.map((item, index) => (
            <li key={index} className="text-sm">{item}</li>
          ))}
        </ul>
      </div>
    </Alert>
  );
};

AlertWithList.displayName = 'AlertWithList';

// Alert avec progress
const AlertWithProgress = ({
  title,
  description,
  progress = 0,
  variant = 'info',
  icon,
  className = '',
  ...props
}) => {
  return (
    <Alert
      variant={variant}
      icon={icon}
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
    </Alert>
  );
};

AlertWithProgress.displayName = 'AlertWithProgress';

// Alert avec icône personnalisée
const AlertWithCustomIcon = ({
  title,
  description,
  icon,
  variant = 'info',
  className = '',
  ...props
}) => {
  return (
    <Alert
      variant={variant}
      icon={icon}
      className={className}
      {...props}
    >
      <div>
        {title && <h3 className="font-bold">{title}</h3>}
        {description && <div className="text-sm">{description}</div>}
      </div>
    </Alert>
  );
};

AlertWithCustomIcon.displayName = 'AlertWithCustomIcon';

// Alert compact
const AlertCompact = forwardRef(({
  children,
  variant = 'info',
  className = '',
  ...props
}, ref) => {
  const classes = [
    'alert',
    `alert-${variant}`,
    'py-2',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} role="alert" {...props}>
      <div className="text-sm">
        {children}
      </div>
    </div>
  );
});

AlertCompact.displayName = 'AlertCompact';

// Alert avec badge
const AlertWithBadge = ({
  title,
  description,
  badge,
  variant = 'info',
  icon,
  className = '',
  ...props
}) => {
  return (
    <Alert
      variant={variant}
      icon={icon}
      className={className}
      {...props}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {title && <h3 className="font-bold">{title}</h3>}
          {badge && (
            <span className={`badge badge-sm ${badge.variant || 'badge-neutral'}`}>
              {badge.text}
            </span>
          )}
        </div>
        {description && <div className="text-sm mt-1">{description}</div>}
      </div>
    </Alert>
  );
};

AlertWithBadge.displayName = 'AlertWithBadge';

// PropTypes
Alert.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  className: PropTypes.string,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
};

AlertTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  actions: PropTypes.node,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  className: PropTypes.string,
};

AlertWithActions.propTypes = {
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
  onDismiss: PropTypes.func,
  className: PropTypes.string,
};

AlertWithList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  className: PropTypes.string,
};

AlertWithProgress.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  progress: PropTypes.number,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  className: PropTypes.string,
};

AlertWithCustomIcon.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  className: PropTypes.string,
};

AlertCompact.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  className: PropTypes.string,
};

AlertWithBadge.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  badge: PropTypes.shape({
    text: PropTypes.string.isRequired,
    variant: PropTypes.string,
  }),
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  className: PropTypes.string,
};

// Attacher les noms d'affichage
AlertInfo.displayName = 'AlertInfo';
AlertSuccess.displayName = 'AlertSuccess';
AlertWarning.displayName = 'AlertWarning';
AlertError.displayName = 'AlertError';

// Export des sous-composants
Alert.Template = AlertTemplate;
Alert.WithActions = AlertWithActions;
Alert.WithList = AlertWithList;
Alert.WithProgress = AlertWithProgress;
Alert.WithCustomIcon = AlertWithCustomIcon;
Alert.WithBadge = AlertWithBadge;
Alert.Compact = AlertCompact;
Alert.Info = AlertInfo;
Alert.Success = AlertSuccess;
Alert.Warning = AlertWarning;
Alert.Error = AlertError;

export default Alert; 