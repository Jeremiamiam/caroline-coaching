import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Indicator DaisyUI
 * https://daisyui.com/components/indicator/
 */
const Indicator = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'indicator',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Indicator.displayName = 'Indicator';

// Indicator Item - Badge/notification affiché sur l'élément
const IndicatorItem = forwardRef(({
  children,
  position = 'indicator-top-end',
  className = '',
  ...props
}, ref) => {
  const classes = [
    'indicator-item',
    position,
    className
  ].filter(Boolean).join(' ');

  return (
    <span ref={ref} className={classes} {...props}>
      {children}
    </span>
  );
});

IndicatorItem.displayName = 'IndicatorItem';

// Indicator Template avec personnalisation
const IndicatorTemplate = ({
  children,
  item,
  itemPosition = 'indicator-top-end',
  className = '',
  ...props
}) => {
  const classes = [
    'indicator',
    className
  ].filter(Boolean).join(' ');

  return (
    <Indicator className={classes} {...props}>
      {item && (
        <IndicatorItem position={itemPosition}>
          {item}
        </IndicatorItem>
      )}
      {children}
    </Indicator>
  );
};

IndicatorTemplate.displayName = 'IndicatorTemplate';

// Indicator avec badge simple
const IndicatorBadge = ({ 
  children,
  badgeText,
  badgeColor = 'badge-secondary',
  position = 'indicator-top-end',
  className = '',
  ...props 
}) => {
  const classes = [
    'indicator',
    className
  ].filter(Boolean).join(' ');

  const badgeClasses = [
    'badge',
    badgeColor,
    'indicator-item',
    position
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <span className={badgeClasses}>{badgeText}</span>
      {children}
    </div>
  );
};

IndicatorBadge.displayName = 'IndicatorBadge';

// Indicator avec badge de compteur
const IndicatorCount = ({ 
  children,
  count = 0,
  maxCount = 99,
  showZero = false,
  badgeColor = 'badge-secondary',
  position = 'indicator-top-end',
  className = '',
  ...props 
}) => {
  const classes = [
    'indicator',
    className
  ].filter(Boolean).join(' ');

  const badgeClasses = [
    'badge',
    badgeColor,
    'indicator-item',
    position
  ].filter(Boolean).join(' ');

  const displayCount = count > maxCount ? `${maxCount}+` : count;
  const shouldShow = count > 0 || showZero;

  return (
    <div className={classes} {...props}>
      {shouldShow && (
        <span className={badgeClasses}>{displayCount}</span>
      )}
      {children}
    </div>
  );
};

IndicatorCount.displayName = 'IndicatorCount';

// Indicator avec point de notification
const IndicatorDot = ({ 
  children,
  color = 'bg-secondary',
  size = 'w-3 h-3',
  position = 'indicator-top-end',
  className = '',
  ...props 
}) => {
  const classes = [
    'indicator',
    className
  ].filter(Boolean).join(' ');

  const dotClasses = [
    'indicator-item',
    position,
    'rounded-full',
    color,
    size
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <span className={dotClasses}></span>
      {children}
    </div>
  );
};

IndicatorDot.displayName = 'IndicatorDot';

// Indicator avec icône
const IndicatorIcon = ({ 
  children,
  icon,
  iconColor = 'text-secondary',
  backgroundColor = 'bg-base-100',
  position = 'indicator-top-end',
  className = '',
  ...props 
}) => {
  const classes = [
    'indicator',
    className
  ].filter(Boolean).join(' ');

  const iconClasses = [
    'indicator-item',
    position,
    'rounded-full',
    backgroundColor,
    iconColor,
    'w-6 h-6',
    'flex items-center justify-center',
    'text-xs',
    'border-2 border-white'
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <span className={iconClasses}>
        {icon}
      </span>
      {children}
    </div>
  );
};

IndicatorIcon.displayName = 'IndicatorIcon';

