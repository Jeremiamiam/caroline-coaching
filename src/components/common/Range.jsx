import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Range DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const Range = forwardRef(({
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  name,
  id,
  className = '',
  min = 0,
  max = 100,
  step = 1,
  
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
  const baseClasses = 'range';
  
  // Classes de variantes
  const variantClasses = {
    default: '',
    primary: 'range-primary',
    secondary: 'range-secondary',
    accent: 'range-accent',
    info: 'range-info',
    success: 'range-success',
    warning: 'range-warning',
    error: 'range-error'
  };
  
  // Classes de tailles
  const sizeClasses = {
    xs: 'range-xs',
    sm: 'range-sm',
    md: 'range-md',
    lg: 'range-lg'
  };
  
  // Classes d'état
  const stateClasses = {
    disabled: disabled ? 'range-disabled' : ''
  };
  
  // Assemblage final des classes
  const rangeClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    stateClasses.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      type="range"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      required={required}
      name={name}
      id={id}
      className={rangeClasses}
      min={min}
      max={max}
      step={step}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      autoFocus={autoFocus}
      form={form}
      {...props}
    />
  );
});

Range.displayName = 'Range';

Range.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
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
Range.Primary = (props) => <Range variant="primary" {...props} />;
Range.Secondary = (props) => <Range variant="secondary" {...props} />;
Range.Accent = (props) => <Range variant="accent" {...props} />;
Range.Success = (props) => <Range variant="success" {...props} />;
Range.Warning = (props) => <Range variant="warning" {...props} />;
Range.Error = (props) => <Range variant="error" {...props} />;
Range.Info = (props) => <Range variant="info" {...props} />;

// Composants par taille
Range.XS = (props) => <Range size="xs" {...props} />;
Range.SM = (props) => <Range size="sm" {...props} />;
Range.LG = (props) => <Range size="lg" {...props} />;

/**
 * Composant RangeWithLabel pour afficher la valeur et les labels
 */
const RangeWithLabel = ({ 
  label, 
  showValue = true,
  showMinMax = true,
  valueFormatter = (val) => val,
  labelClassName = '',
  valueClassName = '',
  className = '',
  ...rangeProps 
}) => {
  const { min = 0, max = 100, value } = rangeProps;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label et valeur */}
      <div className="flex justify-between items-center">
        {label && (
          <label 
            htmlFor={rangeProps.id} 
            className={`text-sm font-medium ${labelClassName}`}
          >
            {label}
          </label>
        )}
        {showValue && (
          <span className={`text-sm ${valueClassName}`}>
            {valueFormatter(value)}
          </span>
        )}
      </div>
      
      {/* Range slider */}
      <Range {...rangeProps} />
      
      {/* Min/Max labels */}
      {showMinMax && (
        <div className="flex justify-between text-xs text-base-content opacity-60">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};

RangeWithLabel.propTypes = {
  label: PropTypes.string,
  showValue: PropTypes.bool,
  showMinMax: PropTypes.bool,
  valueFormatter: PropTypes.func,
  labelClassName: PropTypes.string,
  valueClassName: PropTypes.string,
  className: PropTypes.string
};

/**
 * Composant RangeWithSteps pour afficher des markers/steps
 */
const RangeWithSteps = ({ 
  steps = [], // [{value: 0, label: 'Min'}, {value: 50, label: 'Moyen'}, {value: 100, label: 'Max'}]
  className = '',
  ...rangeProps 
}) => {
  const { min = 0, max = 100 } = rangeProps;
  
  return (
    <div className={`space-y-2 ${className}`}>
      <Range {...rangeProps} />
      
      {/* Steps markers */}
      {steps.length > 0 && (
        <div className="relative">
          <div className="flex justify-between text-xs text-base-content opacity-60">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
                style={{
                  left: `${((step.value - min) / (max - min)) * 100}%`,
                  position: index === 0 || index === steps.length - 1 ? 'static' : 'absolute'
                }}
              >
                <div className="w-2 h-2 bg-base-content opacity-40 rounded-full mb-1"></div>
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

RangeWithSteps.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
  })),
  className: PropTypes.string
};

// Attacher les composants au Range
Range.WithLabel = RangeWithLabel;
Range.WithSteps = RangeWithSteps;

export default Range; 