import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Textarea DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const Textarea = forwardRef(({
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
  rows = 4,
  cols,
  wrap,
  
  ...props
}, ref) => {
  // Classes de base
  const baseClasses = 'textarea w-full';
  
  // Classes de variantes
  const variantClasses = {
    default: '',
    bordered: 'textarea-bordered',
    ghost: 'textarea-ghost',
    primary: 'textarea-primary',
    secondary: 'textarea-secondary',
    accent: 'textarea-accent',
    info: 'textarea-info',
    success: 'textarea-success',
    warning: 'textarea-warning',
    error: 'textarea-error'
  };
  
  // Classes de tailles
  const sizeClasses = {
    xs: 'textarea-xs',
    sm: 'textarea-sm',
    md: 'textarea-md',
    lg: 'textarea-lg'
  };
  
  // Classes d'état
  const stateClasses = {
    disabled: disabled ? 'textarea-disabled' : '',
    loading: loading ? 'loading' : ''
  };
  
  // Assemblage final des classes
  const textareaClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    stateClasses.disabled,
    stateClasses.loading,
    className
  ].filter(Boolean).join(' ');

  return (
    <textarea
      ref={ref}
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
      className={textareaClasses}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      maxLength={maxLength}
      minLength={minLength}
      rows={rows}
      cols={cols}
      wrap={wrap}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
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
  rows: PropTypes.number,
  cols: PropTypes.number,
  wrap: PropTypes.oneOf(['hard', 'soft', 'off'])
};

// Composants de commodité pour prototypage ultra-rapide
Textarea.Bordered = (props) => <Textarea variant="bordered" {...props} />;
Textarea.Ghost = (props) => <Textarea variant="ghost" {...props} />;
Textarea.Primary = (props) => <Textarea variant="primary" {...props} />;
Textarea.Secondary = (props) => <Textarea variant="secondary" {...props} />;
Textarea.Accent = (props) => <Textarea variant="accent" {...props} />;
Textarea.Success = (props) => <Textarea variant="success" {...props} />;
Textarea.Warning = (props) => <Textarea variant="warning" {...props} />;
Textarea.Error = (props) => <Textarea variant="error" {...props} />;

// Composants par taille
Textarea.XS = (props) => <Textarea size="xs" {...props} />;
Textarea.SM = (props) => <Textarea size="sm" {...props} />;
Textarea.LG = (props) => <Textarea size="lg" {...props} />;

// Composants par taille de texte
Textarea.Small = (props) => <Textarea rows={2} {...props} />;
Textarea.Medium = (props) => <Textarea rows={4} {...props} />;
Textarea.Large = (props) => <Textarea rows={8} {...props} />;

export default Textarea; 