// Indicator avec avatar
const IndicatorAvatar = ({ 
  children,
  avatar,
  avatarSize = 'w-6 h-6',
  position = 'indicator-bottom-end',
  online = false,
  className = '',
  ...props 
}) => {
  const classes = [
    'indicator',
    className
  ].filter(Boolean).join(' ');

  const avatarClasses = [
    'indicator-item',
    position,
    'rounded-full',
    avatarSize
  ].filter(Boolean).join(' ');

  const statusClasses = [
    'indicator-item',
    position,
    'rounded-full',
    'w-3 h-3',
    online ? 'bg-success' : 'bg-error',
    'border-2 border-white'
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {avatar && (
        <div className={avatarClasses}>
          {typeof avatar === 'string' ? (
            <img src={avatar} alt="Avatar" className="rounded-full w-full h-full object-cover" />
          ) : (
            avatar
          )}
        </div>
      )}
      <span className={statusClasses}></span>
      {children}
    </div>
  );
};

IndicatorAvatar.displayName = 'IndicatorAvatar';

// Indicator avec bouton
const IndicatorButton = ({ 
  children,
  buttonText,
  buttonVariant = 'btn-xs',
  buttonColor = 'btn-secondary',
  onButtonClick,
  position = 'indicator-top-end',
  className = '',
  ...props 
}) => {
  const classes = [
    'indicator',
    className
  ].filter(Boolean).join(' ');

  const buttonClasses = [
    'btn',
    buttonVariant,
    buttonColor,
    'indicator-item',
    position
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <button className={buttonClasses} onClick={onButtonClick}>
        {buttonText}
      </button>
      {children}
    </div>
  );
};

IndicatorButton.displayName = 'IndicatorButton';

// Indicator avec positions multiples
const IndicatorMultiple = ({ 
  children,
  indicators = [],
  className = '',
  ...props 
}) => {
  const classes = [
    'indicator',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {indicators.map((indicator, index) => {
        const itemClasses = [
          'indicator-item',
          indicator.position || 'indicator-top-end',
          indicator.className
        ].filter(Boolean).join(' ');

        if (indicator.type === 'badge') {
          return (
            <span 
              key={index} 
              className={`badge ${indicator.color || 'badge-secondary'} ${itemClasses}`}
            >
              {indicator.content}
            </span>
          );
        } else if (indicator.type === 'dot') {
          return (
            <span 
              key={index} 
              className={`rounded-full ${indicator.color || 'bg-secondary'} w-3 h-3 ${itemClasses}`}
            ></span>
          );
        } else if (indicator.type === 'icon') {
          return (
            <span 
              key={index} 
              className={`rounded-full bg-base-100 w-6 h-6 flex items-center justify-center text-xs border-2 border-white ${itemClasses}`}
            >
              {indicator.content}
            </span>
          );
        } else {
          return (
            <span key={index} className={itemClasses}>
              {indicator.content}
            </span>
          );
        }
      })}
      {children}
    </div>
  );
};

IndicatorMultiple.displayName = 'IndicatorMultiple';

