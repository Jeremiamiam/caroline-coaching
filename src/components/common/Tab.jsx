import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Tab DaisyUI
 * https://daisyui.com/components/tab/
 */
const Tab = forwardRef(({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}, ref) => {
  const variantClasses = {
    default: 'tabs',
    bordered: 'tabs-bordered',
    lifted: 'tabs-lifted',
    boxed: 'tabs-boxed',
  };

  const sizeClasses = {
    xs: 'tabs-xs',
    sm: 'tabs-sm',
    md: 'tabs-md',
    lg: 'tabs-lg',
    xl: 'tabs-xl',
  };

  const classes = [
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Tab.displayName = 'Tab';

// Tab Item
const TabItem = forwardRef(({
  children,
  className = '',
  active = false,
  disabled = false,
  onClick,
  ...props
}, ref) => {
  const classes = [
    'tab',
    active && 'tab-active',
    disabled && 'tab-disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <a
      ref={ref}
      className={classes}
      onClick={!disabled ? onClick : undefined}
      {...props}
    >
      {children}
    </a>
  );
});

TabItem.displayName = 'TabItem';

// Tab Content
const TabContent = forwardRef(({
  children,
  className = '',
  active = false,
  ...props
}, ref) => {
  const classes = [
    'tab-content',
    active ? 'block' : 'hidden',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

TabContent.displayName = 'TabContent';

// Tab avec variantes
const TabBordered = forwardRef(({ className = '', ...props }, ref) => (
  <Tab
    ref={ref}
    variant="bordered"
    className={className}
    {...props}
  />
));

const TabLifted = forwardRef(({ className = '', ...props }, ref) => (
  <Tab
    ref={ref}
    variant="lifted"
    className={className}
    {...props}
  />
));

const TabBoxed = forwardRef(({ className = '', ...props }, ref) => (
  <Tab
    ref={ref}
    variant="boxed"
    className={className}
    {...props}
  />
));

// Tab avec tailles
const TabXS = forwardRef(({ className = '', ...props }, ref) => (
  <Tab
    ref={ref}
    size="xs"
    className={className}
    {...props}
  />
));

const TabSM = forwardRef(({ className = '', ...props }, ref) => (
  <Tab
    ref={ref}
    size="sm"
    className={className}
    {...props}
  />
));

const TabLG = forwardRef(({ className = '', ...props }, ref) => (
  <Tab
    ref={ref}
    size="lg"
    className={className}
    {...props}
  />
));

const TabXL = forwardRef(({ className = '', ...props }, ref) => (
  <Tab
    ref={ref}
    size="xl"
    className={className}
    {...props}
  />
));

// Tab Template - Configuration complète
const TabTemplate = ({
  tabs = [],
  activeTab = 0,
  onTabChange,
  variant = 'default',
  size = 'md',
  className = '',
  contentClassName = '',
  ...props
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
  
  const currentActiveTab = onTabChange ? activeTab : internalActiveTab;
  
  const handleTabChange = (index) => {
    if (onTabChange) {
      onTabChange(index);
    } else {
      setInternalActiveTab(index);
    }
  };

  return (
    <div className="space-y-4">
      <Tab variant={variant} size={size} className={className} {...props}>
        {tabs.map((tab, index) => (
          <TabItem
            key={index}
            active={index === currentActiveTab}
            disabled={tab.disabled}
            onClick={() => handleTabChange(index)}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
            {tab.badge && (
              <span className={`badge badge-sm ml-2 ${tab.badge.variant || 'badge-primary'}`}>
                {tab.badge.text}
              </span>
            )}
          </TabItem>
        ))}
      </Tab>

      <div className={`mt-4 ${contentClassName}`}>
        {tabs.map((tab, index) => (
          <TabContent
            key={index}
            active={index === currentActiveTab}
          >
            {tab.content}
          </TabContent>
        ))}
      </div>
    </div>
  );
};

TabTemplate.displayName = 'TabTemplate';

// Tab avec navigation
const TabWithNavigation = ({
  tabs = [],
  activeTab = 0,
  onTabChange,
  showNavigation = true,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
  
  const currentActiveTab = onTabChange ? activeTab : internalActiveTab;
  
  const handleTabChange = (index) => {
    if (onTabChange) {
      onTabChange(index);
    } else {
      setInternalActiveTab(index);
    }
  };

  const canGoPrevious = currentActiveTab > 0;
  const canGoNext = currentActiveTab < tabs.length - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      handleTabChange(currentActiveTab - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      handleTabChange(currentActiveTab + 1);
    }
  };

  return (
    <div className="space-y-4">
      <TabTemplate
        tabs={tabs}
        activeTab={currentActiveTab}
        onTabChange={handleTabChange}
        variant={variant}
        size={size}
        className={className}
        {...props}
      />

      {showNavigation && (
        <div className="flex justify-between">
          <button
            className="btn btn-outline btn-sm"
            onClick={handlePrevious}
            disabled={!canGoPrevious}
          >
            ← Précédent
          </button>
          
          <div className="flex gap-2">
            {tabs.map((_, index) => (
              <button
                key={index}
                className={`btn btn-sm ${index === currentActiveTab ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => handleTabChange(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            className="btn btn-outline btn-sm"
            onClick={handleNext}
            disabled={!canGoNext}
          >
            Suivant →
          </button>
        </div>
      )}
    </div>
  );
};

TabWithNavigation.displayName = 'TabWithNavigation';

// Tab responsive
const TabResponsive = ({
  tabs = [],
  activeTab = 0,
  onTabChange,
  variant = 'default',
  className = '',
  ...props
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
  
  const currentActiveTab = onTabChange ? activeTab : internalActiveTab;
  
  const handleTabChange = (index) => {
    if (onTabChange) {
      onTabChange(index);
    } else {
      setInternalActiveTab(index);
    }
  };

  return (
    <div className="space-y-4">
      {/* Version mobile : dropdown */}
      <div className="sm:hidden">
        <select
          className="select select-bordered w-full"
          value={currentActiveTab}
          onChange={(e) => handleTabChange(parseInt(e.target.value))}
        >
          {tabs.map((tab, index) => (
            <option key={index} value={index} disabled={tab.disabled}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Version desktop : tabs normaux */}
      <div className="hidden sm:block">
        <TabTemplate
          tabs={tabs}
          activeTab={currentActiveTab}
          onTabChange={handleTabChange}
          variant={variant}
          className={className}
          {...props}
        />
      </div>

      {/* Contenu (commun) */}
      <div className="mt-4">
        {tabs.map((tab, index) => (
          <TabContent
            key={index}
            active={index === currentActiveTab}
          >
            {tab.content}
          </TabContent>
        ))}
      </div>
    </div>
  );
};

TabResponsive.displayName = 'TabResponsive';

// Tab avec gestion des URL
const TabWithRouter = ({
  tabs = [],
  baseUrl = '',
  className = '',
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
    // Simulation de changement d'URL
    if (typeof window !== 'undefined' && tabs[index].slug) {
      window.history.pushState({}, '', `${baseUrl}#${tabs[index].slug}`);
    }
  };

  return (
    <TabTemplate
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      className={className}
      {...props}
    />
  );
};

TabWithRouter.displayName = 'TabWithRouter';

// Tab avec animation
const TabWithAnimation = ({
  tabs = [],
  activeTab = 0,
  onTabChange,
  variant = 'default',
  className = '',
  ...props
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
  
  const currentActiveTab = onTabChange ? activeTab : internalActiveTab;
  
  const handleTabChange = (index) => {
    if (onTabChange) {
      onTabChange(index);
    } else {
      setInternalActiveTab(index);
    }
  };

  return (
    <div className="space-y-4">
      <Tab variant={variant} className={className} {...props}>
        {tabs.map((tab, index) => (
          <TabItem
            key={index}
            active={index === currentActiveTab}
            disabled={tab.disabled}
            onClick={() => handleTabChange(index)}
            className="transition-all duration-200 hover:bg-base-200"
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </TabItem>
        ))}
      </Tab>

      <div className="mt-4">
        {tabs.map((tab, index) => (
          <TabContent
            key={index}
            active={index === currentActiveTab}
            className="transition-all duration-300 ease-in-out"
          >
            {tab.content}
          </TabContent>
        ))}
      </div>
    </div>
  );
};

TabWithAnimation.displayName = 'TabWithAnimation';

// Tab vertical
const TabVertical = ({
  tabs = [],
  activeTab = 0,
  onTabChange,
  className = '',
  ...props
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
  
  const currentActiveTab = onTabChange ? activeTab : internalActiveTab;
  
  const handleTabChange = (index) => {
    if (onTabChange) {
      onTabChange(index);
    } else {
      setInternalActiveTab(index);
    }
  };

  return (
    <div className="flex gap-4">
      {/* Tabs verticaux */}
      <div className="flex flex-col">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`btn btn-ghost justify-start mb-2 ${
              index === currentActiveTab ? 'btn-active' : ''
            }`}
            onClick={() => handleTabChange(index)}
            disabled={tab.disabled}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div className="flex-1">
        {tabs.map((tab, index) => (
          <TabContent
            key={index}
            active={index === currentActiveTab}
          >
            {tab.content}
          </TabContent>
        ))}
      </div>
    </div>
  );
};

TabVertical.displayName = 'TabVertical';

// PropTypes
Tab.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'bordered', 'lifted', 'boxed']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

TabItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

TabContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  active: PropTypes.bool,
};

TabTemplate.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    icon: PropTypes.node,
    disabled: PropTypes.bool,
    badge: PropTypes.shape({
      text: PropTypes.string,
      variant: PropTypes.string,
    }),
  })),
  activeTab: PropTypes.number,
  onTabChange: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'bordered', 'lifted', 'boxed']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  contentClassName: PropTypes.string,
};

TabWithNavigation.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeTab: PropTypes.number,
  onTabChange: PropTypes.func,
  showNavigation: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'bordered', 'lifted', 'boxed']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

TabResponsive.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeTab: PropTypes.number,
  onTabChange: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'bordered', 'lifted', 'boxed']),
  className: PropTypes.string,
};

TabWithRouter.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    slug: PropTypes.string,
  })).isRequired,
  baseUrl: PropTypes.string,
  className: PropTypes.string,
};

TabWithAnimation.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeTab: PropTypes.number,
  onTabChange: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'bordered', 'lifted', 'boxed']),
  className: PropTypes.string,
};

TabVertical.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeTab: PropTypes.number,
  onTabChange: PropTypes.func,
  className: PropTypes.string,
};

// Attacher les noms d'affichage
TabBordered.displayName = 'TabBordered';
TabLifted.displayName = 'TabLifted';
TabBoxed.displayName = 'TabBoxed';
TabXS.displayName = 'TabXS';
TabSM.displayName = 'TabSM';
TabLG.displayName = 'TabLG';
TabXL.displayName = 'TabXL';

// Export des sous-composants
Tab.Item = TabItem;
Tab.Content = TabContent;
Tab.Bordered = TabBordered;
Tab.Lifted = TabLifted;
Tab.Boxed = TabBoxed;
Tab.XS = TabXS;
Tab.SM = TabSM;
Tab.LG = TabLG;
Tab.XL = TabXL;
Tab.Template = TabTemplate;
Tab.WithNavigation = TabWithNavigation;
Tab.Responsive = TabResponsive;
Tab.WithRouter = TabWithRouter;
Tab.WithAnimation = TabWithAnimation;
Tab.Vertical = TabVertical;

export default Tab; 