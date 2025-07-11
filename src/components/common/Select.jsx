import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Select DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const Select = forwardRef(({
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  name,
  id,
  className = '',
  children,
  options = [],
  placeholder = 'Sélectionner...',
  
  // Variantes DaisyUI
  variant = 'default', // default, bordered, ghost, primary, secondary, accent, info, success, warning, error
  size = 'md', // xs, sm, md, lg
  
  // États spéciaux
  loading = false,
  multiple = false,
  
  // Props d'accessibilité
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  
  // Props HTML natives
  autoFocus,
  form,
  
  ...props
}, ref) => {
  // Classes de base
  const baseClasses = 'select w-full max-w-xs';
  
  // Classes de variantes
  const variantClasses = {
    default: '',
    bordered: 'select-bordered',
    ghost: 'select-ghost',
    primary: 'select-primary',
    secondary: 'select-secondary',
    accent: 'select-accent',
    info: 'select-info',
    success: 'select-success',
    warning: 'select-warning',
    error: 'select-error'
  };
  
  // Classes de tailles
  const sizeClasses = {
    xs: 'select-xs',
    sm: 'select-sm',
    md: 'select-md',
    lg: 'select-lg'
  };
  
  // Classes d'état
  const stateClasses = {
    disabled: disabled ? 'select-disabled' : '',
    loading: loading ? 'loading' : ''
  };
  
  // Assemblage final des classes
  const selectClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    stateClasses.disabled,
    stateClasses.loading,
    className
  ].filter(Boolean).join(' ');

  // Génération des options depuis le prop options
  const renderOptions = () => {
    if (children) return children;
    
    return options.map((option, index) => {
      // Support pour les options simples (string/number) ou complexes (object)
      if (typeof option === 'string' || typeof option === 'number') {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      }
      
      // Option object avec {value, label, disabled}
      return (
        <option 
          key={option.value || index} 
          value={option.value} 
          disabled={option.disabled}
        >
          {option.label || option.value}
        </option>
      );
    });
  };

  return (
    <select
      ref={ref}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled || loading}
      required={required}
      name={name}
      id={id}
      className={selectClasses}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      autoFocus={autoFocus}
      form={form}
      multiple={multiple}
      {...props}
    >
      {!multiple && placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {renderOptions()}
    </select>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string, 
    PropTypes.number, 
    PropTypes.array
  ]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string,
        disabled: PropTypes.bool
      })
    ])
  ),
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf([
    'default', 'bordered', 'ghost', 'primary', 'secondary', 'accent', 
    'info', 'success', 'warning', 'error'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  loading: PropTypes.bool,
  multiple: PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-describedby': PropTypes.string,
  autoFocus: PropTypes.bool,
  form: PropTypes.string
};

// Composants de commodité pour prototypage ultra-rapide
Select.Bordered = (props) => <Select variant="bordered" {...props} />;
Select.Ghost = (props) => <Select variant="ghost" {...props} />;
Select.Primary = (props) => <Select variant="primary" {...props} />;
Select.Secondary = (props) => <Select variant="secondary" {...props} />;
Select.Accent = (props) => <Select variant="accent" {...props} />;
Select.Success = (props) => <Select variant="success" {...props} />;
Select.Warning = (props) => <Select variant="warning" {...props} />;
Select.Error = (props) => <Select variant="error" {...props} />;

// Composants par taille
Select.XS = (props) => <Select size="xs" {...props} />;
Select.SM = (props) => <Select size="sm" {...props} />;
Select.LG = (props) => <Select size="lg" {...props} />;

// Composants spéciaux
Select.Multiple = (props) => <Select multiple {...props} />;

export default Select; 