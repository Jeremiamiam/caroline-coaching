import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Breadcrumbs DaisyUI
 * https://daisyui.com/components/breadcrumbs/
 */
const Breadcrumbs = forwardRef(({
  children,
  className = '',
  separator = '/',
  ...props
}, ref) => {
  const classes = [
    'breadcrumbs',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      <ul>
        {children}
      </ul>
    </div>
  );
});

Breadcrumbs.displayName = 'Breadcrumbs';

// Breadcrumb Item
const BreadcrumbItem = forwardRef(({
  children,
  className = '',
  href,
  active = false,
  disabled = false,
  icon,
  onClick,
  ...props
}, ref) => {
  const classes = [
    active && 'active',
    disabled && 'disabled',
    className
  ].filter(Boolean).join(' ');

  const content = href ? (
    <a
      href={href}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </a>
  ) : (
    <span
      ref={ref}
      className={classes}
      onClick={!disabled ? onClick : undefined}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </span>
  );

  return <li>{content}</li>;
});

BreadcrumbItem.displayName = 'BreadcrumbItem';

// Breadcrumb avec séparateur personnalisé
const BreadcrumbsWithSeparator = forwardRef(({
  children,
  separator = '>',
  className = '',
  ...props
}, ref) => {
  return (
    <Breadcrumbs
      ref={ref}
      className={className}
      separator={separator}
      {...props}
    >
      {children}
    </Breadcrumbs>
  );
});

BreadcrumbsWithSeparator.displayName = 'BreadcrumbsWithSeparator';

// Breadcrumb avec icônes
const BreadcrumbsWithIcons = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <Breadcrumbs
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </Breadcrumbs>
  );
});

BreadcrumbsWithIcons.displayName = 'BreadcrumbsWithIcons';

// Breadcrumb avec taille maximale
const BreadcrumbsWithMaxWidth = forwardRef(({
  children,
  maxWidth = 'max-w-xs',
  className = '',
  ...props
}, ref) => {
  return (
    <Breadcrumbs
      ref={ref}
      className={`${maxWidth} ${className}`}
      {...props}
    >
      {children}
    </Breadcrumbs>
  );
});

BreadcrumbsWithMaxWidth.displayName = 'BreadcrumbsWithMaxWidth';

// Breadcrumb Template - Configuration rapide
const BreadcrumbsTemplate = ({
  items = [],
  separator = '/',
  showIcons = false,
  onItemClick,
  className = '',
  ...props
}) => {
  const renderItem = (item, index) => {
    const isLast = index === items.length - 1;
    
    return (
      <BreadcrumbItem
        key={index}
        href={item.href}
        active={isLast || item.active}
        disabled={item.disabled}
        icon={showIcons && item.icon}
        onClick={() => onItemClick?.(item, index)}
      >
        {item.label}
      </BreadcrumbItem>
    );
  };

  return (
    <Breadcrumbs
      separator={separator}
      className={className}
      {...props}
    >
      {items.map(renderItem)}
    </Breadcrumbs>
  );
};

BreadcrumbsTemplate.displayName = 'BreadcrumbsTemplate';

// Breadcrumb avec navigation automatique
const BreadcrumbsWithNavigation = ({
  path = '',
  baseUrl = '',
  labels = {},
  showHome = true,
  homeLabel = 'Home',
  homeIcon = '🏠',
  onNavigate,
  className = '',
  ...props
}) => {
  const pathParts = path.split('/').filter(Boolean);
  const items = [];

  // Ajouter l'accueil si demandé
  if (showHome) {
    items.push({
      label: homeLabel,
      href: baseUrl || '/',
      icon: homeIcon,
    });
  }

  // Construire les items à partir du chemin
  pathParts.forEach((part, index) => {
    const href = baseUrl + '/' + pathParts.slice(0, index + 1).join('/');
    const label = labels[part] || part.charAt(0).toUpperCase() + part.slice(1);
    
    items.push({
      label,
      href,
    });
  });

  return (
    <BreadcrumbsTemplate
      items={items}
      showIcons={showHome}
      onItemClick={(item) => onNavigate?.(item.href)}
      className={className}
      {...props}
    />
  );
};

BreadcrumbsWithNavigation.displayName = 'BreadcrumbsWithNavigation';

// Breadcrumb responsive
const BreadcrumbsResponsive = ({
  items = [],
  maxItems = 3,
  className = '',
  ...props
}) => {
  const shouldTruncate = items.length > maxItems;
  
  let displayItems = items;
  
  if (shouldTruncate) {
    const first = items[0];
    const last = items[items.length - 1];
    const remaining = items.length - 2;
    
    displayItems = [
      first,
      { label: `... (${remaining} more)`, disabled: true },
      last
    ];
  }

  return (
    <BreadcrumbsTemplate
      items={displayItems}
      className={className}
      {...props}
    />
  );
};

