import React from 'react';

/**
 * Composant Button réutilisable basé sur DaisyUI
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.variant - La variante de couleur (primary, secondary, accent, ghost, etc.)
 * @param {string} props.size - La taille du bouton (xs, sm, md, lg, xl)
 * @param {boolean} props.outline - Si true, utilise la variante outline
 * @param {boolean} props.disabled - Si true, désactive le bouton
 * @param {boolean} props.loading - Si true, affiche un spinner de chargement
 * @param {boolean} props.wide - Si true, bouton plus large
 * @param {boolean} props.block - Si true, bouton pleine largeur
 * @param {string} props.shape - La forme du bouton (square, circle)
 * @param {string} props.className - Classes CSS supplémentaires
 * @param {Function} props.onClick - Fonction appelée au clic
 * @param {React.ReactNode} props.children - Contenu du bouton
 * @param {string} props.type - Type du bouton (button, submit, reset)
 * @param {Object} props.icon - Icône à afficher (objet avec position et element)
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  outline = false,
  disabled = false,
  loading = false,
  wide = false,
  block = false,
  shape = '',
  className = '',
  onClick,
  children,
  type = 'button',
  icon = null,
  ...props
}) => {
  // Construction des classes CSS
  const baseClasses = 'btn';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    ghost: 'btn-ghost',
    link: 'btn-link',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    neutral: 'btn-neutral',
  };
  
  const sizeClasses = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
    xl: 'btn-xl',
  };
  
  const shapeClasses = {
    square: 'btn-square',
    circle: 'btn-circle',
  };
  
  // Assemblage des classes
  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || '',
    outline ? 'btn-outline' : '',
    wide ? 'btn-wide' : '',
    block ? 'btn-block' : '',
    shapeClasses[shape] || '',
    loading ? 'loading' : '',
    className
  ].filter(Boolean).join(' ');

  // Gestion du contenu avec icône
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          {children && <span className="ml-2">{children}</span>}
        </>
      );
    }

    if (icon) {
      const { position = 'left', element } = icon;
      return position === 'right' ? (
        <>
          {children}
          {element && <span className="ml-2">{element}</span>}
        </>
      ) : (
        <>
          {element && <span className="mr-2">{element}</span>}
          {children}
        </>
      );
    }

    return children;
  };

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

// Composants de commodité pré-configurés
Button.Primary = (props) => <Button variant="primary" {...props} />;
Button.Secondary = (props) => <Button variant="secondary" {...props} />;
Button.Accent = (props) => <Button variant="accent" {...props} />;
Button.Ghost = (props) => <Button variant="ghost" {...props} />;
Button.Link = (props) => <Button variant="link" {...props} />;
Button.Success = (props) => <Button variant="success" {...props} />;
Button.Warning = (props) => <Button variant="warning" {...props} />;
Button.Error = (props) => <Button variant="error" {...props} />;

export default Button; 