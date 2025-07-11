import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Dropdown DaisyUI
 * https://daisyui.com/components/dropdown/
 */
const Dropdown = forwardRef(({
  children,
  className = '',
  open = false,
  onToggle,
  ...props
}, ref) => {
  const classes = [
    'dropdown',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';

// Dropdown Template de base
const DropdownTemplate = forwardRef(({
  trigger,
  children,
  position = 'bottom',
  align = 'start',
  hover = false,
  className = '',
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    top: 'dropdown-top',
    bottom: 'dropdown-bottom',
    left: 'dropdown-left',
    right: 'dropdown-right'
  };

  const alignClasses = {
    start: '',
    center: 'dropdown-center',
    end: 'dropdown-end'
  };

  const classes = [
    'dropdown',
    positionClasses[position],
    alignClasses[align],
    hover && 'dropdown-hover',
    className
  ].filter(Boolean).join(' ');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={ref} className={classes} {...props}>
      {/* Trigger */}
      <div 
        tabIndex={0} 
        role="button" 
        className={`btn m-1 ${trigger?.variant ? `btn-${trigger.variant}` : ''}`}
        onClick={!hover ? handleToggle : undefined}
      >
        {trigger?.label || trigger}
      </div>
      
      {/* Dropdown Content */}
      <div
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {children}
      </div>
    </div>
  );
});

DropdownTemplate.displayName = 'DropdownTemplate';

// Dropdown Hover
const DropdownHover = forwardRef(({
  trigger,
  children,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'dropdown dropdown-hover',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      <div tabIndex={0} role="button" className={`btn m-1 ${trigger?.variant ? `btn-${trigger.variant}` : ''}`}>
        {trigger?.label || trigger}
      </div>
      <div
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {children}
      </div>
    </div>
  );
});

DropdownHover.displayName = 'DropdownHover';

// Dropdown Click
const DropdownClick = forwardRef(({
  trigger,
  children,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'dropdown',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      <div tabIndex={0} role="button" className={`btn m-1 ${trigger?.variant ? `btn-${trigger.variant}` : ''}`}>
        {trigger?.label || trigger}
      </div>
      <div
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {children}
      </div>
    </div>
  );
});

DropdownClick.displayName = 'DropdownClick';

// Dropdown Top
const DropdownTop = forwardRef(({
  trigger,
  children,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'dropdown dropdown-top',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      <div tabIndex={0} role="button" className={`btn m-1 ${trigger?.variant ? `btn-${trigger.variant}` : ''}`}>
        {trigger?.label || trigger}
      </div>
      <div
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {children}
      </div>
    </div>
  );
});

DropdownTop.displayName = 'DropdownTop';

// Dropdown Bottom
const DropdownBottom = forwardRef(({
  trigger,
  children,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'dropdown dropdown-bottom',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      <div tabIndex={0} role="button" className={`btn m-1 ${trigger?.variant ? `btn-${trigger.variant}` : ''}`}>
        {trigger?.label || trigger}
      </div>
      <div
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {children}
      </div>
    </div>
  );
});

DropdownBottom.displayName = 'DropdownBottom';

// Dropdown Left
const DropdownLeft = forwardRef(({
  trigger,
  children,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'dropdown dropdown-left',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      <div tabIndex={0} role="button" className={`btn m-1 ${trigger?.variant ? `btn-${trigger.variant}` : ''}`}>
        {trigger?.label || trigger}
      </div>
      <div
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {children}
      </div>
    </div>
  );
});

DropdownLeft.displayName = 'DropdownLeft';

// Dropdown Right
const DropdownRight = forwardRef(({
  trigger,
  children,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'dropdown dropdown-right',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      <div tabIndex={0} role="button" className={`btn m-1 ${trigger?.variant ? `btn-${trigger.variant}` : ''}`}>
        {trigger?.label || trigger}
      </div>
      <div
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {children}
      </div>
    </div>
  );
});

DropdownRight.displayName = 'DropdownRight';

// Dropdown Menu avec items structurés
const DropdownMenu = forwardRef(({
  trigger,
  items = [],
  className = '',
  ...props
}, ref) => {
  const classes = [
    'dropdown',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      <div tabIndex={0} role="button" className={`btn m-1 ${trigger?.variant ? `btn-${trigger.variant}` : ''}`}>
        {trigger?.label || trigger}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {items.map((item, index) => (
          <li key={index}>
            {item.divider ? (
              <hr className="my-1" />
            ) : item.title ? (
              <div className="menu-title">{item.title}</div>
            ) : (
              <a onClick={item.onClick} className={item.className}>
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
                {item.badge && <span className={`badge ${item.badge.variant || 'badge-primary'}`}>{item.badge.text}</span>}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

DropdownMenu.displayName = 'DropdownMenu';

// Dropdown Form avec contenu form
const DropdownForm = forwardRef(({
  trigger,
  title = 'Formulaire',
  children,
  onSubmit,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'dropdown',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      <div tabIndex={0} role="button" className={`btn m-1 ${trigger?.variant ? `btn-${trigger.variant}` : ''}`}>
        {trigger?.label || trigger}
      </div>
      <div
        tabIndex={0}
        className="dropdown-content card card-compact bg-base-100 rounded-box z-[1] w-64 p-2 shadow"
      >
        <div className="card-body">
          <h3 className="card-title text-sm">{title}</h3>
          <form onSubmit={onSubmit} className="space-y-2">
            {children}
          </form>
        </div>
      </div>
    </div>
  );
});

DropdownForm.displayName = 'DropdownForm';

// Dropdown avec card content
const DropdownCard = forwardRef(({
  trigger,
  title,
  content,
  actions,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'dropdown',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      <div tabIndex={0} role="button" className={`btn m-1 ${trigger?.variant ? `btn-${trigger.variant}` : ''}`}>
        {trigger?.label || trigger}
      </div>
      <div
        tabIndex={0}
        className="dropdown-content card card-compact bg-base-100 rounded-box z-[1] w-64 p-2 shadow"
      >
        <div className="card-body">
          {title && <h3 className="card-title text-sm">{title}</h3>}
          {content && <p>{content}</p>}
          {actions && <div className="card-actions justify-end">{actions}</div>}
        </div>
      </div>
    </div>
  );
});

DropdownCard.displayName = 'DropdownCard';

// Dropdown avec avatar et utilisateur
const DropdownUser = forwardRef(({
  avatar,
  username,
  email,
  items = [],
  className = '',
  ...props
}, ref) => {
  const classes = [
    'dropdown dropdown-end',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {avatar}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {(username || email) && (
          <li className="menu-title">
            <div className="px-2 py-1">
              {username && <div className="font-bold">{username}</div>}
              {email && <div className="text-xs opacity-60">{email}</div>}
            </div>
          </li>
        )}
        {(username || email) && items.length > 0 && (
          <li><hr className="my-1" /></li>
        )}
        {items.map((item, index) => (
          <li key={index}>
            {item.divider ? (
              <hr className="my-1" />
            ) : (
              <a onClick={item.onClick} className={item.className}>
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

DropdownUser.displayName = 'DropdownUser';

// PropTypes
Dropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  open: PropTypes.bool,
  onToggle: PropTypes.func,
};

DropdownTemplate.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  align: PropTypes.oneOf(['start', 'center', 'end']),
  hover: PropTypes.bool,
  className: PropTypes.string,
};

DropdownHover.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

DropdownClick.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

DropdownTop.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

DropdownBottom.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

DropdownLeft.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

DropdownRight.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

DropdownMenu.propTypes = {
  trigger: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.node,
      className: PropTypes.string,
      badge: PropTypes.shape({
        text: PropTypes.string,
        variant: PropTypes.string,
      }),
      divider: PropTypes.bool,
      title: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

DropdownForm.propTypes = {
  trigger: PropTypes.node.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

DropdownCard.propTypes = {
  trigger: PropTypes.node.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  actions: PropTypes.node,
  className: PropTypes.string,
};

DropdownUser.propTypes = {
  avatar: PropTypes.node,
  username: PropTypes.string,
  email: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.node,
      className: PropTypes.string,
      divider: PropTypes.bool,
    })
  ),
  className: PropTypes.string,
};

// Export des sous-composants
Dropdown.Template = DropdownTemplate;
Dropdown.Hover = DropdownHover;
Dropdown.Click = DropdownClick;
Dropdown.Top = DropdownTop;
Dropdown.Bottom = DropdownBottom;
Dropdown.Left = DropdownLeft;
Dropdown.Right = DropdownRight;
Dropdown.Menu = DropdownMenu;
Dropdown.Form = DropdownForm;
Dropdown.Card = DropdownCard;
Dropdown.User = DropdownUser;

export default Dropdown; 