// Indicator avec toast-like
const IndicatorToast = ({ 
  children,
  message,
  type = 'info',
  autoHide = true,
  duration = 3000,
  onClose,
  position = 'indicator-top-end',
  className = '',
  ...props 
}) => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (autoHide && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, onClose, visible]);

  const classes = [
    'indicator',
    className
  ].filter(Boolean).join(' ');

  const toastClasses = [
    'indicator-item',
    position,
    'alert',
    `alert-${type}`,
    'text-xs',
    'max-w-xs',
    visible ? 'opacity-100' : 'opacity-0',
    'transition-opacity duration-300'
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {visible && (
        <div className={toastClasses}>
          <span>{message}</span>
          {onClose && (
            <button 
              className="btn btn-xs btn-ghost"
              onClick={() => {
                setVisible(false);
                onClose();
              }}
            >
              ✕
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

IndicatorToast.displayName = 'IndicatorToast';

// Indicator avec notification de nouveauté
const IndicatorNew = ({ 
  children,
  text = 'NEW',
  color = 'badge-accent',
  position = 'indicator-top-end',
  className = '',
  ...props 
}) => {
  const classes = [
    'indicator',
    className
  ].filter(Boolean).join(' ');

  const badgeClasses = [
    'badge',
    color,
    'indicator-item',
    position,
    'animate-pulse'
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <span className={badgeClasses}>{text}</span>
      {children}
    </div>
  );
};

IndicatorNew.displayName = 'IndicatorNew';

// PropTypes
Indicator.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

IndicatorItem.propTypes = {
  children: PropTypes.node,
  position: PropTypes.oneOf([
    'indicator-top-start',
    'indicator-top-center', 
    'indicator-top-end',
    'indicator-middle-start',
    'indicator-middle-center',
    'indicator-middle-end',
    'indicator-bottom-start',
    'indicator-bottom-center',
    'indicator-bottom-end'
  ]),
  className: PropTypes.string,
};

IndicatorTemplate.propTypes = {
  children: PropTypes.node,
  item: PropTypes.node,
  itemPosition: PropTypes.string,
  className: PropTypes.string,
};

IndicatorBadge.propTypes = {
  children: PropTypes.node,
  badgeText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  badgeColor: PropTypes.string,
  position: PropTypes.string,
  className: PropTypes.string,
};

IndicatorCount.propTypes = {
  children: PropTypes.node,
  count: PropTypes.number,
  maxCount: PropTypes.number,
  showZero: PropTypes.bool,
  badgeColor: PropTypes.string,
  position: PropTypes.string,
  className: PropTypes.string,
};

IndicatorDot.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  size: PropTypes.string,
  position: PropTypes.string,
  className: PropTypes.string,
};

IndicatorIcon.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  iconColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  position: PropTypes.string,
  className: PropTypes.string,
};

IndicatorAvatar.propTypes = {
  children: PropTypes.node,
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  avatarSize: PropTypes.string,
  position: PropTypes.string,
  online: PropTypes.bool,
  className: PropTypes.string,
};

IndicatorButton.propTypes = {
  children: PropTypes.node,
  buttonText: PropTypes.string,
  buttonVariant: PropTypes.string,
  buttonColor: PropTypes.string,
  onButtonClick: PropTypes.func,
  position: PropTypes.string,
  className: PropTypes.string,
};

IndicatorMultiple.propTypes = {
  children: PropTypes.node,
  indicators: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['badge', 'dot', 'icon', 'custom']),
    content: PropTypes.node,
    position: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
  })),
  className: PropTypes.string,
};

IndicatorToast.propTypes = {
  children: PropTypes.node,
  message: PropTypes.string,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  autoHide: PropTypes.bool,
  duration: PropTypes.number,
  onClose: PropTypes.func,
  position: PropTypes.string,
  className: PropTypes.string,
};

IndicatorNew.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  color: PropTypes.string,
  position: PropTypes.string,
  className: PropTypes.string,
};

// Attacher les sous-composants au composant principal
Indicator.Item = IndicatorItem;
Indicator.Template = IndicatorTemplate;
Indicator.Badge = IndicatorBadge;
Indicator.Count = IndicatorCount;
Indicator.Dot = IndicatorDot;
Indicator.Icon = IndicatorIcon;
Indicator.Avatar = IndicatorAvatar;
Indicator.Button = IndicatorButton;
Indicator.Multiple = IndicatorMultiple;
Indicator.Toast = IndicatorToast;
Indicator.New = IndicatorNew;

// Exports
export default Indicator;
export {
  Indicator,
  IndicatorItem,
  IndicatorTemplate,
  IndicatorBadge,
  IndicatorCount,
  IndicatorDot,
  IndicatorIcon,
  IndicatorAvatar,
  IndicatorButton,
  IndicatorMultiple,
  IndicatorToast,
  IndicatorNew,
}; 