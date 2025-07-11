import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Skeleton DaisyUI
 * https://daisyui.com/components/skeleton/
 */
const Skeleton = forwardRef(({
  className = '',
  width,
  height,
  circle = false,
  ...props
}, ref) => {
  const classes = [
    'skeleton',
    circle && 'rounded-full',
    !circle && 'rounded',
    className
  ].filter(Boolean).join(' ');

  const style = {
    ...(width && { width }),
    ...(height && { height }),
    ...props.style
  };

  return (
    <div
      ref={ref}
      className={classes}
      style={style}
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';

// Skeleton Text
const SkeletonText = ({
  lines = 3,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height="1rem"
          width={
            index === lines - 1 ? '75%' : // Dernière ligne plus courte
            Math.random() > 0.5 ? '100%' : `${80 + Math.random() * 20}%`
          }
        />
      ))}
    </div>
  );
};

SkeletonText.displayName = 'SkeletonText';

// Skeleton Avatar
const SkeletonAvatar = ({
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <Skeleton
      circle
      className={`${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
};

SkeletonAvatar.displayName = 'SkeletonAvatar';

// Skeleton Card
const SkeletonCard = ({
  showImage = true,
  showTitle = true,
  showDescription = true,
  showActions = true,
  className = '',
  ...props
}) => {
  const cardClasses = [
    'card bg-base-200 shadow-xl',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {showImage && (
        <figure>
          <Skeleton height="12rem" className="w-full" />
        </figure>
      )}
      <div className="card-body">
        {showTitle && (
          <Skeleton height="1.5rem" width="60%" className="mb-2" />
        )}
        {showDescription && (
          <SkeletonText lines={2} className="mb-4" />
        )}
        {showActions && (
          <div className="card-actions justify-end">
            <Skeleton height="2.5rem" width="5rem" />
            <Skeleton height="2.5rem" width="5rem" />
          </div>
        )}
      </div>
    </div>
  );
};

SkeletonCard.displayName = 'SkeletonCard';

// Skeleton Table
const SkeletonTable = ({
  rows = 5,
  columns = 4,
  showHeader = true,
  className = '',
  ...props
}) => {
  const tableClasses = [
    'table w-full',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="overflow-x-auto" {...props}>
      <table className={tableClasses}>
        {showHeader && (
          <thead>
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index}>
                  <Skeleton height="1rem" width="80%" />
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex}>
                  <Skeleton height="1rem" width="70%" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

SkeletonTable.displayName = 'SkeletonTable';

// Skeleton List
const SkeletonList = ({
  items = 5,
  showAvatar = true,
  showSecondaryText = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center gap-3">
          {showAvatar && (
            <SkeletonAvatar size="md" />
          )}
          <div className="flex-1">
            <Skeleton height="1rem" width="40%" className="mb-2" />
            {showSecondaryText && (
              <Skeleton height="0.75rem" width="60%" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

SkeletonList.displayName = 'SkeletonList';

// Skeleton Form
const SkeletonForm = ({
  fields = 4,
  showButton = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="form-control">
          <Skeleton height="1rem" width="25%" className="mb-2" />
          <Skeleton height="3rem" width="100%" />
        </div>
      ))}
      {showButton && (
        <div className="form-control mt-6">
          <Skeleton height="3rem" width="8rem" />
        </div>
      )}
    </div>
  );
};

SkeletonForm.displayName = 'SkeletonForm';

// Skeleton User Profile
const SkeletonUserProfile = ({
  showBio = true,
  showStats = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`card bg-base-200 shadow-xl ${className}`} {...props}>
      <div className="card-body items-center text-center">
        <SkeletonAvatar size="xl" className="mb-4" />
        <Skeleton height="1.5rem" width="50%" className="mb-2" />
        <Skeleton height="1rem" width="30%" className="mb-4" />
        
        {showBio && (
          <div className="w-full mb-4">
            <SkeletonText lines={3} />
          </div>
        )}
        
        {showStats && (
          <div className="stats shadow">
            <div className="stat">
              <Skeleton height="1rem" width="60%" className="mb-2" />
              <Skeleton height="1.5rem" width="40%" />
            </div>
            <div className="stat">
              <Skeleton height="1rem" width="60%" className="mb-2" />
              <Skeleton height="1.5rem" width="40%" />
            </div>
            <div className="stat">
              <Skeleton height="1rem" width="60%" className="mb-2" />
              <Skeleton height="1.5rem" width="40%" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SkeletonUserProfile.displayName = 'SkeletonUserProfile';

// Skeleton Gallery
const SkeletonGallery = ({
  items = 8,
  columns = 4,
  className = '',
  ...props
}) => {
  const gridClasses = [
    'grid gap-4',
    columns === 2 ? 'grid-cols-2' :
    columns === 3 ? 'grid-cols-3' :
    columns === 4 ? 'grid-cols-4' :
    columns === 5 ? 'grid-cols-5' :
    columns === 6 ? 'grid-cols-6' :
    'grid-cols-4',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={gridClasses} {...props}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="aspect-square">
          <Skeleton height="100%" width="100%" />
        </div>
      ))}
    </div>
  );
};

SkeletonGallery.displayName = 'SkeletonGallery';

// Skeleton Article
const SkeletonArticle = ({
  showImage = true,
  showMeta = true,
  showTags = true,
  className = '',
  ...props
}) => {
  return (
    <article className={`space-y-4 ${className}`} {...props}>
      {showImage && (
        <Skeleton height="12rem" width="100%" className="mb-4" />
      )}
      
      <Skeleton height="2rem" width="80%" className="mb-2" />
      
      {showMeta && (
        <div className="flex items-center gap-4 mb-4">
          <SkeletonAvatar size="sm" />
          <div>
            <Skeleton height="0.875rem" width="6rem" className="mb-1" />
            <Skeleton height="0.75rem" width="4rem" />
          </div>
        </div>
      )}
      
      <SkeletonText lines={4} className="mb-4" />
      
      {showTags && (
        <div className="flex gap-2">
          <Skeleton height="1.5rem" width="4rem" />
          <Skeleton height="1.5rem" width="3rem" />
          <Skeleton height="1.5rem" width="5rem" />
        </div>
      )}
    </article>
  );
};

SkeletonArticle.displayName = 'SkeletonArticle';

// Skeleton Chat
const SkeletonChat = ({
  messages = 5,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {Array.from({ length: messages }).map((_, index) => {
        const isOwnMessage = index % 2 === 0;
        return (
          <div
            key={index}
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end gap-2 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
              {!isOwnMessage && <SkeletonAvatar size="sm" />}
              <div className="max-w-xs">
                <Skeleton
                  height="2.5rem"
                  width={`${60 + Math.random() * 40}%`}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

SkeletonChat.displayName = 'SkeletonChat';

// Skeleton Dashboard
const SkeletonDashboard = ({
  showHeader = true,
  showStats = true,
  showCharts = true,
  showTable = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-6 ${className}`} {...props}>
      {showHeader && (
        <div className="flex items-center justify-between">
          <div>
            <Skeleton height="2rem" width="12rem" className="mb-2" />
            <Skeleton height="1rem" width="8rem" />
          </div>
          <Skeleton height="2.5rem" width="6rem" />
        </div>
      )}
      
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="stat bg-base-200 rounded-lg shadow">
              <div className="stat-figure text-secondary">
                <Skeleton circle className="w-8 h-8" />
              </div>
              <Skeleton height="1rem" width="60%" className="mb-2" />
              <Skeleton height="1.5rem" width="40%" />
            </div>
          ))}
        </div>
      )}
      
      {showCharts && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <Skeleton height="1.5rem" width="40%" className="mb-4" />
              <Skeleton height="12rem" width="100%" />
            </div>
          </div>
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <Skeleton height="1.5rem" width="40%" className="mb-4" />
              <Skeleton height="12rem" width="100%" />
            </div>
          </div>
        </div>
      )}
      
      {showTable && (
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <Skeleton height="1.5rem" width="30%" className="mb-4" />
            <SkeletonTable rows={5} columns={4} />
          </div>
        </div>
      )}
    </div>
  );
};

