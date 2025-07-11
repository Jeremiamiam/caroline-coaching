import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Drawer DaisyUI
 * https://daisyui.com/components/drawer/
 */
const Drawer = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'drawer',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Drawer.displayName = 'Drawer';

// Drawer Toggle (checkbox caché)
const DrawerToggle = forwardRef(({
  id,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'drawer-toggle',
    className
  ].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      id={id}
      type="checkbox"
      className={classes}
      {...props}
    />
  );
});

DrawerToggle.displayName = 'DrawerToggle';

// Drawer Content (contenu principal)
const DrawerContent = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'drawer-content',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

DrawerContent.displayName = 'DrawerContent';

// Drawer Side (contenu du tiroir)
const DrawerSide = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'drawer-side',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

DrawerSide.displayName = 'DrawerSide';

// Drawer Overlay (overlay de fermeture)
const DrawerOverlay = forwardRef(({
  htmlFor,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'drawer-overlay',
    className
  ].filter(Boolean).join(' ');

  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={classes}
      {...props}
    />
  );
});

DrawerOverlay.displayName = 'DrawerOverlay';

// Drawer Button (bouton pour ouvrir/fermer)
const DrawerButton = forwardRef(({
  children,
  htmlFor,
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}, ref) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    size !== 'md' && `btn-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={classes}
      {...props}
    >
      {children}
    </label>
  );
});

DrawerButton.displayName = 'DrawerButton';

// Drawer Template - Configuration complète
const DrawerTemplate = ({
  id = 'drawer',
  isOpen = false,
  onToggle,
  title = 'Menu',
  sideContent,
  mainContent,
  showOverlay = true,
  position = 'left',
  className = '',
  sideClassName = '',
  contentClassName = '',
  ...props
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);
  
  const currentIsOpen = onToggle ? isOpen : internalIsOpen;
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle(!currentIsOpen);
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const drawerClasses = [
    'drawer',
    position === 'right' && 'drawer-end',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={drawerClasses} {...props}>
      <DrawerToggle
        id={id}
        checked={currentIsOpen}
        onChange={handleToggle}
      />
      
      <DrawerContent className={contentClassName}>
        {mainContent}
      </DrawerContent>

      <DrawerSide className={sideClassName}>
        {showOverlay && <DrawerOverlay htmlFor={id} />}
        
        <aside className="min-h-full w-80 bg-base-200 text-base-content">
          {sideContent}
        </aside>
      </DrawerSide>
    </div>
  );
};

DrawerTemplate.displayName = 'DrawerTemplate';

// Drawer avec navigation
const DrawerWithNavigation = ({
  id = 'drawer-nav',
  title = 'Navigation',
  logo,
  menuItems = [],
  footerContent,
  mainContent,
  onItemClick,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item) => {
    onItemClick?.(item);
    setIsOpen(false); // Fermer le drawer après clic
  };

  const sideContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-base-300">
        <div className="flex items-center justify-between">
          {logo && <div className="flex items-center">{logo}</div>}
          <h2 className="text-lg font-semibold">{title}</h2>
          <DrawerButton
            htmlFor={id}
            variant="ghost"
            size="sm"
            className="btn-square"
          >
            ✕
          </DrawerButton>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        <ul className="menu p-4 space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.type === 'divider' ? (
                <div className="divider my-2"></div>
              ) : (
                <a
                  href={item.href || '#'}
                  className={`flex items-center space-x-2 ${
                    item.active ? 'active' : ''
                  } ${item.disabled ? 'disabled' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`badge badge-sm ${item.badge.variant || 'badge-primary'}`}>
                      {item.badge.text}
                    </span>
                  )}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      {footerContent && (
        <div className="p-4 border-t border-base-300">
          {footerContent}
        </div>
      )}
    </div>
  );

  return (
    <DrawerTemplate
      id={id}
      isOpen={isOpen}
      onToggle={setIsOpen}
      sideContent={sideContent}
      mainContent={
        <div>
          {/* Header avec bouton menu */}
          <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-none">
              <DrawerButton
                htmlFor={id}
                variant="ghost"
                className="btn-square"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </DrawerButton>
            </div>
            <div className="flex-1">
              <span className="text-xl font-bold">{title}</span>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="p-4">
            {mainContent}
          </div>
        </div>
      }
      className={className}
      {...props}
    />
  );
};

DrawerWithNavigation.displayName = 'DrawerWithNavigation';

