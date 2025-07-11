import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Loading DaisyUI
 * https://daisyui.com/components/loading/
 */
const Loading = forwardRef(({
  variant = 'spinner',
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const classes = [
    'loading',
    `loading-${variant}`,
    size !== 'md' && `loading-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span ref={ref} className={classes} {...props}></span>
  );
});

Loading.displayName = 'Loading';

// Loading avec texte
const LoadingWithText = ({
  text = 'Chargement...',
  variant = 'spinner',
  size = 'md',
  position = 'right',
  className = '',
  ...props
}) => {
  const loadingClasses = [
    'loading',
    `loading-${variant}`,
    size !== 'md' && `loading-${size}`,
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'flex items-center gap-2',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      {position === 'left' && <span className={loadingClasses}></span>}
      {text && <span className="text-sm">{text}</span>}
      {position === 'right' && <span className={loadingClasses}></span>}
    </div>
  );
};

LoadingWithText.displayName = 'LoadingWithText';

// Loading Button
const LoadingButton = forwardRef(({
  children,
  loading = false,
  isLoading, // Support both props
  loadingText = 'Chargement...',
  variant = 'primary',
  size = 'md',
  disabled,
  className = '',
  ...props
}, ref) => {
  // Use isLoading if provided, otherwise use loading
  const isLoadingState = isLoading !== undefined ? isLoading : loading;
  
  const classes = [
    'btn',
    `btn-${variant}`,
    size !== 'md' && `btn-${size}`,
    isLoadingState && 'loading',
    className
  ].filter(Boolean).join(' ');

  // Remove React-specific props before passing to DOM
  const { isLoading: _, loading: __, loadingText: ___, ...domProps } = props;

  return (
    <button
      ref={ref}
      className={classes}
      disabled={isLoadingState || disabled}
      {...domProps}
    >
      {isLoadingState ? loadingText : children}
    </button>
  );
});

LoadingButton.displayName = 'LoadingButton';

// Loading Card
const LoadingCard = ({
  title,
  description,
  loading = true,
  isLoading, // Extract isLoading to avoid DOM warning
  variant = 'spinner',
  size = 'md',
  className = '',
  ...props
}) => {
  // Use isLoading if provided, otherwise use loading
  const isLoadingState = isLoading !== undefined ? isLoading : loading;
  
  const cardClasses = [
    'card bg-base-100 shadow-xl',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      <div className="card-body items-center text-center">
        {isLoadingState && (
          <Loading variant={variant} size={size} />
        )}
        {title && <h2 className="card-title">{title}</h2>}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

LoadingCard.displayName = 'LoadingCard';

// Loading Overlay
const LoadingOverlay = ({
  loading = true,
  isLoading, // Extract isLoading to avoid DOM warning
  text = 'Chargement...',
  variant = 'spinner',
  size = 'lg',
  backdrop = true,
  className = '',
  children,
  ...props
}) => {
  // Use isLoading if provided, otherwise use loading
  const isLoadingState = isLoading !== undefined ? isLoading : loading;
  
  if (!isLoadingState) return children;

  const overlayClasses = [
    'fixed inset-0 flex items-center justify-center z-50',
    backdrop && 'bg-neutral bg-opacity-50',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={overlayClasses} {...props}>
      <div className="bg-base-100 p-8 rounded-lg shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <Loading variant={variant} size={size} />
          {text && <p className="text-lg">{text}</p>}
        </div>
      </div>
    </div>
  );
};

LoadingOverlay.displayName = 'LoadingOverlay';

// Loading Progress
const LoadingProgress = ({
  progress = 0,
  text,
  variant = 'primary',
  size = 'md',
  showPercentage = true,
  className = '',
  ...props
}) => {
  const progressClasses = [
    'progress',
    `progress-${variant}`,
    size !== 'md' && `progress-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-2" {...props}>
      {text && <p className="text-sm">{text}</p>}
      <div className="flex items-center gap-2">
        <progress
          className={progressClasses}
          value={progress}
          max="100"
        ></progress>
        {showPercentage && (
          <span className="text-sm font-medium w-12 text-right">
            {progress}%
          </span>
        )}
      </div>
    </div>
  );
};

LoadingProgress.displayName = 'LoadingProgress';

// Loading Dots
const LoadingDots = ({
  size = 'md',
  variant = 'primary',
  className = '',
  ...props
}) => {
  const dotClasses = [
    'loading loading-dots',
    size !== 'md' && `loading-${size}`,
    `text-${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={dotClasses} {...props}></span>
  );
};

LoadingDots.displayName = 'LoadingDots';

// Loading Ring
const LoadingRing = ({
  size = 'md',
  variant = 'primary',
  className = '',
  ...props
}) => {
  const ringClasses = [
    'loading loading-ring',
    size !== 'md' && `loading-${size}`,
    `text-${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={ringClasses} {...props}></span>
  );
};

LoadingRing.displayName = 'LoadingRing';

// Loading Ball
const LoadingBall = ({
  size = 'md',
  variant = 'primary',
  className = '',
  ...props
}) => {
  const ballClasses = [
    'loading loading-ball',
    size !== 'md' && `loading-${size}`,
    `text-${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={ballClasses} {...props}></span>
  );
};

LoadingBall.displayName = 'LoadingBall';

// Loading Bars
const LoadingBars = ({
  size = 'md',
  variant = 'primary',
  className = '',
  ...props
}) => {
  const barsClasses = [
    'loading loading-bars',
    size !== 'md' && `loading-${size}`,
    `text-${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={barsClasses} {...props}></span>
  );
};

LoadingBars.displayName = 'LoadingBars';

// Loading Infinity
const LoadingInfinity = ({
  size = 'md',
  variant = 'primary',
  className = '',
  ...props
}) => {
  const infinityClasses = [
    'loading loading-infinity',
    size !== 'md' && `loading-${size}`,
    `text-${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={infinityClasses} {...props}></span>
  );
};

LoadingInfinity.displayName = 'LoadingInfinity';

// Loading Screen
const LoadingScreen = ({
  title = 'Chargement...',
  description,
  variant = 'spinner',
  size = 'lg',
  logo,
  className = '',
  ...props
}) => {
  const screenClasses = [
    'fixed inset-0 flex flex-col items-center justify-center bg-base-100',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={screenClasses} {...props}>
      {logo && <div className="mb-8">{logo}</div>}
      <Loading variant={variant} size={size} />
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {description && <p className="text-base-content/70">{description}</p>}
      </div>
    </div>
  );
};

LoadingScreen.displayName = 'LoadingScreen';

// Loading Table
const LoadingTable = ({
  rows = 5,
  columns = 3,
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
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index}>
                <div className="h-4 bg-base-300 rounded animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex}>
                  <div className="h-4 bg-base-300 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

LoadingTable.displayName = 'LoadingTable';

// Loading States
const LoadingStates = ({
  loading = true,
  error = false,
  empty = false,
  loadingComponent,
  errorComponent,
  emptyComponent,
  children,
  ...props
}) => {
  if (loading) {
    return loadingComponent || <Loading variant="spinner" size="lg" />;
  }

  if (error) {
    return errorComponent || (
      <div className="text-center py-8">
        <p className="text-error">Une erreur est survenue</p>
      </div>
    );
  }

  if (empty) {
    return emptyComponent || (
      <div className="text-center py-8">
        <p className="text-base-content/70">Aucune donnée disponible</p>
      </div>
    );
  }

  return children;
};

LoadingStates.displayName = 'LoadingStates';

// Loading variants par taille
const LoadingXS = ({ className = '', ...props }) => (
  <Loading size="xs" className={className} {...props} />
);

const LoadingSM = ({ className = '', ...props }) => (
  <Loading size="sm" className={className} {...props} />
);

const LoadingMD = ({ className = '', ...props }) => (
  <Loading size="md" className={className} {...props} />
);

const LoadingLG = ({ className = '', ...props }) => (
  <Loading size="lg" className={className} {...props} />
);

const LoadingXL = ({ className = '', ...props }) => (
  <Loading size="xl" className={className} {...props} />
);

// PropTypes
Loading.propTypes = {
  variant: PropTypes.oneOf(['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

LoadingWithText.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  position: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
};

LoadingButton.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'ghost', 'link', 'info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

LoadingCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  loading: PropTypes.bool,
  isLoading: PropTypes.bool,
  variant: PropTypes.oneOf(['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

LoadingOverlay.propTypes = {
  loading: PropTypes.bool,
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  variant: PropTypes.oneOf(['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  backdrop: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

LoadingProgress.propTypes = {
  progress: PropTypes.number,
  text: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  showPercentage: PropTypes.bool,
  className: PropTypes.string,
};

LoadingDots.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']),
  className: PropTypes.string,
};

LoadingRing.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']),
  className: PropTypes.string,
};

LoadingBall.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']),
  className: PropTypes.string,
};

LoadingBars.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']),
  className: PropTypes.string,
};

LoadingInfinity.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error']),
  className: PropTypes.string,
};

LoadingScreen.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  variant: PropTypes.oneOf(['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  logo: PropTypes.node,
  className: PropTypes.string,
};

LoadingTable.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
  className: PropTypes.string,
};

LoadingStates.propTypes = {
  loading: PropTypes.bool,
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  empty: PropTypes.bool,
  loadingComponent: PropTypes.node,
  errorComponent: PropTypes.node,
  emptyComponent: PropTypes.node,
  children: PropTypes.node,
};

LoadingXS.propTypes = {
  className: PropTypes.string,
};

LoadingSM.propTypes = {
  className: PropTypes.string,
};

LoadingMD.propTypes = {
  className: PropTypes.string,
};

LoadingLG.propTypes = {
  className: PropTypes.string,
};

LoadingXL.propTypes = {
  className: PropTypes.string,
};

// Attacher les noms d'affichage
LoadingXS.displayName = 'LoadingXS';
LoadingSM.displayName = 'LoadingSM';
LoadingMD.displayName = 'LoadingMD';
LoadingLG.displayName = 'LoadingLG';
LoadingXL.displayName = 'LoadingXL';

// Export des sous-composants
Loading.WithText = LoadingWithText;
Loading.Button = LoadingButton;
Loading.Card = LoadingCard;
Loading.Overlay = LoadingOverlay;
Loading.Progress = LoadingProgress;
Loading.Dots = LoadingDots;
Loading.Ring = LoadingRing;
Loading.Ball = LoadingBall;
Loading.Bars = LoadingBars;
Loading.Infinity = LoadingInfinity;
Loading.Screen = LoadingScreen;
Loading.Table = LoadingTable;
Loading.States = LoadingStates;
Loading.XS = LoadingXS;
Loading.SM = LoadingSM;
Loading.MD = LoadingMD;
Loading.LG = LoadingLG;
Loading.XL = LoadingXL;

export default Loading; 