SkeletonDashboard.displayName = 'SkeletonDashboard';

// Skeleton variants par taille
const SkeletonXS = ({ className = '', ...props }) => (
  <Skeleton height="0.75rem" className={className} {...props} />
);

const SkeletonSM = ({ className = '', ...props }) => (
  <Skeleton height="1rem" className={className} {...props} />
);

const SkeletonMD = ({ className = '', ...props }) => (
  <Skeleton height="1.25rem" className={className} {...props} />
);

const SkeletonLG = ({ className = '', ...props }) => (
  <Skeleton height="1.5rem" className={className} {...props} />
);

const SkeletonXL = ({ className = '', ...props }) => (
  <Skeleton height="2rem" className={className} {...props} />
);

// PropTypes
Skeleton.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  circle: PropTypes.bool,
};

SkeletonText.propTypes = {
  lines: PropTypes.number,
  className: PropTypes.string,
};

SkeletonAvatar.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

SkeletonCard.propTypes = {
  showImage: PropTypes.bool,
  showTitle: PropTypes.bool,
  showDescription: PropTypes.bool,
  showActions: PropTypes.bool,
  className: PropTypes.string,
};

SkeletonTable.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
  showHeader: PropTypes.bool,
  className: PropTypes.string,
};

SkeletonList.propTypes = {
  items: PropTypes.number,
  showAvatar: PropTypes.bool,
  showSecondaryText: PropTypes.bool,
  className: PropTypes.string,
};

