import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Navbar DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const Navbar = forwardRef(({
  children,
  className = '',
  
  // Variantes DaisyUI
  variant = 'default', // default, glass, sticky, shadow
  
  // États spéciaux
  glass = false,
  sticky = false,
  shadow = false,
  
  // Props HTML natives
  ...props
}, ref) => {
  // Classes de base
  const baseClasses = 'navbar bg-base-100';
  
  // Classes de variantes
  const variantClasses = {
    default: '',
    glass: 'glass',
    sticky: 'sticky top-0 z-10',
    shadow: 'shadow-lg'
  };
  
  // Classes d'état
  const stateClasses = {
    glass: glass ? 'glass' : '',
    sticky: sticky ? 'sticky top-0 z-10' : '',
    shadow: shadow ? 'shadow-lg' : ''
  };
  
  // Assemblage final des classes
  const navbarClasses = [
    baseClasses,
    variant !== 'default' ? variantClasses[variant] : '',
    stateClasses.glass,
    stateClasses.sticky,
    stateClasses.shadow,
    className
  ].filter(Boolean).join(' ');

  return (
    <nav
      ref={ref}
      className={navbarClasses}
      {...props}
    >
      {children}
    </nav>
  );
});

Navbar.displayName = 'Navbar';

Navbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'glass', 'sticky', 'shadow']),
  glass: PropTypes.bool,
  sticky: PropTypes.bool,
  shadow: PropTypes.bool
};

// Composants de commodité pour prototypage ultra-rapide
Navbar.Glass = (props) => <Navbar glass {...props} />;
Navbar.Sticky = (props) => <Navbar sticky {...props} />;
Navbar.Shadow = (props) => <Navbar shadow {...props} />;

/**
 * Composant NavbarStart pour la partie gauche
 */
const NavbarStart = ({ children, className = '', ...props }) => (
  <div className={`navbar-start ${className}`} {...props}>
    {children}
  </div>
);

NavbarStart.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Composant NavbarCenter pour la partie centrale
 */
const NavbarCenter = ({ children, className = '', ...props }) => (
  <div className={`navbar-center ${className}`} {...props}>
    {children}
  </div>
);

NavbarCenter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Composant NavbarEnd pour la partie droite
 */
const NavbarEnd = ({ children, className = '', ...props }) => (
  <div className={`navbar-end ${className}`} {...props}>
    {children}
  </div>
);

NavbarEnd.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Composant NavbarBrand pour le logo/titre
 */
const NavbarBrand = ({ 
  children, 
  href = '#',
  logo,
  title,
  className = '',
  onClick,
  ...props 
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`btn btn-ghost text-xl ${className}`}
      {...props}
    >
      {logo && <span className="mr-2">{logo}</span>}
      {title && <span>{title}</span>}
      {children}
    </a>
  );
};

NavbarBrand.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  logo: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

/**
 * Composant NavbarMenu pour les liens de navigation
 */
const NavbarMenu = ({ 
  children, 
  className = '',
  horizontal = true,
  ...props 
}) => {
  const orientationClasses = horizontal ? 'menu-horizontal' : 'menu-vertical';
  
  return (
    <ul className={`menu ${orientationClasses} px-1 ${className}`} {...props}>
      {children}
    </ul>
  );
};

NavbarMenu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  horizontal: PropTypes.bool
};

/**
 * Composant NavbarItem pour un élément de menu
 */
const NavbarItem = ({ 
  children, 
  href = '#',
  active = false,
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const stateClasses = {
    active: active ? 'active' : '',
    disabled: disabled ? 'disabled' : ''
  };

  const itemClasses = [
    stateClasses.active,
    stateClasses.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <li className={itemClasses}>
      <a
        href={href}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    </li>
  );
};

NavbarItem.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

/**
 * Composant NavbarDropdown pour menu déroulant
 */
const NavbarDropdown = ({ 
  children, 
  trigger,
  className = '',
  ...props 
}) => {
  return (
    <div className={`dropdown ${className}`} {...props}>
      <div tabIndex={0} role="button" className="btn btn-ghost">
        {trigger}
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {children}
      </ul>
    </div>
  );
};

NavbarDropdown.propTypes = {
  children: PropTypes.node,
  trigger: PropTypes.node.isRequired,
  className: PropTypes.string
};

/**
 * Composant NavbarToggle pour mobile (hamburger menu)
 */
const NavbarToggle = ({ 
  isOpen = false,
  onToggle,
  className = '',
  ...props 
}) => {
  return (
    <div className={`dropdown ${className}`} {...props}>
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-ghost lg:hidden"
        onClick={onToggle}
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 12h8m-8 6h16" 
          />
        </svg>
      </div>
      {isOpen && (
        <ul 
          tabIndex={0} 
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          {/* Contenu du menu mobile */}
        </ul>
      )}
    </div>
  );
};

NavbarToggle.propTypes = {
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string
};

/**
 * Composant NavbarTemplate pour créer des navbars rapidement
 */
const NavbarTemplate = ({ 
  brand,
  logo,
  title,
  menuItems = [],
  rightItems = [],
  sticky = false,
  shadow = true,
  mobileMenu = true,
  className = '',
  ...navbarProps 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Navbar 
      sticky={sticky} 
      shadow={shadow} 
      className={className} 
      {...navbarProps}
    >
      <NavbarStart>
        {/* Mobile menu toggle */}
        {mobileMenu && (
          <NavbarToggle 
            isOpen={isMobileMenuOpen}
            onToggle={handleMobileToggle}
          />
        )}
        
        {/* Brand */}
        {(brand || logo || title) && (
          <NavbarBrand logo={logo} title={title}>
            {brand}
          </NavbarBrand>
        )}
      </NavbarStart>

      <NavbarCenter>
        {/* Desktop menu */}
        <NavbarMenu className="hidden lg:flex">
          {menuItems.map((item, index) => (
            <NavbarItem
              key={index}
              href={item.href}
              active={item.active}
              disabled={item.disabled}
              onClick={item.onClick}
            >
              {item.label}
            </NavbarItem>
          ))}
        </NavbarMenu>
      </NavbarCenter>

      <NavbarEnd>
        {rightItems.map((item, index) => (
          <div key={index}>
            {item}
          </div>
        ))}
      </NavbarEnd>
    </Navbar>
  );
};

NavbarTemplate.propTypes = {
  brand: PropTypes.node,
  logo: PropTypes.node,
  title: PropTypes.string,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  })),
  rightItems: PropTypes.arrayOf(PropTypes.node),
  sticky: PropTypes.bool,
  shadow: PropTypes.bool,
  mobileMenu: PropTypes.bool,
  className: PropTypes.string
};

// Attacher les sous-composants au composant Navbar
Navbar.Start = NavbarStart;
Navbar.Center = NavbarCenter;
Navbar.End = NavbarEnd;
Navbar.Brand = NavbarBrand;
Navbar.Menu = NavbarMenu;
Navbar.Item = NavbarItem;
Navbar.Dropdown = NavbarDropdown;
Navbar.Toggle = NavbarToggle;
Navbar.Template = NavbarTemplate;

export default Navbar; 