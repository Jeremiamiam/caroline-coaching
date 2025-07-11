import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Rating DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const Rating = forwardRef(({
  value = 0,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  name,
  id,
  className = '',
  max = 5,
  half = false,
  readOnly = false,
  
  // Variantes DaisyUI
  variant = 'default', // default, primary, secondary, accent, info, success, warning, error
  size = 'md', // xs, sm, md, lg
  
  // Props d'accessibilité
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  
  ...props
}, ref) => {
  const [hoverValue, setHoverValue] = useState(0);
  
  // Classes de base
  const baseClasses = 'rating';
  
  // Classes de variantes
  const variantClasses = {
    default: '',
    primary: 'rating-primary',
    secondary: 'rating-secondary',
    accent: 'rating-accent',
    info: 'rating-info',
    success: 'rating-success',
    warning: 'rating-warning',
    error: 'rating-error'
  };
  
  // Classes de tailles
  const sizeClasses = {
    xs: 'rating-xs',
    sm: 'rating-sm',
    md: 'rating-md',
    lg: 'rating-lg'
  };
  
  // Classes d'état
  const stateClasses = {
    disabled: disabled ? 'rating-disabled' : ''
  };
  
  // Assemblage final des classes
  const ratingClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    stateClasses.disabled,
    className
  ].filter(Boolean).join(' ');

  const handleStarClick = (starValue) => {
    if (disabled || readOnly) return;
    onChange && onChange(starValue);
  };

  const handleMouseEnter = (starValue) => {
    if (disabled || readOnly) return;
    setHoverValue(starValue);
  };

  const handleMouseLeave = () => {
    if (disabled || readOnly) return;
    setHoverValue(0);
  };

  const getStarValue = (index) => {
    if (half) {
      return index * 0.5;
    }
    return index;
  };

  const isStarActive = (starValue) => {
    const currentValue = hoverValue || value;
    return currentValue >= starValue;
  };

  const renderStars = () => {
    const stars = [];
    const totalStars = half ? max * 2 : max;
    
    for (let i = 1; i <= totalStars; i++) {
      const starValue = getStarValue(i);
      const isActive = isStarActive(starValue);
      
      if (half && i % 2 === 1) {
        // Étoile moitié gauche
        stars.push(
          <input
            key={`half-${i}`}
            type="radio"
            name={name}
            className="mask mask-star-2 mask-half-1"
            checked={value === starValue}
            onChange={() => handleStarClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            disabled={disabled || readOnly}
            {...props}
          />
        );
      } else {
        // Étoile complète ou moitié droite
        stars.push(
          <input
            key={i}
            type="radio"
            name={name}
            className={half ? "mask mask-star-2 mask-half-2" : "mask mask-star-2"}
            checked={value === starValue}
            onChange={() => handleStarClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            disabled={disabled || readOnly}
            {...props}
          />
        );
      }
    }
    
    return stars;
  };

  return (
    <div
      ref={ref}
      className={ratingClasses}
      onMouseLeave={handleMouseLeave}
      onBlur={onBlur}
      onFocus={onFocus}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      role="radiogroup"
      aria-required={required}
      id={id}
    >
      {/* Étoile vide pour reset */}
      <input
        type="radio"
        name={name}
        className="rating-hidden"
        checked={value === 0}
        onChange={() => handleStarClick(0)}
      />
      
      {renderStars()}
    </div>
  );
});

Rating.displayName = 'Rating';

Rating.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  max: PropTypes.number,
  half: PropTypes.bool,
  readOnly: PropTypes.bool,
  variant: PropTypes.oneOf([
    'default', 'primary', 'secondary', 'accent', 
    'info', 'success', 'warning', 'error'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  'aria-label': PropTypes.string,
  'aria-describedby': PropTypes.string
};

// Composants de commodité pour prototypage ultra-rapide
Rating.Primary = (props) => <Rating variant="primary" {...props} />;
Rating.Secondary = (props) => <Rating variant="secondary" {...props} />;
Rating.Accent = (props) => <Rating variant="accent" {...props} />;
Rating.Success = (props) => <Rating variant="success" {...props} />;
Rating.Warning = (props) => <Rating variant="warning" {...props} />;
Rating.Error = (props) => <Rating variant="error" {...props} />;
Rating.Info = (props) => <Rating variant="info" {...props} />;

// Composants par taille
Rating.XS = (props) => <Rating size="xs" {...props} />;
Rating.SM = (props) => <Rating size="sm" {...props} />;
Rating.LG = (props) => <Rating size="lg" {...props} />;

// Composants spéciaux
Rating.Half = (props) => <Rating half {...props} />;
Rating.ReadOnly = (props) => <Rating readOnly {...props} />;

/**
 * Composant RatingWithLabel pour afficher la valeur et le label
 */
const RatingWithLabel = ({ 
  label, 
  showValue = true,
  valueFormatter = (val, max) => `${val}/${max}`,
  labelClassName = '',
  valueClassName = '',
  className = '',
  ...ratingProps 
}) => {
  const { value = 0, max = 5 } = ratingProps;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label et valeur */}
      <div className="flex justify-between items-center">
        {label && (
          <label 
            htmlFor={ratingProps.id} 
            className={`text-sm font-medium ${labelClassName}`}
          >
            {label}
          </label>
        )}
        {showValue && (
          <span className={`text-sm ${valueClassName}`}>
            {valueFormatter(value, max)}
          </span>
        )}
      </div>
      
      {/* Rating */}
      <Rating {...ratingProps} />
    </div>
  );
};

RatingWithLabel.propTypes = {
  label: PropTypes.string,
  showValue: PropTypes.bool,
  valueFormatter: PropTypes.func,
  labelClassName: PropTypes.string,
  valueClassName: PropTypes.string,
  className: PropTypes.string
};

// Attacher RatingWithLabel au composant Rating
Rating.WithLabel = RatingWithLabel;

export default Rating; 