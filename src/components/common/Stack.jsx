import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Stack DaisyUI
 * https://daisyui.com/components/stack/
 */
const Stack = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'stack',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Stack.displayName = 'Stack';

// Stack Template avec personnalisation
const StackTemplate = ({
  children,
  spacing = 'gap-4',
  direction = 'flex-col',
  alignment = 'items-center',
  className = '',
  ...props
}) => {
  const classes = [
    'stack',
    'flex',
    direction,
    alignment,
    spacing,
    className
  ].filter(Boolean).join(' ');

  return (
    <Stack className={classes} {...props}>
      {children}
    </Stack>
  );
};

StackTemplate.displayName = 'StackTemplate';

// Stack vertical (par défaut)
const StackVertical = ({ 
  children,
  spacing = 'gap-4',
  alignment = 'items-center',
  className = '',
  ...props 
}) => {
  const classes = [
    'stack',
    'flex flex-col',
    alignment,
    spacing,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

StackVertical.displayName = 'StackVertical';

// Stack horizontal
const StackHorizontal = ({ 
  children,
  spacing = 'gap-4',
  alignment = 'items-center',
  className = '',
  ...props 
}) => {
  const classes = [
    'stack',
    'flex flex-row',
    alignment,
    spacing,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

StackHorizontal.displayName = 'StackHorizontal';

// Stack avec cartes empilées
const StackCards = ({ 
  cards = [],
  offset = '-translate-y-2',
  rotation = 'rotate-1',
  maxVisible = 3,
  className = '',
  ...props 
}) => {
  const classes = [
    'stack',
    'relative',
    className
  ].filter(Boolean).join(' ');

  const visibleCards = cards.slice(0, maxVisible);

  return (
    <div className={classes} {...props}>
      {visibleCards.map((card, index) => {
        const cardClasses = [
          'card',
          'bg-base-100 shadow-xl',
          'absolute',
          index > 0 && offset,
          index === 1 && rotation,
          index === 2 && `-${rotation}`,
        ].filter(Boolean).join(' ');

        const style = {
          zIndex: maxVisible - index,
          transform: `translateY(${index * 8}px) translateX(${index * 4}px)`,
        };

        return (
          <div key={index} className={cardClasses} style={style}>
            {typeof card === 'string' ? (
              <div className="card-body">
                <p>{card}</p>
              </div>
            ) : (
              card
            )}
          </div>
        );
      })}
      {cards.length > maxVisible && (
        <div className="badge badge-secondary absolute -top-2 -right-2 z-10">
          +{cards.length - maxVisible}
        </div>
      )}
    </div>
  );
};

StackCards.displayName = 'StackCards';

// Stack avec images empilées
const StackImages = ({ 
  images = [],
  offset = '4',
  maxVisible = 3,
  size = 'w-20 h-20',
  className = '',
  ...props 
}) => {
  const classes = [
    'stack',
    'flex',
    className
  ].filter(Boolean).join(' ');

  const visibleImages = images.slice(0, maxVisible);

  return (
    <div className={classes} {...props}>
      {visibleImages.map((image, index) => {
        const imageClasses = [
          'avatar',
          index > 0 && `-ml-${offset}`,
          'border-2 border-white',
          'rounded-full'
        ].filter(Boolean).join(' ');

        return (
          <div key={index} className={imageClasses} style={{ zIndex: maxVisible - index }}>
            <div className={`${size} rounded-full`}>
              {typeof image === 'string' ? (
                <img src={image} alt={`Avatar ${index + 1}`} className="rounded-full" />
              ) : (
                image
              )}
            </div>
          </div>
        );
      })}
      {images.length > maxVisible && (
        <div className={`avatar -ml-${offset} placeholder`} style={{ zIndex: 0 }}>
          <div className={`${size} bg-neutral text-neutral-content rounded-full`}>
            <span className="text-xs">+{images.length - maxVisible}</span>
          </div>
        </div>
      )}
    </div>
  );
};

StackImages.displayName = 'StackImages';

// Stack avec badges empilés
const StackBadges = ({ 
  badges = [],
  direction = 'horizontal',
  spacing = 'gap-2',
  maxVisible = 5,
  className = '',
  ...props 
}) => {
  const classes = [
    'stack',
    'flex',
    direction === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
    spacing,
    className
  ].filter(Boolean).join(' ');

  const visibleBadges = badges.slice(0, maxVisible);

  return (
    <div className={classes} {...props}>
      {visibleBadges.map((badge, index) => {
        const badgeClasses = [
          'badge',
          badge.color || 'badge-primary',
          badge.size || 'badge-md'
        ].filter(Boolean).join(' ');

        return (
          <span key={index} className={badgeClasses}>
            {badge.text || badge}
          </span>
        );
      })}
      {badges.length > maxVisible && (
        <span className="badge badge-ghost">
          +{badges.length - maxVisible}
        </span>
      )}
    </div>
  );
};

StackBadges.displayName = 'StackBadges';

// Stack avec timeline
const StackTimeline = ({ 
  items = [],
  orientation = 'vertical',
  showConnector = true,
  className = '',
  ...props 
}) => {
  const classes = [
    'stack',
    orientation === 'vertical' ? 'flex flex-col' : 'flex flex-row',
    'relative',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {items.map((item, index) => (
        <div key={index} className="relative flex items-center">
          {/* Point de timeline */}
          <div className={`
            w-4 h-4 rounded-full 
            ${item.color || 'bg-primary'}
            border-2 border-white shadow-lg
            ${orientation === 'vertical' ? 'mr-4' : 'mb-4'}
            z-10 relative
          `}></div>

          {/* Connecteur */}
          {showConnector && index < items.length - 1 && (
            <div className={`
              absolute 
              ${orientation === 'vertical' 
                ? 'left-2 top-4 w-0.5 h-8 -translate-x-0.5' 
                : 'top-2 left-4 h-0.5 w-8 -translate-y-0.5'
              }
              bg-base-300
            `}></div>
          )}

          {/* Contenu */}
          <div className={orientation === 'vertical' ? 'flex-1' : 'flex-1 ml-4'}>
            {item.title && (
              <h4 className="font-semibold text-base-content">{item.title}</h4>
            )}
            {item.description && (
              <p className="text-sm text-base-content/70">{item.description}</p>
            )}
            {item.date && (
              <time className="text-xs text-base-content/50">{item.date}</time>
            )}
            {item.content && (
              <div className="mt-2">{item.content}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

StackTimeline.displayName = 'StackTimeline';

// Stack avec tabs empilés
const StackTabs = ({ 
  tabs = [],
  activeTab = 0,
  onTabChange,
  orientation = 'vertical',
  className = '',
  ...props 
}) => {
  const classes = [
    'stack',
    orientation === 'vertical' ? 'flex-col' : 'flex-row',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {/* Tab Headers */}
      <div className={`tabs ${orientation === 'vertical' ? 'tabs-lifted flex-col' : 'tabs-boxed'}`}>
        {tabs.map((tab, index) => (
          <a
            key={index}
            className={`tab ${index === activeTab ? 'tab-active' : ''}`}
            onClick={() => onTabChange?.(index)}
          >
            {tab.label}
          </a>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs[activeTab] && (
          <div className="p-4 bg-base-200 rounded-lg">
            {tabs[activeTab].content}
          </div>
        )}
      </div>
    </div>
  );
};

StackTabs.displayName = 'StackTabs';

// Stack avec accordéon
const StackAccordion = ({ 
  items = [],
  allowMultiple = false,
  defaultOpen = [],
  className = '',
  ...props 
}) => {
  const [openItems, setOpenItems] = React.useState(new Set(defaultOpen));

  const toggleItem = (index) => {
    if (allowMultiple) {
      const newOpenItems = new Set(openItems);
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
      setOpenItems(newOpenItems);
    } else {
      setOpenItems(openItems.has(index) ? new Set() : new Set([index]));
    }
  };

  const classes = [
    'stack',
    'flex flex-col gap-2',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        
        return (
          <div key={index} className="collapse collapse-plus bg-base-200">
            <input
              type="checkbox"
              checked={isOpen}
              onChange={() => toggleItem(index)}
            />
            <div className="collapse-title text-xl font-medium">
              {item.title}
            </div>
            <div className="collapse-content">
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

StackAccordion.displayName = 'StackAccordion';

// Stack avec liste ordonnée
const StackList = ({ 
  items = [],
  ordered = false,
  spacing = 'gap-2',
  marker = 'disc',
  className = '',
  ...props 
}) => {
  const classes = [
    'stack',
    'flex flex-col',
    spacing,
    className
  ].filter(Boolean).join(' ');

  const Tag = ordered ? 'ol' : 'ul';
  const listClasses = ordered ? 'list-decimal list-inside' : `list-${marker} list-inside`;

  return (
    <Tag className={`${classes} ${listClasses}`} {...props}>
      {items.map((item, index) => (
        <li key={index} className="text-base-content">
          {typeof item === 'string' ? item : item.content}
          {item.subItems && (
            <StackList 
              items={item.subItems} 
              ordered={ordered}
              spacing="gap-1"
              className="ml-4 mt-1"
            />
          )}
        </li>
      ))}
    </Tag>
  );
};

StackList.displayName = 'StackList';

// PropTypes
Stack.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

StackTemplate.propTypes = {
  children: PropTypes.node,
  spacing: PropTypes.string,
  direction: PropTypes.string,
  alignment: PropTypes.string,
  className: PropTypes.string,
};

StackVertical.propTypes = {
  children: PropTypes.node,
  spacing: PropTypes.string,
  alignment: PropTypes.string,
  className: PropTypes.string,
};

StackHorizontal.propTypes = {
  children: PropTypes.node,
  spacing: PropTypes.string,
  alignment: PropTypes.string,
  className: PropTypes.string,
};

StackCards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
  offset: PropTypes.string,
  rotation: PropTypes.string,
  maxVisible: PropTypes.number,
  className: PropTypes.string,
};

StackImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
  offset: PropTypes.string,
  maxVisible: PropTypes.number,
  size: PropTypes.string,
  className: PropTypes.string,
};

StackBadges.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      color: PropTypes.string,
      size: PropTypes.string,
    })
  ])),
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  spacing: PropTypes.string,
  maxVisible: PropTypes.number,
  className: PropTypes.string,
};

StackTimeline.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.node,
    color: PropTypes.string,
  })),
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  showConnector: PropTypes.bool,
  className: PropTypes.string,
};

StackTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
  })),
  activeTab: PropTypes.number,
  onTabChange: PropTypes.func,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  className: PropTypes.string,
};

StackAccordion.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
  })),
  allowMultiple: PropTypes.bool,
  defaultOpen: PropTypes.arrayOf(PropTypes.number),
  className: PropTypes.string,
};

StackList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      content: PropTypes.node.isRequired,
      subItems: PropTypes.array,
    })
  ])),
  ordered: PropTypes.bool,
  spacing: PropTypes.string,
  marker: PropTypes.oneOf(['disc', 'circle', 'square', 'none']),
  className: PropTypes.string,
};

// Attacher les sous-composants au composant principal
Stack.Template = StackTemplate;
Stack.Vertical = StackVertical;
Stack.Horizontal = StackHorizontal;
Stack.Cards = StackCards;
Stack.Images = StackImages;
Stack.Badges = StackBadges;
Stack.Timeline = StackTimeline;
Stack.Tabs = StackTabs;
Stack.Accordion = StackAccordion;
Stack.List = StackList;

// Exports
export default Stack;
export {
  Stack,
  StackTemplate,
  StackVertical,
  StackHorizontal,
  StackCards,
  StackImages,
  StackBadges,
  StackTimeline,
  StackTabs,
  StackAccordion,
  StackList,
}; 