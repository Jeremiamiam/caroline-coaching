import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Toggle DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const Toggle = forwardRef(({
  checked,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  name,
  id,
  className = '',
  value,
  
  // Variantes DaisyUI
  variant = 'default', // default, primary, secondary, accent, info, success, warning, error
  size = 'md', // xs, sm, md, lg
  
  // Props d'accessibilité
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  
  // Props HTML natives
  autoFocus,
  form,
  
  ...props
}, ref) => {
  // Classes de base
  const baseClasses = 'toggle';
  
  // Classes de variantes
  const variantClasses = {
    default: '',
    primary: 'toggle-primary',
    secondary: 'toggle-secondary',
    accent: 'toggle-accent',
    info: 'toggle-info',
    success: 'toggle-success',
    warning: 'toggle-warning',
    error: 'toggle-error'
  };
  
  // Classes de tailles
  const sizeClasses = {
    xs: 'toggle-xs',
    sm: 'toggle-sm',
    md: 'toggle-md',
    lg: 'toggle-lg'
  };
  
  // Classes d'état
  const stateClasses = {
    disabled: disabled ? 'toggle-disabled' : ''
  };
  
  // Assemblage final des classes
  const toggleClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    stateClasses.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      required={required}
      name={name}
      id={id}
      className={toggleClasses}
      value={value}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      autoFocus={autoFocus}
      form={form}
      {...props}
    />
  );
});

Toggle.displayName = 'Toggle';

Toggle.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf([
    'default', 'primary', 'secondary', 'accent', 
    'info', 'success', 'warning', 'error'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  'aria-label': PropTypes.string,
  'aria-describedby': PropTypes.string,
  autoFocus: PropTypes.bool,
  form: PropTypes.string
};

// Composants de commodité pour prototypage ultra-rapide
Toggle.Primary = (props) => <Toggle variant="primary" {...props} />;
Toggle.Secondary = (props) => <Toggle variant="secondary" {...props} />;
Toggle.Accent = (props) => <Toggle variant="accent" {...props} />;
Toggle.Success = (props) => <Toggle variant="success" {...props} />;
Toggle.Warning = (props) => <Toggle variant="warning" {...props} />;
Toggle.Error = (props) => <Toggle variant="error" {...props} />;
Toggle.Info = (props) => <Toggle variant="info" {...props} />;

// Composants par taille
Toggle.XS = (props) => <Toggle size="xs" {...props} />;
Toggle.SM = (props) => <Toggle size="sm" {...props} />;
Toggle.LG = (props) => <Toggle size="lg" {...props} />;

/**
 * Composant ToggleWithLabel pour associer un label au toggle
 */
const ToggleWithLabel = ({ 
  label, 
  labelPosition = 'right', // left, right
  labelClassName = '',
  className = '',
  ...toggleProps 
}) => {
  const containerClasses = `flex items-center gap-2 ${
    labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row'
  } ${className}`;

  return (
    <div className={containerClasses}>
      <Toggle {...toggleProps} />
      <label 
        htmlFor={toggleProps.id} 
        className={`cursor-pointer ${labelClassName}`}
      >
        {label}
      </label>
    </div>
  );
};

ToggleWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  labelClassName: PropTypes.string,
  className: PropTypes.string
};

// Attacher ToggleWithLabel au composant Toggle
Toggle.WithLabel = ToggleWithLabel;

export default Toggle; 