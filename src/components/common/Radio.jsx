import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Radio DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const Radio = forwardRef(({
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
  const baseClasses = 'radio';
  
  // Classes de variantes
  const variantClasses = {
    default: '',
    primary: 'radio-primary',
    secondary: 'radio-secondary',
    accent: 'radio-accent',
    info: 'radio-info',
    success: 'radio-success',
    warning: 'radio-warning',
    error: 'radio-error'
  };
  
  // Classes de tailles
  const sizeClasses = {
    xs: 'radio-xs',
    sm: 'radio-sm',
    md: 'radio-md',
    lg: 'radio-lg'
  };
  
  // Classes d'état
  const stateClasses = {
    disabled: disabled ? 'radio-disabled' : ''
  };
  
  // Assemblage final des classes
  const radioClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    stateClasses.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      type="radio"
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      required={required}
      name={name}
      id={id}
      className={radioClasses}
      value={value}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      autoFocus={autoFocus}
      form={form}
      {...props}
    />
  );
});

Radio.displayName = 'Radio';

Radio.propTypes = {
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
Radio.Primary = (props) => <Radio variant="primary" {...props} />;
Radio.Secondary = (props) => <Radio variant="secondary" {...props} />;
Radio.Accent = (props) => <Radio variant="accent" {...props} />;
Radio.Success = (props) => <Radio variant="success" {...props} />;
Radio.Warning = (props) => <Radio variant="warning" {...props} />;
Radio.Error = (props) => <Radio variant="error" {...props} />;
Radio.Info = (props) => <Radio variant="info" {...props} />;

// Composants par taille
Radio.XS = (props) => <Radio size="xs" {...props} />;
Radio.SM = (props) => <Radio size="sm" {...props} />;
Radio.LG = (props) => <Radio size="lg" {...props} />;

/**
 * Composant RadioGroup pour gérer un groupe de radios
 */
const RadioGroup = ({ 
  children, 
  name, 
  value, 
  onChange, 
  className = '',
  direction = 'vertical', // vertical, horizontal
  ...props 
}) => {
  const groupClasses = direction === 'horizontal' 
    ? 'flex flex-row gap-4' 
    : 'flex flex-col gap-2';

  return (
    <div className={`${groupClasses} ${className}`} {...props}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            name: name,
            checked: child.props.value === value,
            onChange: (e) => onChange && onChange(e.target.value, e),
            key: child.key || index
          });
        }
        return child;
      })}
    </div>
  );
};

RadioGroup.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['vertical', 'horizontal'])
};

// Attacher RadioGroup au composant Radio
Radio.Group = RadioGroup;

export default Radio; 