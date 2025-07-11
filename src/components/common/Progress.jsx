import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Progress DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const Progress = forwardRef(({
  value = 0,
  max = 100,
  className = '',
  
  // Variantes DaisyUI
  variant = 'default', // default, primary, secondary, accent, info, success, warning, error
  size = 'md', // xs, sm, md, lg
  
  // Props d'accessibilité
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  
  ...props
}, ref) => {
  // Classes de base
  const baseClasses = 'progress w-full';
  
  // Classes de variantes
  const variantClasses = {
    default: '',
    primary: 'progress-primary',
    secondary: 'progress-secondary',
    accent: 'progress-accent',
    info: 'progress-info',
    success: 'progress-success',
    warning: 'progress-warning',
    error: 'progress-error'
  };
  
  // Classes de tailles
  const sizeClasses = {
    xs: 'progress-xs',
    sm: 'progress-sm',
    md: 'progress-md',
    lg: 'progress-lg'
  };
  
  // Assemblage final des classes
  const progressClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <progress
      ref={ref}
      className={progressClasses}
      value={value}
      max={max}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      {...props}
    />
  );
});

Progress.displayName = 'Progress';

Progress.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'default', 'primary', 'secondary', 'accent', 
    'info', 'success', 'warning', 'error'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  'aria-label': PropTypes.string,
  'aria-describedby': PropTypes.string
};

// Composants de commodité pour prototypage ultra-rapide
Progress.Primary = (props) => <Progress variant="primary" {...props} />;
Progress.Secondary = (props) => <Progress variant="secondary" {...props} />;
Progress.Accent = (props) => <Progress variant="accent" {...props} />;
Progress.Info = (props) => <Progress variant="info" {...props} />;
Progress.Success = (props) => <Progress variant="success" {...props} />;
Progress.Warning = (props) => <Progress variant="warning" {...props} />;
Progress.Error = (props) => <Progress variant="error" {...props} />;

// Composants par taille
Progress.XS = (props) => <Progress size="xs" {...props} />;
Progress.SM = (props) => <Progress size="sm" {...props} />;
Progress.LG = (props) => <Progress size="lg" {...props} />;

/**
 * Composant ProgressWithLabel pour afficher la valeur et le label
 */
const ProgressWithLabel = ({ 
  label, 
  value = 0,
  max = 100,
  showValue = true,
  showPercentage = true,
  valueFormatter = (val, max) => `${val}/${max}`,
  labelClassName = '',
  valueClassName = '',
  className = '',
  ...progressProps 
}) => {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label et valeur */}
      <div className="flex justify-between items-center">
        {label && (
          <span className={`text-sm font-medium ${labelClassName}`}>
            {label}
          </span>
        )}
        {showValue && (
          <span className={`text-sm ${valueClassName}`}>
            {showPercentage ? `${percentage}%` : valueFormatter(value, max)}
          </span>
        )}
      </div>
      
      {/* Progress bar */}
      <Progress value={value} max={max} {...progressProps} />
    </div>
  );
};

ProgressWithLabel.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  max: PropTypes.number,
  showValue: PropTypes.bool,
  showPercentage: PropTypes.bool,
  valueFormatter: PropTypes.func,
  labelClassName: PropTypes.string,
  valueClassName: PropTypes.string,
  className: PropTypes.string
};

/**
 * Composant ProgressStacked pour progress bars multiples
 */
const ProgressStacked = ({ 
  segments = [], // [{value: 30, variant: 'primary', label: 'Completed'}, ...]
  max = 100,
  showLabels = true,
  className = '',
  ...progressProps 
}) => {
  const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0);
  
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Labels */}
      {showLabels && segments.length > 0 && (
        <div className="flex flex-wrap gap-4 text-sm">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className={`w-3 h-3 rounded-full ${
                  segment.variant === 'primary' ? 'bg-primary' :
                  segment.variant === 'secondary' ? 'bg-secondary' :
                  segment.variant === 'accent' ? 'bg-accent' :
                  segment.variant === 'success' ? 'bg-success' :
                  segment.variant === 'warning' ? 'bg-warning' :
                  segment.variant === 'error' ? 'bg-error' :
                  segment.variant === 'info' ? 'bg-info' :
                  'bg-base-content'
                }`}
              />
              <span>
                {segment.label} ({Math.round((segment.value / max) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      )}
      
      {/* Stacked progress */}
      <div className="relative">
        <Progress value={totalValue} max={max} {...progressProps} />
        {segments.map((segment, index) => {
          const prevValue = segments.slice(0, index).reduce((sum, s) => sum + s.value, 0);
          const width = (segment.value / max) * 100;
          const left = (prevValue / max) * 100;
          
          return (
            <div
              key={index}
              className={`absolute top-0 h-full ${
                segment.variant === 'primary' ? 'bg-primary' :
                segment.variant === 'secondary' ? 'bg-secondary' :
                segment.variant === 'accent' ? 'bg-accent' :
                segment.variant === 'success' ? 'bg-success' :
                segment.variant === 'warning' ? 'bg-warning' :
                segment.variant === 'error' ? 'bg-error' :
                segment.variant === 'info' ? 'bg-info' :
                'bg-base-content'
              }`}
              style={{
                left: `${left}%`,
                width: `${width}%`
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

ProgressStacked.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    variant: PropTypes.oneOf([
      'default', 'primary', 'secondary', 'accent', 
      'info', 'success', 'warning', 'error'
    ]),
    label: PropTypes.string
  })),
  max: PropTypes.number,
  showLabels: PropTypes.bool,
  className: PropTypes.string
};

// Attacher les sous-composants au composant Progress
Progress.WithLabel = ProgressWithLabel;
Progress.Stacked = ProgressStacked;

export default Progress; 