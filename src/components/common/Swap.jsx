import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Swap DaisyUI
 * https://daisyui.com/components/swap/
 */
const Swap = forwardRef(({
  children,
  className = '',
  active = false,
  onToggle,
  // Extraire les props React pour éviter qu'elles fuient vers le DOM
  onContent,
  offContent,
  onIcon,
  offIcon,
  onText,
  offText,
  variant,
  size,
  ...props
}, ref) => {
  const [isActive, setIsActive] = useState(active);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggle?.(newState);
  };

  const classes = [
    'swap',
    isActive && 'swap-active',
    className
  ].filter(Boolean).join(' ');

  return (
    <label ref={ref} className={classes} {...props}>
      <input type="checkbox" checked={isActive} onChange={handleToggle} />
      {children}
    </label>
  );
});

Swap.displayName = 'Swap';

// Swap Template avec contenu personnalisé
const SwapTemplate = ({
  onContent,
  offContent,
  active = false,
  onToggle,
  variant = 'rotate',
  className = '',
  ...props
}) => {
  const classes = [
    'swap',
    `swap-${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Swap
      active={active}
      onToggle={onToggle}
      className={classes}
      {...props}
    >
      <div className="swap-on">{onContent}</div>
      <div className="swap-off">{offContent}</div>
    </Swap>
  );
};

SwapTemplate.displayName = 'SwapTemplate';

// Swap Icon
const SwapIcon = ({
  onIcon,
  offIcon,
  active = false,
  onToggle,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const classes = [
    'swap swap-rotate',
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <Swap
      active={active}
      onToggle={onToggle}
      className={classes}
      {...props}
    >
      <div className="swap-on">{onIcon}</div>
      <div className="swap-off">{offIcon}</div>
    </Swap>
  );
};

SwapIcon.displayName = 'SwapIcon';

// Swap Text
const SwapText = ({
  onText,
  offText,
  active = false,
  onToggle,
  className = '',
  ...props
}) => {
  return (
    <Swap
      active={active}
      onToggle={onToggle}
      className={`swap swap-flip ${className}`}
      {...props}
    >
      <div className="swap-on">{onText}</div>
      <div className="swap-off">{offText}</div>
    </Swap>
  );
};

SwapText.displayName = 'SwapText';

// Swap Button
const SwapButton = ({
  onContent,
  offContent,
  active = false,
  onToggle,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    size !== 'md' && `btn-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      onClick={() => onToggle?.(!active)}
      {...props}
    >
      <Swap
        active={active}
        onToggle={onToggle}
        className="swap swap-rotate"
      >
        <div className="swap-on">{onContent}</div>
        <div className="swap-off">{offContent}</div>
      </Swap>
    </button>
  );
};

SwapButton.displayName = 'SwapButton';

// Swap Toggle (pour les thèmes)
const SwapToggle = ({
  onIcon = '🌙',
  offIcon = '☀️',
  active = false,
  onToggle,
  className = '',
  ...props
}) => {
  return (
    <SwapIcon
      onIcon={onIcon}
      offIcon={offIcon}
      active={active}
      onToggle={onToggle}
      className={`swap-rotate ${className}`}
      {...props}
    />
  );
};

SwapToggle.displayName = 'SwapToggle';

// Swap Menu (hamburger)
const SwapMenu = ({
  active = false,
  onToggle,
  className = '',
  ...props
}) => {
  const hamburgerIcon = (
    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
      <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/>
    </svg>
  );

  const closeIcon = (
    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
      <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/>
    </svg>
  );

  return (
    <SwapIcon
      onIcon={closeIcon}
      offIcon={hamburgerIcon}
      active={active}
      onToggle={onToggle}
      className={`swap-rotate ${className}`}
      {...props}
    />
  );
};

SwapMenu.displayName = 'SwapMenu';

// Swap Heart (like button)
const SwapHeart = ({
  active = false,
  onToggle,
  className = '',
  ...props
}) => {
  const heartFilled = (
    <svg className="fill-current text-error" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
      <path d="M256 448l-30.164-27.211C118.718 322.442 48 258.61 48 179.095 48 114.221 97.918 64 162.4 64c36.399 0 70.717 16.742 93.6 43.947C278.882 80.742 313.199 64 349.6 64 414.082 64 464 114.221 464 179.095c0 79.516-70.719 143.348-177.836 241.694L256 448z"/>
    </svg>
  );

  const heartEmpty = (
    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
      <path d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-94.54 96.81 0 47.7 45.5 56.55 94.54 136.83L256 416l96.92-102.36c49-80.28 94.54-89.13 94.54-136.83C447.46 124.14 405.68 80 352.92 80z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
    </svg>
  );

  return (
    <SwapIcon
      onIcon={heartFilled}
      offIcon={heartEmpty}
      active={active}
      onToggle={onToggle}
      className={`swap-rotate ${className}`}
      {...props}
    />
  );
};

SwapHeart.displayName = 'SwapHeart';

// Swap avec animation flip
const SwapFlip = ({
  onContent,
  offContent,
  active = false,
  onToggle,
  className = '',
  ...props
}) => {
  return (
    <SwapTemplate
      onContent={onContent}
      offContent={offContent}
      active={active}
      onToggle={onToggle}
      variant="flip"
      className={className}
      {...props}
    />
  );
};

SwapFlip.displayName = 'SwapFlip';

// Swap avec animation rotate
const SwapRotate = ({
  onContent,
  offContent,
  active = false,
  onToggle,
  className = '',
  ...props
}) => {
  return (
    <SwapTemplate
      onContent={onContent}
      offContent={offContent}
      active={active}
      onToggle={onToggle}
      variant="rotate"
      className={className}
      {...props}
    />
  );
};

SwapRotate.displayName = 'SwapRotate';

// PropTypes
Swap.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  active: PropTypes.bool,
  onToggle: PropTypes.func,
};

SwapTemplate.propTypes = {
  onContent: PropTypes.node,
  offContent: PropTypes.node,
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  variant: PropTypes.oneOf(['rotate', 'flip']),
  className: PropTypes.string,
};

SwapIcon.propTypes = {
  onIcon: PropTypes.node,
  offIcon: PropTypes.node,
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

SwapText.propTypes = {
  onText: PropTypes.node,
  offText: PropTypes.node,
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

SwapButton.propTypes = {
  onContent: PropTypes.node,
  offContent: PropTypes.node,
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'ghost', 'link', 'info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

SwapToggle.propTypes = {
  onIcon: PropTypes.node,
  offIcon: PropTypes.node,
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

SwapMenu.propTypes = {
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

SwapHeart.propTypes = {
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

SwapFlip.propTypes = {
  onContent: PropTypes.node,
  offContent: PropTypes.node,
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

SwapRotate.propTypes = {
  onContent: PropTypes.node,
  offContent: PropTypes.node,
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

// Export des sous-composants
Swap.Template = SwapTemplate;
Swap.Icon = SwapIcon;
Swap.Text = SwapText;
Swap.Button = SwapButton;
Swap.Toggle = SwapToggle;
Swap.Menu = SwapMenu;
Swap.Heart = SwapHeart;
Swap.Flip = SwapFlip;
Swap.Rotate = SwapRotate;

export default Swap; 