BreadcrumbsResponsive.displayName = 'BreadcrumbsResponsive';

// Breadcrumb avec styles personnalisés
const BreadcrumbsStyled = forwardRef(({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const variantClasses = {
    default: '',
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    neutral: 'text-neutral',
    ghost: 'text-base-content/70',
  };

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const classes = [
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <Breadcrumbs
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </Breadcrumbs>
  );
});

BreadcrumbsStyled.displayName = 'BreadcrumbsStyled';

// Composants de commodité
const BreadcrumbsPrimary = forwardRef(({ className = '', ...props }, ref) => (
  <BreadcrumbsStyled
    ref={ref}
    variant="primary"
    className={className}
    {...props}
  />
));

const BreadcrumbsSecondary = forwardRef(({ className = '', ...props }, ref) => (
  <BreadcrumbsStyled
    ref={ref}
    variant="secondary"
    className={className}
    {...props}
  />
));

const BreadcrumbsAccent = forwardRef(({ className = '', ...props }, ref) => (
  <BreadcrumbsStyled
    ref={ref}
    variant="accent"
    className={className}
    {...props}
  />
));

const BreadcrumbsGhost = forwardRef(({ className = '', ...props }, ref) => (
  <BreadcrumbsStyled
    ref={ref}
    variant="ghost"
    className={className}
    {...props}
  />
));

// Composants de taille
const BreadcrumbsXS = forwardRef(({ className = '', ...props }, ref) => (
  <BreadcrumbsStyled
    ref={ref}
    size="xs"
    className={className}
    {...props}
  />
));

const BreadcrumbsSM = forwardRef(({ className = '', ...props }, ref) => (
  <BreadcrumbsStyled
    ref={ref}
    size="sm"
    className={className}
    {...props}
  />
));

const BreadcrumbsLG = forwardRef(({ className = '', ...props }, ref) => (
  <BreadcrumbsStyled
    ref={ref}
    size="lg"
    className={className}
    {...props}
  />
));

const BreadcrumbsXL = forwardRef(({ className = '', ...props }, ref) => (
  <BreadcrumbsStyled
    ref={ref}
    size="xl"
    className={className}
    {...props}
  />
));

// PropTypes
Breadcrumbs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  separator: PropTypes.string,
};

BreadcrumbItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};

BreadcrumbsTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: PropTypes.node,
  })),
  separator: PropTypes.string,
  showIcons: PropTypes.bool,
  onItemClick: PropTypes.func,
  className: PropTypes.string,
};

BreadcrumbsWithNavigation.propTypes = {
  path: PropTypes.string.isRequired,
  baseUrl: PropTypes.string,
  labels: PropTypes.object,
  showHome: PropTypes.bool,
  homeLabel: PropTypes.string,
  homeIcon: PropTypes.node,
  onNavigate: PropTypes.func,
  className: PropTypes.string,
};

BreadcrumbsResponsive.propTypes = {
  items: PropTypes.array.isRequired,
  maxItems: PropTypes.number,
  className: PropTypes.string,
};

BreadcrumbsStyled.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'accent', 'neutral', 'ghost']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

// Attacher les noms d'affichage
BreadcrumbsPrimary.displayName = 'BreadcrumbsPrimary';
BreadcrumbsSecondary.displayName = 'BreadcrumbsSecondary';
BreadcrumbsAccent.displayName = 'BreadcrumbsAccent';
BreadcrumbsGhost.displayName = 'BreadcrumbsGhost';
BreadcrumbsXS.displayName = 'BreadcrumbsXS';
BreadcrumbsSM.displayName = 'BreadcrumbsSM';
BreadcrumbsLG.displayName = 'BreadcrumbsLG';
BreadcrumbsXL.displayName = 'BreadcrumbsXL';

// Export des sous-composants
Breadcrumbs.Item = BreadcrumbItem;
Breadcrumbs.WithSeparator = BreadcrumbsWithSeparator;
Breadcrumbs.WithIcons = BreadcrumbsWithIcons;
Breadcrumbs.WithMaxWidth = BreadcrumbsWithMaxWidth;
Breadcrumbs.Template = BreadcrumbsTemplate;
Breadcrumbs.WithNavigation = BreadcrumbsWithNavigation;
Breadcrumbs.Responsive = BreadcrumbsResponsive;
Breadcrumbs.Styled = BreadcrumbsStyled;
Breadcrumbs.Primary = BreadcrumbsPrimary;
Breadcrumbs.Secondary = BreadcrumbsSecondary;
Breadcrumbs.Accent = BreadcrumbsAccent;
Breadcrumbs.Ghost = BreadcrumbsGhost;
Breadcrumbs.XS = BreadcrumbsXS;
Breadcrumbs.SM = BreadcrumbsSM;
Breadcrumbs.LG = BreadcrumbsLG;
Breadcrumbs.XL = BreadcrumbsXL;

export default Breadcrumbs; 