SkeletonForm.propTypes = {
  fields: PropTypes.number,
  showButton: PropTypes.bool,
  className: PropTypes.string,
};

SkeletonUserProfile.propTypes = {
  showBio: PropTypes.bool,
  showStats: PropTypes.bool,
  className: PropTypes.string,
};

SkeletonGallery.propTypes = {
  items: PropTypes.number,
  columns: PropTypes.number,
  className: PropTypes.string,
};

SkeletonArticle.propTypes = {
  showImage: PropTypes.bool,
  showMeta: PropTypes.bool,
  showTags: PropTypes.bool,
  className: PropTypes.string,
};

SkeletonChat.propTypes = {
  messages: PropTypes.number,
  className: PropTypes.string,
};

SkeletonDashboard.propTypes = {
  showHeader: PropTypes.bool,
  showStats: PropTypes.bool,
  showCharts: PropTypes.bool,
  showTable: PropTypes.bool,
  className: PropTypes.string,
};

SkeletonXS.propTypes = {
  className: PropTypes.string,
};

SkeletonSM.propTypes = {
  className: PropTypes.string,
};

SkeletonMD.propTypes = {
  className: PropTypes.string,
};

SkeletonLG.propTypes = {
  className: PropTypes.string,
};

SkeletonXL.propTypes = {
  className: PropTypes.string,
};

// Attacher les noms d'affichage
SkeletonXS.displayName = 'SkeletonXS';
SkeletonSM.displayName = 'SkeletonSM';
SkeletonMD.displayName = 'SkeletonMD';
SkeletonLG.displayName = 'SkeletonLG';
SkeletonXL.displayName = 'SkeletonXL';

// Export des sous-composants
Skeleton.Text = SkeletonText;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Card = SkeletonCard;
Skeleton.Table = SkeletonTable;
Skeleton.List = SkeletonList;
Skeleton.Form = SkeletonForm;
Skeleton.UserProfile = SkeletonUserProfile;
Skeleton.Gallery = SkeletonGallery;
Skeleton.Article = SkeletonArticle;
Skeleton.Chat = SkeletonChat;
Skeleton.Dashboard = SkeletonDashboard;
Skeleton.XS = SkeletonXS;
Skeleton.SM = SkeletonSM;
Skeleton.MD = SkeletonMD;
Skeleton.LG = SkeletonLG;
Skeleton.XL = SkeletonXL;

export default Skeleton; 