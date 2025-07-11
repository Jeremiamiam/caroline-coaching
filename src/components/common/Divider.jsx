import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Divider DaisyUI
 * https://daisyui.com/components/divider/
 */
const Divider = forwardRef(({
  children,
  horizontal = false,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'divider',
    horizontal && 'divider-horizontal',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Divider.displayName = 'Divider';

// Divider Template avec personnalisation
const DividerTemplate = ({
  children,
  horizontal = false,
  color,
  className = '',
  ...props
}) => {
  const classes = [
    'divider',
    horizontal && 'divider-horizontal',
    color && `divider-${color}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Divider
      horizontal={horizontal}
      className={classes}
      {...props}
    >
      {children}
    </Divider>
  );
};

DividerTemplate.displayName = 'DividerTemplate';

// Divider horizontal
const DividerHorizontal = ({ className = '', ...props }) => (
  <Divider horizontal className={className} {...props} />
);

DividerHorizontal.displayName = 'DividerHorizontal';

// Divider vertical
const DividerVertical = ({ className = '', ...props }) => (
  <Divider className={className} {...props} />
);

DividerVertical.displayName = 'DividerVertical';

// Divider avec texte
const DividerText = ({ text, horizontal = false, className = '', ...props }) => (
  <Divider horizontal={horizontal} className={className} {...props}>
    {text}
  </Divider>
);

DividerText.displayName = 'DividerText';

// Divider avec couleurs
const DividerPrimary = ({ className = '', ...props }) => (
  <Divider className={`divider-primary ${className}`} {...props} />
);

const DividerSecondary = ({ className = '', ...props }) => (
  <Divider className={`divider-secondary ${className}`} {...props} />
);

const DividerAccent = ({ className = '', ...props }) => (
  <Divider className={`divider-accent ${className}`} {...props} />
);

const DividerInfo = ({ className = '', ...props }) => (
  <Divider className={`divider-info ${className}`} {...props} />
);

const DividerSuccess = ({ className = '', ...props }) => (
  <Divider className={`divider-success ${className}`} {...props} />
);

const DividerWarning = ({ className = '', ...props }) => (
  <Divider className={`divider-warning ${className}`} {...props} />
);

const DividerError = ({ className = '', ...props }) => (
  <Divider className={`divider-error ${className}`} {...props} />
);

// Divider avec start/end
const DividerStart = ({ className = '', ...props }) => (
  <Divider className={`divider-start ${className}`} {...props} />
);

const DividerEnd = ({ className = '', ...props }) => (
  <Divider className={`divider-end ${className}`} {...props} />
);

// Divider avec icône
const DividerIcon = ({ 
  icon = '◈', 
  horizontal = false, 
  className = '',
  ...props 
}) => (
  <Divider horizontal={horizontal} className={className} {...props}>
    <span className="text-base-content/60">{icon}</span>
  </Divider>
);

DividerIcon.displayName = 'DividerIcon';

// Divider avec bouton
const DividerButton = ({ 
  children, 
  horizontal = false, 
  variant = 'outline',
  size = 'sm',
  className = '',
  ...props 
}) => {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
  ].filter(Boolean).join(' ');

  return (
    <Divider horizontal={horizontal} className={className} {...props}>
      <button className={buttonClasses}>
        {children}
      </button>
    </Divider>
  );
};

DividerButton.displayName = 'DividerButton';

// Divider avec badge
const DividerBadge = ({ 
  children, 
  horizontal = false, 
  variant = 'outline',
  className = '',
  ...props 
}) => {
  const badgeClasses = [
    'badge',
    `badge-${variant}`,
  ].filter(Boolean).join(' ');

  return (
    <Divider horizontal={horizontal} className={className} {...props}>
      <span className={badgeClasses}>
        {children}
      </span>
    </Divider>
  );
};

DividerBadge.displayName = 'DividerBadge';

// Divider avec date
const DividerDate = ({ 
  date, 
  horizontal = false, 
  format = 'short',
  className = '',
  ...props 
}) => {
  const formatDate = (date) => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (format === 'short') {
      return dateObj.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } else if (format === 'long') {
      return dateObj.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    return dateObj.toLocaleDateString();
  };

  return (
    <Divider horizontal={horizontal} className={className} {...props}>
      <time className="text-sm text-base-content/60">
        {formatDate(date)}
      </time>
    </Divider>
  );
};

DividerDate.displayName = 'DividerDate';

// Divider avec progress
const DividerProgress = ({ 
  progress = 0, 
  horizontal = false, 
  showValue = false,
  className = '',
  ...props 
}) => {
  return (
    <Divider horizontal={horizontal} className={className} {...props}>
      <div className="flex items-center gap-2">
        <progress 
          className="progress progress-primary w-20" 
          value={progress} 
          max="100"
        />
        {showValue && (
          <span className="text-sm text-base-content/60">
            {progress}%
          </span>
        )}
      </div>
    </Divider>
  );
};

DividerProgress.displayName = 'DividerProgress';

// Divider avec steps
const DividerSteps = ({ 
  currentStep = 1, 
  totalSteps = 3,
  horizontal = false, 
  className = '',
  ...props 
}) => {
  return (
    <Divider horizontal={horizontal} className={className} {...props}>
      <div className="flex items-center gap-1">
        <span className="text-sm text-base-content/60">
          Étape {currentStep} sur {totalSteps}
        </span>
        <div className="flex gap-1 ml-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < currentStep ? 'bg-primary' : 'bg-base-300'
              }`}
            />
          ))}
        </div>
      </div>
    </Divider>
  );
};

