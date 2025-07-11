import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Card DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const Card = forwardRef(({
  children,
  className = '',
  
  // Variantes DaisyUI
  variant = 'default', // default, bordered, compact, side, glass, image-full
  size = 'md', // xs, sm, md, lg, full
  
  // États spéciaux
  shadow = false,
  
  // Props HTML natives
  onClick,
  onMouseEnter,
  onMouseLeave,
  
  ...props
}, ref) => {
  // Classes de base
  const baseClasses = 'card bg-base-100';
  
  // Classes de variantes
  const variantClasses = {
    default: '',
    bordered: 'card-bordered',
    compact: 'card-compact',
    side: 'card-side',
    glass: 'glass',
    'image-full': 'image-full'
  };
  
  // Classes de tailles
  const sizeClasses = {
    xs: 'w-32',
    sm: 'w-48',
    md: 'w-96',
    lg: 'w-full max-w-lg',
    full: 'w-full'
  };
  
  // Classes d'état
  const stateClasses = {
    shadow: shadow ? 'shadow-xl' : '',
    clickable: onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''
  };
  
  // Assemblage final des classes
  const cardClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    stateClasses.shadow,
    stateClasses.clickable,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={cardClasses}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'default', 'bordered', 'compact', 'side', 'glass', 'image-full'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'full']),
  shadow: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

// Composants de commodité pour prototypage ultra-rapide
Card.Bordered = (props) => <Card variant="bordered" {...props} />;
Card.Compact = (props) => <Card variant="compact" {...props} />;
Card.Side = (props) => <Card variant="side" {...props} />;
Card.Glass = (props) => <Card variant="glass" {...props} />;
Card.ImageFull = (props) => <Card variant="image-full" {...props} />;

// Composants par taille
Card.XS = (props) => <Card size="xs" {...props} />;
Card.SM = (props) => <Card size="sm" {...props} />;
Card.LG = (props) => <Card size="lg" {...props} />;
Card.Full = (props) => <Card size="full" {...props} />;

// Composants avec effets
Card.Shadow = (props) => <Card shadow {...props} />;

/**
 * Composant CardBody pour le contenu principal
 */
const CardBody = ({ children, className = '', ...props }) => (
  <div className={`card-body ${className}`} {...props}>
    {children}
  </div>
);

CardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Composant CardTitle pour le titre
 */
const CardTitle = ({ children, className = '', ...props }) => (
  <h2 className={`card-title ${className}`} {...props}>
    {children}
  </h2>
);

CardTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Composant CardActions pour les boutons d'action
 */
const CardActions = ({ children, className = '', justify = 'end', ...props }) => {
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around'
  };

  return (
    <div 
      className={`card-actions ${justifyClasses[justify]} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

CardActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  justify: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around'])
};

/**
 * Composant CardImage pour l'image
 */
const CardImage = ({ src, alt, className = '', ...props }) => (
  <figure className={className}>
    <img src={src} alt={alt} {...props} />
  </figure>
);

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
};

/**
 * Composant CardTemplate pour créer des cartes rapidement
 */
const CardTemplate = ({ 
  title, 
  image, 
  imageAlt = '',
  content, 
  actions,
  variant = 'default',
  size = 'md',
  shadow = true,
  className = '',
  ...props 
}) => (
  <Card variant={variant} size={size} shadow={shadow} className={className} {...props}>
    {image && <CardImage src={image} alt={imageAlt} />}
    <CardBody>
      {title && <CardTitle>{title}</CardTitle>}
      {content && <div>{content}</div>}
      {actions && <CardActions>{actions}</CardActions>}
    </CardBody>
  </Card>
);

CardTemplate.propTypes = {
  title: PropTypes.node,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  content: PropTypes.node,
  actions: PropTypes.node,
  variant: PropTypes.oneOf([
    'default', 'bordered', 'compact', 'side', 'glass', 'image-full'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'full']),
  shadow: PropTypes.bool,
  className: PropTypes.string
};

// Attacher les sous-composants au composant Card
Card.Body = CardBody;
Card.Title = CardTitle;
Card.Actions = CardActions;
Card.Image = CardImage;
Card.Template = CardTemplate;

export default Card; 