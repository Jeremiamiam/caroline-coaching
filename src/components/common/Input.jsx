import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Input DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et bordures disponibles
 */
const Input = forwardRef(({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  readOnly = false,
  required = false,
  name,
  id,
  className = '',
  
  // Variantes DaisyUI
  variant = 'default', // default, bordered, ghost, primary, secondary, accent, info, success, warning, error
  size = 'md', // xs, sm, md, lg
  
  // États spéciaux
  loading = false,
  
  // Props d'accessibilité
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  
  // Props HTML natives
  autoComplete,
  autoFocus,
  maxLength,
  minLength,
  pattern,
  step,
  min,
  max,
  
  ...props
}, ref) => {
  // Classes de base
  const baseClasses = 'input w-full max-w-xs';
  
  // Classes de variantes
  const variantClasses = {
    default: '',
    bordered: 'input-bordered',
    ghost: 'input-ghost',
    primary: 'input-primary',
    secondary: 'input-secondary',
    accent: 'input-accent',
    info: 'input-info',
    success: 'input-success',
    warning: 'input-warning',
    error: 'input-error'
  };
  
  // Classes de tailles
  const sizeClasses = {
    xs: 'input-xs',
    sm: 'input-sm',
    md: 'input-md',
    lg: 'input-lg'
  };
  
  // Classes d'état
  const stateClasses = {
    disabled: disabled ? 'input-disabled' : '',
    loading: loading ? 'loading' : ''
  };
  
  // Assemblage final des classes
  const inputClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    stateClasses.disabled,
    stateClasses.loading,
    className
  ].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled || loading}
      readOnly={readOnly}
      required={required}
      name={name}
      id={id}
      className={inputClasses}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
      step={step}
      min={min}
      max={max}
      {...props}
    />
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.oneOf([
    'text', 'email', 'password', 'number', 'tel', 'url', 'search', 
    'date', 'datetime-local', 'month', 'time', 'week', 'color'
  ]),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'default', 'bordered', 'ghost', 'primary', 'secondary', 'accent', 
    'info', 'success', 'warning', 'error'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  loading: PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-describedby': PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  pattern: PropTypes.string,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

// Composants de commodité pour prototypage ultra-rapide
Input.Bordered = (props) => <Input variant="bordered" {...props} />;
Input.Ghost = (props) => <Input variant="ghost" {...props} />;
Input.Primary = (props) => <Input variant="primary" {...props} />;
Input.Secondary = (props) => <Input variant="secondary" {...props} />;
Input.Accent = (props) => <Input variant="accent" {...props} />;
Input.Success = (props) => <Input variant="success" {...props} />;
Input.Warning = (props) => <Input variant="warning" {...props} />;
Input.Error = (props) => <Input variant="error" {...props} />;

// Composants par taille
Input.XS = (props) => <Input size="xs" {...props} />;
Input.SM = (props) => <Input size="sm" {...props} />;
Input.LG = (props) => <Input size="lg" {...props} />;

// Composants par type
Input.Email = (props) => <Input type="email" {...props} />;
Input.Password = (props) => <Input type="password" {...props} />;
Input.Number = (props) => <Input type="number" {...props} />;
Input.Search = (props) => <Input type="search" {...props} />;
Input.Date = (props) => <Input type="date" {...props} />;
Input.Time = (props) => <Input type="time" {...props} />;

export default Input; 