// Drawer responsive
const DrawerResponsive = ({
  id = 'drawer-responsive',
  title = 'Menu',
  menuItems = [],
  mainContent,
  breakpoint = 'lg',
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const breakpointClasses = {
    sm: 'sm:drawer-open',
    md: 'md:drawer-open',
    lg: 'lg:drawer-open',
    xl: 'xl:drawer-open',
  };

  const drawerClasses = [
    'drawer',
    breakpointClasses[breakpoint],
    className
  ].filter(Boolean).join(' ');

  const sideContent = (
    <div className="min-h-full w-80 bg-base-200 text-base-content">
      {/* Header mobile uniquement */}
      <div className={`p-4 border-b border-base-300 ${breakpoint}:hidden`}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <DrawerButton
            htmlFor={id}
            variant="ghost"
            size="sm"
            className="btn-square"
          >
            ✕
          </DrawerButton>
        </div>
      </div>

      {/* Menu permanent desktop */}
      <ul className="menu p-4 space-y-1">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.type === 'divider' ? (
              <div className="divider my-2"></div>
            ) : (
              <a
                href={item.href || '#'}
                className={`flex items-center space-x-2 ${
                  item.active ? 'active' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`badge badge-sm ${item.badge.variant || 'badge-primary'}`}>
                    {item.badge.text}
                  </span>
                )}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={drawerClasses} {...props}>
      <DrawerToggle
        id={id}
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />
      
      <DrawerContent className="flex flex-col">
        {/* Header avec bouton menu (mobile seulement) */}
        <div className={`navbar bg-base-100 shadow-sm ${breakpoint}:hidden`}>
          <div className="flex-none">
            <DrawerButton
              htmlFor={id}
              variant="ghost"
              className="btn-square"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </DrawerButton>
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold">{title}</span>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 p-4">
          {mainContent}
        </div>
      </DrawerContent>

      <DrawerSide>
        <DrawerOverlay htmlFor={id} />
        {sideContent}
      </DrawerSide>
    </div>
  );
};

DrawerResponsive.displayName = 'DrawerResponsive';

// Drawer avec positions
const DrawerLeft = forwardRef(({ className = '', ...props }, ref) => (
  <DrawerTemplate
    ref={ref}
    position="left"
    className={className}
    {...props}
  />
));

const DrawerRight = forwardRef(({ className = '', ...props }, ref) => (
  <DrawerTemplate
    ref={ref}
    position="right"
    className={className}
    {...props}
  />
));

// Drawer avec tailles
const DrawerSmall = ({
  className = '',
  sideClassName = '',
  ...props
}) => (
  <DrawerTemplate
    className={className}
    sideClassName={`${sideClassName} w-64`}
    {...props}
  />
);

const DrawerLarge = ({
  className = '',
  sideClassName = '',
  ...props
}) => (
  <DrawerTemplate
    className={className}
    sideClassName={`${sideClassName} w-96`}
    {...props}
  />
);

// Drawer avec contenu personnalisé
const DrawerWithContent = ({
  id = 'drawer-content',
  buttonContent = '☰ Menu',
  drawerContent,
  mainContent,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DrawerTemplate
      id={id}
      isOpen={isOpen}
      onToggle={setIsOpen}
      sideContent={
        <div className="min-h-full w-80 bg-base-200 text-base-content p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Menu</h2>
            <DrawerButton
              htmlFor={id}
              variant="ghost"
              size="sm"
              className="btn-square"
            >
              ✕
            </DrawerButton>
          </div>
          {drawerContent}
        </div>
      }
      mainContent={
        <div>
          <div className="p-4">
            <DrawerButton
              htmlFor={id}
              variant="primary"
              className="mb-4"
            >
              {buttonContent}
            </DrawerButton>
            {mainContent}
          </div>
        </div>
      }
      className={className}
      {...props}
    />
  );
};

DrawerWithContent.displayName = 'DrawerWithContent';

// PropTypes
Drawer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

DrawerToggle.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};

DrawerContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

DrawerSide.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

DrawerOverlay.propTypes = {
  htmlFor: PropTypes.string,
  className: PropTypes.string,
};

DrawerButton.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'ghost', 'link', 'info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

DrawerTemplate.propTypes = {
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
  title: PropTypes.string,
  sideContent: PropTypes.node,
  mainContent: PropTypes.node,
  showOverlay: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  sideClassName: PropTypes.string,
  contentClassName: PropTypes.string,
};

DrawerWithNavigation.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  logo: PropTypes.node,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.node,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    badge: PropTypes.shape({
      text: PropTypes.string,
      variant: PropTypes.string,
    }),
    type: PropTypes.oneOf(['divider']),
  })),
  footerContent: PropTypes.node,
  mainContent: PropTypes.node,
  onItemClick: PropTypes.func,
  className: PropTypes.string,
};

DrawerResponsive.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  menuItems: PropTypes.array,
  mainContent: PropTypes.node,
  breakpoint: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

DrawerWithContent.propTypes = {
  id: PropTypes.string,
  buttonContent: PropTypes.node,
  drawerContent: PropTypes.node,
  mainContent: PropTypes.node,
  className: PropTypes.string,
};

// Attacher les noms d'affichage
DrawerLeft.displayName = 'DrawerLeft';
DrawerRight.displayName = 'DrawerRight';
DrawerSmall.displayName = 'DrawerSmall';
DrawerLarge.displayName = 'DrawerLarge';

// Export des sous-composants
Drawer.Toggle = DrawerToggle;
Drawer.Content = DrawerContent;
Drawer.Side = DrawerSide;
Drawer.Overlay = DrawerOverlay;
Drawer.Button = DrawerButton;
Drawer.Template = DrawerTemplate;
Drawer.WithNavigation = DrawerWithNavigation;
Drawer.Responsive = DrawerResponsive;
Drawer.Left = DrawerLeft;
Drawer.Right = DrawerRight;
Drawer.Small = DrawerSmall;
Drawer.Large = DrawerLarge;
Drawer.WithContent = DrawerWithContent;

export default Drawer; 