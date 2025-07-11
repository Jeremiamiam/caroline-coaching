import React, { forwardRef, Children } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Join DaisyUI
 * https://daisyui.com/components/join/
 */
const Join = forwardRef(({
  children,
  vertical = false,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'join',
    vertical && 'join-vertical',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Join.displayName = 'Join';

// Join Item - élément enfant avec classe join-item
const JoinItem = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'join-item',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

JoinItem.displayName = 'JoinItem';

// Join Template avec personnalisation
const JoinTemplate = ({
  children,
  vertical = false,
  size,
  className = '',
  ...props
}) => {
  const classes = [
    'join',
    vertical && 'join-vertical',
    size && `join-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Join
      vertical={vertical}
      className={classes}
      {...props}
    >
      {children}
    </Join>
  );
};

JoinTemplate.displayName = 'JoinTemplate';

// Join vertical
const JoinVertical = ({ className = '', ...props }) => (
  <Join vertical className={className} {...props} />
);

JoinVertical.displayName = 'JoinVertical';

// Join horizontal
const JoinHorizontal = ({ className = '', ...props }) => (
  <Join className={className} {...props} />
);

JoinHorizontal.displayName = 'JoinHorizontal';

// Join avec boutons
const JoinButtons = ({ 
  buttons = [], 
  vertical = false, 
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const joinClasses = [
    'join',
    vertical && 'join-vertical',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={joinClasses} {...props}>
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`btn btn-${variant} join-item`}
          onClick={button.onClick}
          disabled={button.disabled}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

JoinButtons.displayName = 'JoinButtons';

// Join avec inputs
const JoinInputs = ({ 
  inputs = [], 
  vertical = false,
  className = '',
  ...props 
}) => {
  const joinClasses = [
    'join',
    vertical && 'join-vertical',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={joinClasses} {...props}>
      {inputs.map((input, index) => (
        <input
          key={index}
          className="input input-bordered join-item"
          type={input.type || 'text'}
          placeholder={input.placeholder}
          value={input.value}
          onChange={input.onChange}
          disabled={input.disabled}
        />
      ))}
    </div>
  );
};

JoinInputs.displayName = 'JoinInputs';

// Join avec input et bouton
const JoinInputButton = ({ 
  inputProps = {},
  buttonProps = {},
  vertical = false,
  className = '',
  ...props 
}) => {
  const joinClasses = [
    'join',
    vertical && 'join-vertical',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={joinClasses} {...props}>
      <input
        className="input input-bordered join-item"
        type={inputProps.type || 'text'}
        placeholder={inputProps.placeholder}
        value={inputProps.value}
        onChange={inputProps.onChange}
        disabled={inputProps.disabled}
        {...inputProps}
      />
      <button
        className={`btn btn-${buttonProps.variant || 'primary'} join-item`}
        onClick={buttonProps.onClick}
        disabled={buttonProps.disabled}
        {...buttonProps}
      >
        {buttonProps.label || 'OK'}
      </button>
    </div>
  );
};

JoinInputButton.displayName = 'JoinInputButton';

// Join avec select et bouton
const JoinSelectButton = ({ 
  selectProps = {},
  buttonProps = {},
  vertical = false,
  className = '',
  ...props 
}) => {
  const joinClasses = [
    'join',
    vertical && 'join-vertical',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={joinClasses} {...props}>
      <select
        className="select select-bordered join-item"
        value={selectProps.value}
        onChange={selectProps.onChange}
        disabled={selectProps.disabled}
        {...selectProps}
      >
        {selectProps.options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        className={`btn btn-${buttonProps.variant || 'primary'} join-item`}
        onClick={buttonProps.onClick}
        disabled={buttonProps.disabled}
        {...buttonProps}
      >
        {buttonProps.label || 'OK'}
      </button>
    </div>
  );
};

JoinSelectButton.displayName = 'JoinSelectButton';

// Join avec radio buttons
const JoinRadio = ({ 
  name,
  options = [],
  value,
  onChange,
  vertical = false,
  className = '',
  ...props 
}) => {
  const joinClasses = [
    'join',
    vertical && 'join-vertical',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={joinClasses} {...props}>
      {options.map((option, index) => (
        <input
          key={index}
          className="join-item btn"
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          aria-label={option.label}
          disabled={option.disabled}
        />
      ))}
    </div>
  );
};

JoinRadio.displayName = 'JoinRadio';

// Join avec tabs
const JoinTabs = ({ 
  tabs = [],
  activeTab,
  onTabChange,
  vertical = false,
  className = '',
  ...props 
}) => {
  const joinClasses = [
    'join',
    vertical && 'join-vertical',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={joinClasses} {...props}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`btn join-item ${
            activeTab === tab.id ? 'btn-active' : ''
          }`}
          onClick={() => onTabChange(tab.id)}
          disabled={tab.disabled}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

JoinTabs.displayName = 'JoinTabs';

// Join avec dropdown
const JoinDropdown = ({ 
  triggerProps = {},
  items = [],
  vertical = false,
  className = '',
  ...props 
}) => {
  const joinClasses = [
    'join',
    vertical && 'join-vertical',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={joinClasses} {...props}>
      <button
        className={`btn btn-${triggerProps.variant || 'primary'} join-item`}
        {...triggerProps}
      >
        {triggerProps.label || 'Menu'}
      </button>
      <div className="dropdown dropdown-end">
        <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {items.map((item, index) => (
            <li key={index}>
              <a onClick={item.onClick} className={item.className}>
                {item.label}
              </a>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

JoinDropdown.displayName = 'JoinDropdown';

// Join avec pagination
const JoinPagination = ({ 
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showNumbers = true,
  vertical = false,
  className = '',
  ...props 
}) => {
  const joinClasses = [
    'join',
    vertical && 'join-vertical',
    className
  ].filter(Boolean).join(' ');

  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (showEllipsis) {
      // Logique pour afficher les numéros avec ellipses
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className={joinClasses} {...props}>
      <button
        className="join-item btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        «
      </button>
      
      {showNumbers && renderPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`join-item btn ${
            page === currentPage ? 'btn-active' : ''
          }`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
      
      <button
        className="join-item btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
};

JoinPagination.displayName = 'JoinPagination';

// Join avec breadcrumbs
const JoinBreadcrumbs = ({ 
  items = [],
  separator = '/',
  vertical = false,
  className = '',
  ...props 
}) => {
  const joinClasses = [
    'join',
    vertical && 'join-vertical',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={joinClasses} {...props}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && !vertical && (
            <span className="join-item btn btn-ghost btn-sm">
              {separator}
            </span>
          )}
          <button
            className={`join-item btn btn-ghost btn-sm ${
              item.active ? 'btn-active' : ''
            }`}
            onClick={item.onClick}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

JoinBreadcrumbs.displayName = 'JoinBreadcrumbs';

// Join avec stats
const JoinStats = ({ 
  stats = [],
  vertical = false,
  className = '',
  ...props 
}) => {
  const joinClasses = [
    'join',
    vertical && 'join-vertical',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={joinClasses} {...props}>
      {stats.map((stat, index) => (
        <div key={index} className="stat join-item">
          <div className="stat-title">{stat.title}</div>
          <div className="stat-value">{stat.value}</div>
          {stat.desc && <div className="stat-desc">{stat.desc}</div>}
        </div>
      ))}
    </div>
  );
};

JoinStats.displayName = 'JoinStats';

// Join avec cards
const JoinCards = ({ 
  cards = [],
  vertical = false,
  className = '',
  ...props 
}) => {
  const joinClasses = [
    'join',
    vertical && 'join-vertical',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={joinClasses} {...props}>
      {cards.map((card, index) => (
        <div key={index} className="card join-item bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{card.title}</h2>
            <p>{card.content}</p>
            {card.actions && (
              <div className="card-actions justify-end">
                {card.actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    className={`btn btn-${action.variant || 'primary'}`}
                    onClick={action.onClick}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

JoinCards.displayName = 'JoinCards';

// PropTypes
Join.propTypes = {
  children: PropTypes.node.isRequired,
  vertical: PropTypes.bool,
  className: PropTypes.string,
};

JoinItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

JoinTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  vertical: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  className: PropTypes.string,
};

JoinButtons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  })).isRequired,
  vertical: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'ghost', 'link', 'info', 'success', 'warning', 'error']),
  className: PropTypes.string,
};

JoinInputs.propTypes = {
  inputs: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
  })).isRequired,
  vertical: PropTypes.bool,
  className: PropTypes.string,
};

JoinInputButton.propTypes = {
  inputProps: PropTypes.object,
  buttonProps: PropTypes.object,
  vertical: PropTypes.bool,
  className: PropTypes.string,
};

JoinSelectButton.propTypes = {
  selectProps: PropTypes.object,
  buttonProps: PropTypes.object,
  vertical: PropTypes.bool,
  className: PropTypes.string,
};

JoinRadio.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  vertical: PropTypes.bool,
  className: PropTypes.string,
};

JoinTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })).isRequired,
  activeTab: PropTypes.string,
  onTabChange: PropTypes.func.isRequired,
  vertical: PropTypes.bool,
  className: PropTypes.string,
};

JoinDropdown.propTypes = {
  triggerProps: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
  })).isRequired,
  vertical: PropTypes.bool,
  className: PropTypes.string,
};

JoinPagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  showNumbers: PropTypes.bool,
  vertical: PropTypes.bool,
  className: PropTypes.string,
};

JoinBreadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
  })).isRequired,
  separator: PropTypes.string,
  vertical: PropTypes.bool,
  className: PropTypes.string,
};

JoinStats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    desc: PropTypes.string,
  })).isRequired,
  vertical: PropTypes.bool,
  className: PropTypes.string,
};

JoinCards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      variant: PropTypes.string,
    })),
  })).isRequired,
  vertical: PropTypes.bool,
  className: PropTypes.string,
};

// Export des sous-composants
Join.Item = JoinItem;
Join.Template = JoinTemplate;
Join.Vertical = JoinVertical;
Join.Horizontal = JoinHorizontal;
Join.Buttons = JoinButtons;
Join.Inputs = JoinInputs;
Join.InputButton = JoinInputButton;
Join.SelectButton = JoinSelectButton;
Join.Radio = JoinRadio;
Join.Tabs = JoinTabs;
Join.Dropdown = JoinDropdown;
Join.Pagination = JoinPagination;
Join.Breadcrumbs = JoinBreadcrumbs;
Join.Stats = JoinStats;
Join.Cards = JoinCards;

export default Join; 