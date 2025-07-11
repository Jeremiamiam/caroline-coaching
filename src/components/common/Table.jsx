import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant Table DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const Table = forwardRef(({
  children,
  className = '',
  
  // Variantes DaisyUI
  variant = 'default', // default, zebra, pin-rows, pin-cols, xs, sm, md, lg
  size = 'md', // xs, sm, md, lg
  
  // États spéciaux
  zebra = false,
  pinRows = false,
  pinCols = false,
  
  ...props
}, ref) => {
  // Classes de base
  const baseClasses = 'table';
  
  // Classes de variantes
  const variantClasses = {
    default: '',
    zebra: 'table-zebra',
    'pin-rows': 'table-pin-rows',
    'pin-cols': 'table-pin-cols'
  };
  
  // Classes de tailles
  const sizeClasses = {
    xs: 'table-xs',
    sm: 'table-sm',
    md: 'table-md',
    lg: 'table-lg'
  };
  
  // Classes d'état
  const stateClasses = {
    zebra: zebra ? 'table-zebra' : '',
    pinRows: pinRows ? 'table-pin-rows' : '',
    pinCols: pinCols ? 'table-pin-cols' : ''
  };
  
  // Assemblage final des classes
  const tableClasses = [
    baseClasses,
    variant !== 'default' ? variantClasses[variant] : '',
    sizeClasses[size],
    stateClasses.zebra,
    stateClasses.pinRows,
    stateClasses.pinCols,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="overflow-x-auto">
      <table
        ref={ref}
        className={tableClasses}
        {...props}
      >
        {children}
      </table>
    </div>
  );
});

Table.displayName = 'Table';

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'default', 'zebra', 'pin-rows', 'pin-cols'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  zebra: PropTypes.bool,
  pinRows: PropTypes.bool,
  pinCols: PropTypes.bool
};

// Composants de commodité pour prototypage ultra-rapide
Table.Zebra = (props) => <Table zebra {...props} />;
Table.PinRows = (props) => <Table pinRows {...props} />;
Table.PinCols = (props) => <Table pinCols {...props} />;

// Composants par taille
Table.XS = (props) => <Table size="xs" {...props} />;
Table.SM = (props) => <Table size="sm" {...props} />;
Table.LG = (props) => <Table size="lg" {...props} />;

/**
 * Composant TableHead pour l'en-tête
 */
const TableHead = ({ children, className = '', ...props }) => (
  <thead className={className} {...props}>
    {children}
  </thead>
);

TableHead.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Composant TableBody pour le corps
 */
const TableBody = ({ children, className = '', ...props }) => (
  <tbody className={className} {...props}>
    {children}
  </tbody>
);

TableBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Composant TableRow pour une ligne
 */
const TableRow = ({ 
  children, 
  className = '', 
  hover = false,
  active = false,
  disabled = false,
  onClick,
  ...props 
}) => {
  const stateClasses = {
    hover: hover ? 'hover' : '',
    active: active ? 'active' : '',
    disabled: disabled ? 'disabled' : '',
    clickable: onClick ? 'cursor-pointer' : ''
  };

  const rowClasses = [
    stateClasses.hover,
    stateClasses.active,
    stateClasses.disabled,
    stateClasses.clickable,
    className
  ].filter(Boolean).join(' ');

  return (
    <tr
      className={rowClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  );
};

TableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hover: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

/**
 * Composant TableCell pour une cellule
 */
const TableCell = ({ 
  children, 
  className = '', 
  header = false,
  align = 'left', // left, center, right
  ...props 
}) => {
  const Component = header ? 'th' : 'td';
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const cellClasses = [
    alignClasses[align],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      className={cellClasses}
      {...props}
    >
      {children}
    </Component>
  );
};

TableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  header: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right'])
};

/**
 * Composant TableTemplate pour créer des tableaux rapidement
 */
const TableTemplate = ({ 
  data = [], 
  columns = [],
  sortable = false,
  selectable = false,
  onRowClick,
  onSort,
  onSelect,
  className = '',
  ...tableProps 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedRows, setSelectedRows] = useState(new Set());

  const handleSort = (key) => {
    if (!sortable) return;
    
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    onSort && onSort(key, direction);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(data.map((_, index) => index)));
    } else {
      setSelectedRows(new Set());
    }
    onSelect && onSelect(checked ? data : []);
  };

  const handleSelectRow = (index, checked) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(index);
    } else {
      newSelectedRows.delete(index);
    }
    setSelectedRows(newSelectedRows);
    
    const selectedData = data.filter((_, i) => newSelectedRows.has(i));
    onSelect && onSelect(selectedData);
  };

  const getSortedData = () => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const sortedData = getSortedData();

  return (
    <Table className={className} {...tableProps}>
      <TableHead>
        <TableRow>
          {selectable && (
            <TableCell header>
              <input
                type="checkbox"
                className="checkbox"
                checked={selectedRows.size === data.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </TableCell>
          )}
          {columns.map((column, index) => (
            <TableCell
              key={column.key || index}
              header
              align={column.align}
              className={sortable && column.sortable !== false ? 'cursor-pointer select-none' : ''}
              onClick={() => column.sortable !== false && handleSort(column.key)}
            >
              <div className="flex items-center gap-2">
                {column.title}
                {sortable && column.sortable !== false && (
                  <span className="opacity-50">
                    {sortConfig.key === column.key ? (
                      sortConfig.direction === 'asc' ? '↑' : '↓'
                    ) : '↕'}
                  </span>
                )}
              </div>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedData.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            hover={!!onRowClick}
            onClick={() => onRowClick && onRowClick(row, rowIndex)}
          >
            {selectable && (
              <TableCell>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedRows.has(rowIndex)}
                  onChange={(e) => handleSelectRow(rowIndex, e.target.checked)}
                />
              </TableCell>
            )}
            {columns.map((column, colIndex) => (
              <TableCell
                key={column.key || colIndex}
                align={column.align}
              >
                {column.render 
                  ? column.render(row[column.key], row, rowIndex)
                  : row[column.key]
                }
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

TableTemplate.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    sortable: PropTypes.bool,
    render: PropTypes.func
  })),
  sortable: PropTypes.bool,
  selectable: PropTypes.bool,
  onRowClick: PropTypes.func,
  onSort: PropTypes.func,
  onSelect: PropTypes.func,
  className: PropTypes.string
};

// Attacher les sous-composants au composant Table
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Template = TableTemplate;

export default Table; 