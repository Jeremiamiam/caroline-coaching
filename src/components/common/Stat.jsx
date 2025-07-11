import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Stat DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const Stat = forwardRef(({
  children,
  className = '',
  
  // Props HTML natives
  onClick,
  onMouseEnter,
  onMouseLeave,
  
  ...props
}, ref) => {
  // Classes de base
  const baseClasses = 'stat';
  
  // Classes d'état
  const stateClasses = {
    clickable: onClick ? 'cursor-pointer hover:bg-base-200 transition-colors' : ''
  };
  
  // Assemblage final des classes
  const statClasses = [
    baseClasses,
    stateClasses.clickable,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={statClasses}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
});

Stat.displayName = 'Stat';

Stat.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

/**
 * Composant StatFigure pour l'icône ou l'image
 */
const StatFigure = ({ children, className = '', ...props }) => (
  <div className={`stat-figure ${className}`} {...props}>
    {children}
  </div>
);

StatFigure.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Composant StatTitle pour le titre
 */
const StatTitle = ({ children, className = '', ...props }) => (
  <div className={`stat-title ${className}`} {...props}>
    {children}
  </div>
);

StatTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Composant StatValue pour la valeur principale
 */
const StatValue = ({ children, className = '', ...props }) => (
  <div className={`stat-value ${className}`} {...props}>
    {children}
  </div>
);

StatValue.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Composant StatDesc pour la description
 */
const StatDesc = ({ children, className = '', ...props }) => (
  <div className={`stat-desc ${className}`} {...props}>
    {children}
  </div>
);

StatDesc.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Composant StatActions pour les actions
 */
const StatActions = ({ children, className = '', ...props }) => (
  <div className={`stat-actions ${className}`} {...props}>
    {children}
  </div>
);

StatActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Composant StatTemplate pour créer des stats rapidement
 */
const StatTemplate = ({ 
  title, 
  value, 
  desc, 
  figure,
  actions,
  trend,
  trendType = 'neutral', // positive, negative, neutral
  className = '',
  ...statProps 
}) => {
  const trendClasses = {
    positive: 'text-success',
    negative: 'text-error',
    neutral: 'text-base-content'
  };

  return (
    <Stat className={className} {...statProps}>
      {figure && <StatFigure>{figure}</StatFigure>}
      {title && <StatTitle>{title}</StatTitle>}
      {value && <StatValue>{value}</StatValue>}
      {(desc || trend) && (
        <StatDesc>
          {desc}
          {trend && (
            <span className={`ml-2 ${trendClasses[trendType]}`}>
              {trend}
            </span>
          )}
        </StatDesc>
      )}
      {actions && <StatActions>{actions}</StatActions>}
    </Stat>
  );
};

StatTemplate.propTypes = {
  title: PropTypes.node,
  value: PropTypes.node,
  desc: PropTypes.node,
  figure: PropTypes.node,
  actions: PropTypes.node,
  trend: PropTypes.node,
  trendType: PropTypes.oneOf(['positive', 'negative', 'neutral']),
  className: PropTypes.string
};

/**
 * Composant Stats pour grouper plusieurs stats
 */
const Stats = ({ 
  children, 
  className = '',
  shadow = false,
  vertical = false,
  ...props 
}) => {
  const baseClasses = 'stats';
  const stateClasses = {
    shadow: shadow ? 'shadow' : '',
    vertical: vertical ? 'stats-vertical' : ''
  };

  const statsClasses = [
    baseClasses,
    stateClasses.shadow,
    stateClasses.vertical,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={statsClasses} {...props}>
      {children}
    </div>
  );
};

Stats.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  shadow: PropTypes.bool,
  vertical: PropTypes.bool
};

// Attacher les sous-composants au composant Stat
Stat.Figure = StatFigure;
Stat.Title = StatTitle;
Stat.Value = StatValue;
Stat.Desc = StatDesc;
Stat.Actions = StatActions;
Stat.Template = StatTemplate;
Stat.Group = Stats;

export default Stat; 