import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Badge DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const Badge = forwardRef(({
  children,
  className = '',
  
  // Variantes DaisyUI
  variant = 'default', // default, neutral, primary, secondary, accent, ghost, info, success, warning, error
  size = 'md', // xs, sm, md, lg
  
  // États spéciaux
  outline = false,
  
  // Props HTML natives
  onClick,
  onMouseEnter,
  onMouseLeave,
  
  ...props
}, ref) => {
  // Classes de base
  const baseClasses = 'badge';
  
  // Classes de variantes
  const variantClasses = {
    default: '',
    neutral: 'badge-neutral',
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    ghost: 'badge-ghost',
    info: 'badge-info',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error'
  };
  
  // Classes de tailles
  const sizeClasses = {
    xs: 'badge-xs',
    sm: 'badge-sm',
    md: 'badge-md',
    lg: 'badge-lg'
  };
  
  // Classes d'état
  const stateClasses = {
    outline: outline ? 'badge-outline' : '',
    clickable: onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
  };
  
  // Assemblage final des classes
  const badgeClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    stateClasses.outline,
    stateClasses.clickable,
    className
  ].filter(Boolean).join(' ');

  return (
    <span
      ref={ref}
      className={badgeClasses}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

Badge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'default', 'neutral', 'primary', 'secondary', 'accent', 'ghost',
    'info', 'success', 'warning', 'error'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  outline: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

// Composants de commodité pour prototypage ultra-rapide
Badge.Neutral = (props) => <Badge variant="neutral" {...props} />;
Badge.Primary = (props) => <Badge variant="primary" {...props} />;
Badge.Secondary = (props) => <Badge variant="secondary" {...props} />;
Badge.Accent = (props) => <Badge variant="accent" {...props} />;
Badge.Ghost = (props) => <Badge variant="ghost" {...props} />;
Badge.Info = (props) => <Badge variant="info" {...props} />;
Badge.Success = (props) => <Badge variant="success" {...props} />;
Badge.Warning = (props) => <Badge variant="warning" {...props} />;
Badge.Error = (props) => <Badge variant="error" {...props} />;

// Composants par taille
Badge.XS = (props) => <Badge size="xs" {...props} />;
Badge.SM = (props) => <Badge size="sm" {...props} />;
Badge.LG = (props) => <Badge size="lg" {...props} />;

// Composants avec états spéciaux
Badge.Outline = (props) => <Badge outline {...props} />;

/**
 * Composant BadgeGroup pour grouper plusieurs badges
 */
const BadgeGroup = ({ 
  children, 
  className = '',
  gap = 'gap-2',
  direction = 'horizontal', // horizontal, vertical
  ...props 
}) => {
  const directionClasses = {
    horizontal: 'flex flex-row',
    vertical: 'flex flex-col'
  };

  return (
    <div 
      className={`${directionClasses[direction]} ${gap} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

BadgeGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  gap: PropTypes.string,
  direction: PropTypes.oneOf(['horizontal', 'vertical'])
};

/**
 * Composant BadgeWithIcon pour badge avec icône
 */
const BadgeWithIcon = ({ 
  icon, 
  children, 
  iconPosition = 'left', // left, right
  className = '',
  ...badgeProps 
}) => {
  const iconClasses = 'w-4 h-4';
  
  return (
    <Badge className={`gap-1 ${className}`} {...badgeProps}>
      {iconPosition === 'left' && icon && (
        <span className={iconClasses}>{icon}</span>
      )}
      {children}
      {iconPosition === 'right' && icon && (
        <span className={iconClasses}>{icon}</span>
      )}
    </Badge>
  );
};

BadgeWithIcon.propTypes = {
  icon: PropTypes.node,
  children: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string
};

/**
 * Composant BadgeWithClose pour badge avec bouton de fermeture
 */
const BadgeWithClose = ({ 
  children, 
  onClose,
  closeIcon = '×',
  className = '',
  ...badgeProps 
}) => {
  return (
    <Badge className={`gap-1 ${className}`} {...badgeProps}>
      {children}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="hover:opacity-70 transition-opacity"
        >
          {closeIcon}
        </button>
      )}
    </Badge>
  );
};

BadgeWithClose.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  closeIcon: PropTypes.node,
  className: PropTypes.string
};

/**
 * Composant BadgeNumber pour afficher des nombres
 */
const BadgeNumber = ({ 
  value, 
  max = 99,
  showZero = false,
  className = '',
  ...badgeProps 
}) => {
  const displayValue = value > max ? `${max}+` : value;
  
  if (!showZero && value === 0) return null;
  
  return (
    <Badge className={`text-xs ${className}`} {...badgeProps}>
      {displayValue}
    </Badge>
  );
};

BadgeNumber.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  showZero: PropTypes.bool,
  className: PropTypes.string
};

// Attacher les sous-composants au composant Badge
Badge.Group = BadgeGroup;
Badge.WithIcon = BadgeWithIcon;
Badge.WithClose = BadgeWithClose;
Badge.Number = BadgeNumber;

export default Badge; 