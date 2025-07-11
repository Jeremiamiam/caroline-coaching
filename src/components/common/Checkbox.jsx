import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Checkbox DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const Checkbox = forwardRef(({
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
  
  // États spéciaux
  indeterminate = false,
  
  // Props d'accessibilité
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  
  // Props HTML natives
  autoFocus,
  form,
  
  ...props
}, ref) => {
  // Classes de base
  const baseClasses = 'checkbox';
  
  // Classes de variantes
  const variantClasses = {
    default: '',
    primary: 'checkbox-primary',
    secondary: 'checkbox-secondary',
    accent: 'checkbox-accent',
    info: 'checkbox-info',
    success: 'checkbox-success',
    warning: 'checkbox-warning',
    error: 'checkbox-error'
  };
  
  // Classes de tailles
  const sizeClasses = {
    xs: 'checkbox-xs',
    sm: 'checkbox-sm',
    md: 'checkbox-md',
    lg: 'checkbox-lg'
  };
  
  // Classes d'état
  const stateClasses = {
    disabled: disabled ? 'checkbox-disabled' : ''
  };
  
  // Assemblage final des classes
  const checkboxClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    stateClasses.disabled,
    className
  ].filter(Boolean).join(' ');

  // Gérer l'état indéterminé
  React.useEffect(() => {
    if (ref && ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate, ref]);

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
      className={checkboxClasses}
      value={value}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      autoFocus={autoFocus}
      form={form}
      {...props}
    />
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
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
  indeterminate: PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-describedby': PropTypes.string,
  autoFocus: PropTypes.bool,
  form: PropTypes.string
};

// Composants de commodité pour prototypage ultra-rapide
Checkbox.Primary = (props) => <Checkbox variant="primary" {...props} />;
Checkbox.Secondary = (props) => <Checkbox variant="secondary" {...props} />;
Checkbox.Accent = (props) => <Checkbox variant="accent" {...props} />;
Checkbox.Success = (props) => <Checkbox variant="success" {...props} />;
Checkbox.Warning = (props) => <Checkbox variant="warning" {...props} />;
Checkbox.Error = (props) => <Checkbox variant="error" {...props} />;
Checkbox.Info = (props) => <Checkbox variant="info" {...props} />;

// Composants par taille
Checkbox.XS = (props) => <Checkbox size="xs" {...props} />;
Checkbox.SM = (props) => <Checkbox size="sm" {...props} />;
Checkbox.LG = (props) => <Checkbox size="lg" {...props} />;

// Composants avec états spéciaux
Checkbox.Indeterminate = (props) => <Checkbox indeterminate {...props} />;

export default Checkbox; 