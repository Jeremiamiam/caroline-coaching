import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Pagination DaisyUI
 * https://daisyui.com/components/pagination/
 */
const Pagination = forwardRef(({
  children,
  className = '',
  size = 'md',
  ...props
}, ref) => {
  const sizeClasses = {
    xs: 'join-xs',
    sm: 'join-sm',
    md: 'join-md',
    lg: 'join-lg',
    xl: 'join-xl',
  };

  const classes = [
    'join',
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Pagination.displayName = 'Pagination';

// Pagination Button
const PaginationButton = forwardRef(({
  children,
  className = '',
  active = false,
  disabled = false,
  onClick,
  ...props
}, ref) => {
  const classes = [
    'join-item',
    'btn',
    active && 'btn-active',
    disabled && 'btn-disabled',
    className
  ].filter(Boolean).join(' ');

  return (
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
});

PaginationButton.displayName = 'PaginationButton';

// Pagination avec input
const PaginationInput = forwardRef(({
  value,
  onChange,
  className = '',
  ...props
}, ref) => {
  const classes = [
    'join-item',
    'btn',
    'btn-square',
    className
  ].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      className={classes}
      type="number"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
});

PaginationInput.displayName = 'PaginationInput';

// Pagination avec tailles
const PaginationXS = forwardRef(({ className = '', currentPage, totalPages, onPageChange, siblingCount, showFirstLast, showPrevNext, disabled, ...props }, ref) => (
  <Pagination
    ref={ref}
    size="xs"
    className={className}
    {...props}
  />
));

const PaginationSM = forwardRef(({ className = '', currentPage, totalPages, onPageChange, siblingCount, showFirstLast, showPrevNext, disabled, ...props }, ref) => (
  <Pagination
    ref={ref}
    size="sm"
    className={className}
    {...props}
  />
));

const PaginationLG = forwardRef(({ className = '', currentPage, totalPages, onPageChange, siblingCount, showFirstLast, showPrevNext, disabled, ...props }, ref) => (
  <Pagination
    ref={ref}
    size="lg"
    className={className}
    {...props}
  />
));

const PaginationXL = forwardRef(({ className = '', currentPage, totalPages, onPageChange, siblingCount, showFirstLast, showPrevNext, disabled, ...props }, ref) => (
  <Pagination
    ref={ref}
    size="xl"
    className={className}
    {...props}
  />
));

// Pagination Template - Configuration complète
const PaginationTemplate = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  showPrevNext = true,
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const pageNumbers = useMemo(() => {
    const delta = siblingCount;
    const range = [];
    const rangeWithDots = [];

    // Calculer les pages à afficher
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Ajouter la première page
    if (showFirstLast) {
      rangeWithDots.push(1);
    }

    // Ajouter les points de suspension avant
    if (currentPage - delta > 2) {
      rangeWithDots.push('...');
    }

    // Ajouter les pages du milieu
    range.forEach(page => {
      rangeWithDots.push(page);
    });

    // Ajouter les points de suspension après
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...');
    }

    // Ajouter la dernière page
    if (showFirstLast && totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((item, index, array) => {
      // Éviter les doublons
      return item !== array[index - 1];
    });
  }, [currentPage, totalPages, siblingCount, showFirstLast]);

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages && !disabled) {
      onPageChange?.(page);
    }
  };

  return (
    <Pagination size={size} className={className} {...props}>
      {/* Bouton Précédent */}
      {showPrevNext && (
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
        >
          «
        </PaginationButton>
      )}

      {/* Pages */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <PaginationButton key={`dots-${index}`} disabled>
              ...
            </PaginationButton>
          );
        }

        return (
          <PaginationButton
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
            disabled={disabled}
          >
            {page}
          </PaginationButton>
        );
      })}

      {/* Bouton Suivant */}
      {showPrevNext && (
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
        >
          »
        </PaginationButton>
      )}
    </Pagination>
  );
};

PaginationTemplate.displayName = 'PaginationTemplate';

// Pagination simple avec prev/next
const PaginationSimple = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showPageNumbers = true,
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages && !disabled) {
      onPageChange?.(page);
    }
  };

  return (
    <Pagination size={size} className={className} {...props}>
      {/* Bouton Précédent */}
      <PaginationButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
      >
        ← Précédent
      </PaginationButton>

      {/* Numéros de page */}
      {showPageNumbers && (
        <PaginationButton disabled>
          Page {currentPage} sur {totalPages}
        </PaginationButton>
      )}

      {/* Bouton Suivant */}
      <PaginationButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
      >
        Suivant →
      </PaginationButton>
    </Pagination>
  );
};

PaginationSimple.displayName = 'PaginationSimple';

// Pagination avec input pour aller à une page
const PaginationWithInput = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const handleInputChange = (e) => {
    const page = parseInt(e.target.value, 10);
    if (page >= 1 && page <= totalPages && !disabled) {
      onPageChange?.(page);
    }
  };

  return (
    <Pagination size={size} className={className} {...props}>
      <PaginationButton
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={disabled || currentPage === 1}
      >
        «
      </PaginationButton>

      <PaginationInput
        value={currentPage}
        onChange={handleInputChange}
        disabled={disabled}
        min={1}
        max={totalPages}
      />

      <PaginationButton
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
      >
        »
      </PaginationButton>
    </Pagination>
  );
};

PaginationWithInput.displayName = 'PaginationWithInput';

// Pagination avec informations
const PaginationWithInfo = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  size = 'md',
  className = '',
  ...props
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-base-content/70">
        Affichage de {startItem} à {endItem} sur {totalItems} résultats
      </div>
      
      <PaginationTemplate
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        size={size}
        className={className}
        {...props}
      />
    </div>
  );
};

PaginationWithInfo.displayName = 'PaginationWithInfo';

// Pagination responsive
const PaginationResponsive = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      {/* Version mobile : simple */}
      <div className="sm:hidden">
        <PaginationSimple
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          size="sm"
          className={className}
          {...props}
        />
      </div>

      {/* Version desktop : complète */}
      <div className="hidden sm:block">
        <PaginationTemplate
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className={className}
          {...props}
        />
      </div>
    </div>
  );
};

PaginationResponsive.displayName = 'PaginationResponsive';

// PropTypes
Pagination.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

PaginationButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

PaginationInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

PaginationTemplate.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  siblingCount: PropTypes.number,
  showFirstLast: PropTypes.bool,
  showPrevNext: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

PaginationSimple.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  showPageNumbers: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

PaginationWithInput.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

PaginationWithInfo.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

PaginationResponsive.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  className: PropTypes.string,
};

// Attacher les noms d'affichage
PaginationXS.displayName = 'PaginationXS';
PaginationSM.displayName = 'PaginationSM';
PaginationLG.displayName = 'PaginationLG';
PaginationXL.displayName = 'PaginationXL';

// Export des sous-composants
Pagination.Button = PaginationButton;
Pagination.Input = PaginationInput;
Pagination.XS = PaginationXS;
Pagination.SM = PaginationSM;
Pagination.LG = PaginationLG;
Pagination.XL = PaginationXL;
Pagination.Template = PaginationTemplate;
Pagination.Simple = PaginationSimple;
Pagination.WithInput = PaginationWithInput;
Pagination.WithInfo = PaginationWithInfo;
Pagination.Responsive = PaginationResponsive;

export default Pagination; 