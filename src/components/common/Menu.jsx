import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Menu DaisyUI
 * https://daisyui.com/components/menu/
 */
const Menu = forwardRef(({
  children,
  className = '',
  compact = false,
  horizontal = false,
  vertical = false,
  title,
  ...props
}, ref) => {
  const classes = [
    'menu',
    compact && 'menu-compact',
    horizontal && 'menu-horizontal',
    vertical && 'menu-vertical',
    className
  ].filter(Boolean).join(' ');

  return (
    <ul ref={ref} className={classes} {...props}>
      {title && (
        <li className="menu-title">
          <span>{title}</span>
        </li>
      )}
      {children}
    </ul>
  );
});

Menu.displayName = 'Menu';

// Menu Item
const MenuItem = forwardRef(({
  children,
  className = '',
  active = false,
  disabled = false,
  href,
  onClick,
  ...props
}, ref) => {
  const classes = [
    active && 'active',
    disabled && 'disabled',
    className
  ].filter(Boolean).join(' ');

  const content = href ? (
    <a href={href} className={classes} onClick={onClick} {...props}>
      {children}
    </a>
  ) : (
    <button 
      ref={ref}
      className={classes} 
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );

  return <li>{content}</li>;
});

MenuItem.displayName = 'MenuItem';

// Menu Divider
const MenuDivider = ({ className = '' }) => (
  <li className={`divider ${className}`}></li>
);

MenuDivider.displayName = 'MenuDivider';

// Menu Title
const MenuTitle = ({ children, className = '' }) => (
  <li className={`menu-title ${className}`}>
    <span>{children}</span>
  </li>
);

MenuTitle.displayName = 'MenuTitle';

// Menu avec sous-menu
const MenuWithSubmenu = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <li ref={ref} className={className} {...props}>
      {children}
    </li>
  );
});

MenuWithSubmenu.displayName = 'MenuWithSubmenu';

// Menu Dropdown
const MenuDropdown = forwardRef(({
  trigger,
  children,
  className = '',
  open = false,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li ref={ref} className={className} {...props}>
      <details open={isOpen}>
        <summary onClick={handleToggle}>
          {trigger}
        </summary>
        <ul className="menu-dropdown">
          {children}
        </ul>
      </details>
    </li>
  );
});

MenuDropdown.displayName = 'MenuDropdown';

// Menu Collapsible
const MenuCollapsible = forwardRef(({
  trigger,
  children,
  className = '',
  defaultOpen = false,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <li ref={ref} className={className} {...props}>
      <details open={isOpen}>
        <summary onClick={() => setIsOpen(!isOpen)}>
          {trigger}
        </summary>
        <ul>
          {children}
        </ul>
      </details>
    </li>
  );
});

MenuCollapsible.displayName = 'MenuCollapsible';

// Menu Horizontal
const MenuHorizontal = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <Menu 
      ref={ref} 
      horizontal 
      className={`menu-horizontal ${className}`} 
      {...props}
    >
      {children}
    </Menu>
  );
});

MenuHorizontal.displayName = 'MenuHorizontal';

// Menu Vertical
const MenuVertical = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <Menu 
      ref={ref} 
      vertical 
      className={`menu-vertical ${className}`} 
      {...props}
    >
      {children}
    </Menu>
  );
});

MenuVertical.displayName = 'MenuVertical';

// Menu Compact
const MenuCompact = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <Menu 
      ref={ref} 
      compact 
      className={`menu-compact ${className}`} 
      {...props}
    >
      {children}
    </Menu>
  );
});

MenuCompact.displayName = 'MenuCompact';

// Menu Sidebar
const MenuSidebar = forwardRef(({
  children,
  className = '',
  width = 'w-64',
  ...props
}, ref) => {
  return (
    <div ref={ref} className={`min-h-screen bg-base-200 ${width} ${className}`} {...props}>
      <Menu vertical className="p-4">
        {children}
      </Menu>
    </div>
  );
});

MenuSidebar.displayName = 'MenuSidebar';

// Menu Template - Configuration rapide
const MenuTemplate = ({
  items = [],
  orientation = 'vertical',
  compact = false,
  title,
  onItemClick,
  className = '',
  ...props
}) => {
  const renderItem = (item, index) => {
    if (item.type === 'divider') {
      return <MenuDivider key={index} />;
    }
    
    if (item.type === 'title') {
      return <MenuTitle key={index}>{item.label}</MenuTitle>;
    }

    if (item.submenu) {
      return (
        <MenuCollapsible
          key={index}
          trigger={item.label}
          defaultOpen={item.defaultOpen}
        >
          {item.submenu.map((subItem, subIndex) => (
            <MenuItem
              key={subIndex}
              active={subItem.active}
              disabled={subItem.disabled}
              href={subItem.href}
              onClick={() => onItemClick?.(subItem)}
            >
              {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
              {subItem.label}
            </MenuItem>
          ))}
        </MenuCollapsible>
      );
    }

    return (
      <MenuItem
        key={index}
        active={item.active}
        disabled={item.disabled}
        href={item.href}
        onClick={() => onItemClick?.(item)}
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {item.label}
        {item.badge && (
          <div className={`badge ${item.badge.variant || 'badge-primary'} ml-auto`}>
            {item.badge.text}
          </div>
        )}
      </MenuItem>
    );
  };

  return (
    <Menu
      horizontal={orientation === 'horizontal'}
      vertical={orientation === 'vertical'}
      compact={compact}
      title={title}
      className={className}
      {...props}
    >
      {items.map(renderItem)}
    </Menu>
  );
};

MenuTemplate.displayName = 'MenuTemplate';

// PropTypes
Menu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  compact: PropTypes.bool,
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  title: PropTypes.string,
};

MenuItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

MenuDropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  open: PropTypes.bool,
};

MenuCollapsible.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  defaultOpen: PropTypes.bool,
};

MenuSidebar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  width: PropTypes.string,
};

MenuTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: PropTypes.node,
    badge: PropTypes.shape({
      text: PropTypes.string,
      variant: PropTypes.string,
    }),
    submenu: PropTypes.array,
    defaultOpen: PropTypes.bool,
    type: PropTypes.oneOf(['item', 'divider', 'title']),
  })),
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  compact: PropTypes.bool,
  title: PropTypes.string,
  onItemClick: PropTypes.func,
  className: PropTypes.string,
};

// Export des sous-composants
Menu.Item = MenuItem;
Menu.Divider = MenuDivider;
Menu.Title = MenuTitle;
Menu.Submenu = MenuWithSubmenu;
Menu.Dropdown = MenuDropdown;
Menu.Collapsible = MenuCollapsible;
Menu.Horizontal = MenuHorizontal;
Menu.Vertical = MenuVertical;
Menu.Compact = MenuCompact;
Menu.Sidebar = MenuSidebar;
Menu.Template = MenuTemplate;

export default Menu; 