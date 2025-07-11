import React, { forwardRef, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Tooltip DaisyUI
 * https://daisyui.com/components/tooltip/
 */
const Tooltip = forwardRef(({
  children,
  tip,
  position = 'top',
  open = false,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'tooltip',
    `tooltip-${position}`,
    open && 'tooltip-open',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} data-tip={tip} {...props}>
      {children}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

// Tooltip Template avec personnalisation
const TooltipTemplate = ({
  children,
  tip,
  position = 'top',
  color,
  open = false,
  className = '',
  ...props
}) => {
  const colorClass = color ? `tooltip-${color}` : '';
  const finalClassName = [colorClass, className].filter(Boolean).join(' ');

  return (
    <Tooltip
      tip={tip}
      position={position}
      open={open}
      className={finalClassName}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

TooltipTemplate.displayName = 'TooltipTemplate';

// Tooltip avec différentes positions
const TooltipTop = ({ className = '', open, children, tip, ...props }) => {
  const [isOpen, setIsOpen] = useState(open || false);
  
  return (
    <Tooltip 
      position="top" 
      className={className} 
      open={isOpen}
      tip={tip}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      {...props} 
    >
      {children}
    </Tooltip>
  );
};

const TooltipBottom = ({ className = '', open, children, tip, ...props }) => {
  const [isOpen, setIsOpen] = useState(open || false);
  
  return (
    <Tooltip 
      position="bottom" 
      className={className} 
      open={isOpen}
      tip={tip}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      {...props} 
    >
      {children}
    </Tooltip>
  );
};

const TooltipLeft = ({ className = '', open, children, tip, ...props }) => {
  const [isOpen, setIsOpen] = useState(open || false);
  
  return (
    <Tooltip 
      position="left" 
      className={className} 
      open={isOpen}
      tip={tip}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      {...props} 
    >
      {children}
    </Tooltip>
  );
};

const TooltipRight = ({ className = '', open, children, tip, ...props }) => {
  const [isOpen, setIsOpen] = useState(open || false);
  
  return (
    <Tooltip 
      position="right" 
      className={className} 
      open={isOpen}
      tip={tip}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      {...props} 
    >
      {children}
    </Tooltip>
  );
};

// Tooltip avec couleurs
const TooltipPrimary = ({ className = '', ...props }) => {
  const finalClassName = ['tooltip-primary', className].filter(Boolean).join(' ');
  return <Tooltip className={finalClassName} {...props} />;
};

const TooltipSecondary = ({ className = '', ...props }) => {
  const finalClassName = ['tooltip-secondary', className].filter(Boolean).join(' ');
  return <Tooltip className={finalClassName} {...props} />;
};

const TooltipAccent = ({ className = '', ...props }) => {
  const finalClassName = ['tooltip-accent', className].filter(Boolean).join(' ');
  return <Tooltip className={finalClassName} {...props} />;
};

const TooltipInfo = ({ className = '', ...props }) => {
  const finalClassName = ['tooltip-info', className].filter(Boolean).join(' ');
  return <Tooltip className={finalClassName} {...props} />;
};

const TooltipSuccess = ({ className = '', ...props }) => {
  const finalClassName = ['tooltip-success', className].filter(Boolean).join(' ');
  return <Tooltip className={finalClassName} {...props} />;
};

const TooltipWarning = ({ className = '', ...props }) => {
  const finalClassName = ['tooltip-warning', className].filter(Boolean).join(' ');
  return <Tooltip className={finalClassName} {...props} />;
};

const TooltipError = ({ className = '', ...props }) => {
  const finalClassName = ['tooltip-error', className].filter(Boolean).join(' ');
  return <Tooltip className={finalClassName} {...props} />;
};

// Tooltip avec déclencheurs personnalisés
const TooltipHover = ({ children, tip, position = 'top', className = '', ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tooltip
      tip={tip}
      position={position}
      open={isOpen}
      className={className}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

TooltipHover.displayName = 'TooltipHover';

// Tooltip avec clic
const TooltipClick = ({ children, tip, position = 'top', className = '', ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tooltip
      tip={tip}
      position={position}
      open={isOpen}
      className={className}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

TooltipClick.displayName = 'TooltipClick';

// Tooltip avec focus
const TooltipFocus = ({ children, tip, position = 'top', className = '', ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tooltip
      tip={tip}
      position={position}
      open={isOpen}
      className={className}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

TooltipFocus.displayName = 'TooltipFocus';

// Tooltip avec contenu riche
const TooltipRich = ({ 
  children, 
  content, 
  position = 'top', 
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {children}
      </div>
      
      {isOpen && (
        <div 
          ref={tooltipRef}
          className={`absolute z-50 bg-base-200 border border-base-300 rounded-lg shadow-lg p-3 min-w-[200px] ${
            position === 'top' ? 'bottom-full mb-2' :
            position === 'bottom' ? 'top-full mt-2' :
            position === 'left' ? 'right-full mr-2' :
            'left-full ml-2'
          } ${className}`}
          {...props}
        >
          {content}
        </div>
      )}
    </div>
  );
};

TooltipRich.displayName = 'TooltipRich';

// Tooltip avec délai
const TooltipDelay = ({ 
  children, 
  tip, 
  position = 'top', 
  delay = 500,
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Tooltip
      tip={tip}
      position={position}
      open={isOpen}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

TooltipDelay.displayName = 'TooltipDelay';

// Tooltip avec icône
const TooltipIcon = ({ 
  icon = 'ℹ️', 
  tip, 
  position = 'top', 
  className = '',
  ...props 
}) => {
  const finalClassName = ['tooltip-info', className].filter(Boolean).join(' ');
  
  return (
    <Tooltip
      tip={tip}
      position={position}
      className={finalClassName}
      {...props}
    >
      <span className="cursor-help text-sm">{icon}</span>
    </Tooltip>
  );
};

TooltipIcon.displayName = 'TooltipIcon';

// Tooltip pour bouton
const TooltipButton = ({ 
  children, 
  tip, 
  position = 'top', 
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Tooltip
      tip={tip}
      position={position}
      {...props}
    >
      <button className={classes}>
        {children}
      </button>
    </Tooltip>
  );
};

TooltipButton.displayName = 'TooltipButton';

// PropTypes
Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  tip: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  open: PropTypes.bool,
  className: PropTypes.string,
};

TooltipTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  tip: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']),
  open: PropTypes.bool,
  className: PropTypes.string,
};

TooltipHover.propTypes = {
  children: PropTypes.node.isRequired,
  tip: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  className: PropTypes.string,
};

TooltipClick.propTypes = {
  children: PropTypes.node.isRequired,
  tip: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  className: PropTypes.string,
};

TooltipFocus.propTypes = {
  children: PropTypes.node.isRequired,
  tip: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  className: PropTypes.string,
};

TooltipRich.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  className: PropTypes.string,
};

TooltipDelay.propTypes = {
  children: PropTypes.node.isRequired,
  tip: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  delay: PropTypes.number,
  className: PropTypes.string,
};

TooltipIcon.propTypes = {
  icon: PropTypes.string,
  tip: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  className: PropTypes.string,
};

TooltipButton.propTypes = {
  children: PropTypes.node.isRequired,
  tip: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'ghost', 'link', 'info', 'success', 'warning', 'error']),
  className: PropTypes.string,
};

// Attacher les noms d'affichage pour les variantes de position
TooltipTop.displayName = 'TooltipTop';
TooltipBottom.displayName = 'TooltipBottom';
TooltipLeft.displayName = 'TooltipLeft';
TooltipRight.displayName = 'TooltipRight';

// Attacher les noms d'affichage pour les variantes de couleur
TooltipPrimary.displayName = 'TooltipPrimary';
TooltipSecondary.displayName = 'TooltipSecondary';
TooltipAccent.displayName = 'TooltipAccent';
TooltipInfo.displayName = 'TooltipInfo';
TooltipSuccess.displayName = 'TooltipSuccess';
TooltipWarning.displayName = 'TooltipWarning';
TooltipError.displayName = 'TooltipError';

// Export des sous-composants
Tooltip.Template = TooltipTemplate;
Tooltip.Top = TooltipTop;
Tooltip.Bottom = TooltipBottom;
Tooltip.Left = TooltipLeft;
Tooltip.Right = TooltipRight;
Tooltip.Primary = TooltipPrimary;
Tooltip.Secondary = TooltipSecondary;
Tooltip.Accent = TooltipAccent;
Tooltip.Info = TooltipInfo;
Tooltip.Success = TooltipSuccess;
Tooltip.Warning = TooltipWarning;
Tooltip.Error = TooltipError;
Tooltip.Hover = TooltipHover;
Tooltip.Click = TooltipClick;
Tooltip.Focus = TooltipFocus;
Tooltip.Rich = TooltipRich;
Tooltip.Delay = TooltipDelay;
Tooltip.Icon = TooltipIcon;
Tooltip.Button = TooltipButton;

export default Tooltip; 