DividerSteps.displayName = 'DividerSteps';

// Divider avec link
const DividerLink = ({ 
  href, 
  children, 
  horizontal = false,
  className = '',
  ...props 
}) => {
  return (
    <Divider horizontal={horizontal} className={className} {...props}>
      <a 
        href={href} 
        className="link link-primary text-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </Divider>
  );
};

DividerLink.displayName = 'DividerLink';

// PropTypes
Divider.propTypes = {
  children: PropTypes.node,
  horizontal: PropTypes.bool,
  className: PropTypes.string,
};

DividerTemplate.propTypes = {
  children: PropTypes.node,
  horizontal: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']),
  className: PropTypes.string,
};

DividerText.propTypes = {
  text: PropTypes.string.isRequired,
  horizontal: PropTypes.bool,
  className: PropTypes.string,
};

DividerIcon.propTypes = {
  icon: PropTypes.string,
  horizontal: PropTypes.bool,
  className: PropTypes.string,
};

DividerButton.propTypes = {
  children: PropTypes.node.isRequired,
  horizontal: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'ghost', 'link', 'outline']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  className: PropTypes.string,
};

DividerBadge.propTypes = {
  children: PropTypes.node.isRequired,
  horizontal: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'ghost', 'outline']),
  className: PropTypes.string,
};

DividerDate.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  horizontal: PropTypes.bool,
  format: PropTypes.oneOf(['short', 'long']),
  className: PropTypes.string,
};

DividerProgress.propTypes = {
  progress: PropTypes.number,
  horizontal: PropTypes.bool,
  showValue: PropTypes.bool,
  className: PropTypes.string,
};

DividerSteps.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  horizontal: PropTypes.bool,
  className: PropTypes.string,
};

DividerLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  horizontal: PropTypes.bool,
  className: PropTypes.string,
};

// Attacher les noms d'affichage pour les variantes de couleur
DividerPrimary.displayName = 'DividerPrimary';
DividerSecondary.displayName = 'DividerSecondary';
DividerAccent.displayName = 'DividerAccent';
DividerInfo.displayName = 'DividerInfo';
DividerSuccess.displayName = 'DividerSuccess';
DividerWarning.displayName = 'DividerWarning';
DividerError.displayName = 'DividerError';
DividerStart.displayName = 'DividerStart';
DividerEnd.displayName = 'DividerEnd';

// Export des sous-composants
Divider.Template = DividerTemplate;
Divider.Horizontal = DividerHorizontal;
Divider.Vertical = DividerVertical;
Divider.Text = DividerText;
Divider.Primary = DividerPrimary;
Divider.Secondary = DividerSecondary;
Divider.Accent = DividerAccent;
Divider.Info = DividerInfo;
Divider.Success = DividerSuccess;
Divider.Warning = DividerWarning;
Divider.Error = DividerError;
Divider.Start = DividerStart;
Divider.End = DividerEnd;
Divider.Icon = DividerIcon;
Divider.Button = DividerButton;
Divider.Badge = DividerBadge;
Divider.Date = DividerDate;
Divider.Progress = DividerProgress;
Divider.Steps = DividerSteps;
Divider.Link = DividerLink;

export default Divider; 