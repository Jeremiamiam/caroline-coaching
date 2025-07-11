import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Avatar DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const Avatar = forwardRef(({
  src,
  alt = '',
  size = 'md', // xs, sm, md, lg, xl
  shape = 'rounded', // rounded, square, circle
  placeholder,
  fallback,
  ring = false,
  ringColor = 'ring-primary',
  ringOffset = false,
  online = null, // null, true, false
  className = '',
  onError,
  onClick,
  ...props
}, ref) => {
  const [imageError, setImageError] = useState(false);
  
  // Classes de base
  const baseClasses = 'avatar';
  
  // Classes de tailles
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };
  
  // Classes de formes
  const shapeClasses = {
    rounded: 'rounded',
    square: 'rounded-none',
    circle: 'rounded-full'
  };
  
  // Classes d'état
  const stateClasses = {
    ring: ring ? `ring ${ringColor}` : '',
    ringOffset: ringOffset ? 'ring-offset-base-100 ring-offset-2' : '',
    online: online === true ? 'online' : online === false ? 'offline' : '',
    clickable: onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
  };
  
  // Assemblage final des classes pour le conteneur
  const avatarClasses = [
    baseClasses,
    stateClasses.online,
    stateClasses.clickable,
    className
  ].filter(Boolean).join(' ');
  
  // Classes pour l'image/placeholder
  const imageClasses = [
    sizeClasses[size],
    shapeClasses[shape],
    stateClasses.ring,
    stateClasses.ringOffset
  ].filter(Boolean).join(' ');

  const handleImageError = (e) => {
    setImageError(true);
    onError && onError(e);
  };

  const renderFallback = () => {
    if (fallback) return fallback;
    
    if (alt) {
      // Générer initiales à partir du nom
      const initials = alt
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      return initials;
    }
    
    return '?';
  };

  const renderContent = () => {
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt={alt}
          className={imageClasses}
          onError={handleImageError}
        />
      );
    }
    
    if (placeholder) {
      return placeholder;
    }
    
    return (
      <div className={`${imageClasses} bg-neutral text-neutral-content flex items-center justify-center text-sm font-medium`}>
        {renderFallback()}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={avatarClasses}
      onClick={onClick}
      {...props}
    >
      <div className={imageClasses}>
        {renderContent()}
      </div>
    </div>
  );
});

Avatar.displayName = 'Avatar';

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  shape: PropTypes.oneOf(['rounded', 'square', 'circle']),
  placeholder: PropTypes.node,
  fallback: PropTypes.node,
  ring: PropTypes.bool,
  ringColor: PropTypes.string,
  ringOffset: PropTypes.bool,
  online: PropTypes.bool,
  className: PropTypes.string,
  onError: PropTypes.func,
  onClick: PropTypes.func
};

// Composants de commodité pour prototypage ultra-rapide
Avatar.Circle = (props) => <Avatar shape="circle" {...props} />;
Avatar.Square = (props) => <Avatar shape="square" {...props} />;
Avatar.Rounded = (props) => <Avatar shape="rounded" {...props} />;

// Composants par taille
Avatar.XS = (props) => <Avatar size="xs" {...props} />;
Avatar.SM = (props) => <Avatar size="sm" {...props} />;
Avatar.LG = (props) => <Avatar size="lg" {...props} />;
Avatar.XL = (props) => <Avatar size="xl" {...props} />;

// Composants avec états spéciaux
Avatar.Ring = (props) => <Avatar ring {...props} />;
Avatar.Online = (props) => <Avatar online {...props} />;
Avatar.Offline = (props) => <Avatar online={false} {...props} />;

/**
 * Composant AvatarGroup pour grouper plusieurs avatars
 */
const AvatarGroup = ({ 
  children, 
  className = '',
  size = 'md',
  shape = 'rounded',
  max = null,
  moreText = '+{count}',
  ...props 
}) => {
  const childrenArray = React.Children.toArray(children);
  const displayChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = max ? childrenArray.length - max : 0;

  return (
    <div className={`avatar-group -space-x-4 ${className}`} {...props}>
      {displayChildren.map((child, index) => 
        React.cloneElement(child, {
          key: index,
          size,
          shape,
          ring: true,
          ringColor: 'ring-base-100'
        })
      )}
      {remainingCount > 0 && (
        <Avatar
          size={size}
          shape={shape}
          ring
          ringColor="ring-base-100"
          fallback={moreText.replace('{count}', remainingCount)}
        />
      )}
    </div>
  );
};

AvatarGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  shape: PropTypes.oneOf(['rounded', 'square', 'circle']),
  max: PropTypes.number,
  moreText: PropTypes.string
};

/**
 * Composant AvatarWithBadge pour avatar avec badge
 */
const AvatarWithBadge = ({ 
  badge, 
  badgePosition = 'bottom-right', // top-left, top-right, bottom-left, bottom-right
  className = '',
  ...avatarProps 
}) => {
  const badgePositionClasses = {
    'top-left': 'absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2',
    'top-right': 'absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2'
  };

  return (
    <div className={`relative ${className}`}>
      <Avatar {...avatarProps} />
      {badge && (
        <div className={badgePositionClasses[badgePosition]}>
          {badge}
        </div>
      )}
    </div>
  );
};

AvatarWithBadge.propTypes = {
  badge: PropTypes.node,
  badgePosition: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  className: PropTypes.string
};

/**
 * Composant AvatarWithName pour avatar avec nom
 */
const AvatarWithName = ({ 
  name, 
  subtitle,
  namePosition = 'right', // left, right, bottom
  className = '',
  nameClassName = '',
  subtitleClassName = '',
  ...avatarProps 
}) => {
  const renderNameBlock = () => (
    <div className="flex flex-col">
      <span className={`font-medium ${nameClassName}`}>{name}</span>
      {subtitle && (
        <span className={`text-sm opacity-70 ${subtitleClassName}`}>
          {subtitle}
        </span>
      )}
    </div>
  );

  const layoutClasses = {
    left: 'flex flex-row-reverse items-center gap-3',
    right: 'flex flex-row items-center gap-3',
    bottom: 'flex flex-col items-center gap-2'
  };

  return (
    <div className={`${layoutClasses[namePosition]} ${className}`}>
      <Avatar {...avatarProps} />
      {name && renderNameBlock()}
    </div>
  );
};

AvatarWithName.propTypes = {
  name: PropTypes.string,
  subtitle: PropTypes.string,
  namePosition: PropTypes.oneOf(['left', 'right', 'bottom']),
  className: PropTypes.string,
  nameClassName: PropTypes.string,
  subtitleClassName: PropTypes.string
};

// Attacher les sous-composants au composant Avatar
Avatar.Group = AvatarGroup;
Avatar.WithBadge = AvatarWithBadge;
Avatar.WithName = AvatarWithName;

export default Avatar; 