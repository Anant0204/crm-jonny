import React from 'react';
import { EmptyState } from './EmptyState';
import { cx } from '../../utils/classNames';

export const Table = ({ children, className = '', style = {} }) => (
  <div
    className="table-container"
    style={{
      width: '100%',
      overflowX: 'auto',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      backgroundColor: 'var(--surface)',
      boxShadow: 'var(--shadow-card)',
      ...style,
    }}
  >
    <table
      className={cx('table', className)}
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
        fontSize: 'var(--text-sm)',
      }}
    >
      {children}
    </table>
  </div>
);

export const TableHeader = ({ children }) => (
  <thead
    style={{
      backgroundColor: 'var(--surface-secondary)',
      borderBottom: '1px solid var(--border)',
    }}
  >
    {children}
  </thead>
);

export const TableBody = ({ children, emptyMessage = 'No record data found.', isEmpty = false, colSpan = 5 }) => {
  if (isEmpty) {
    return (
      <tbody>
        <tr>
          <td colSpan={colSpan} style={{ padding: '2.5rem 1rem' }}>
            <EmptyState title="No Data Available" description={emptyMessage} />
          </td>
        </tr>
      </tbody>
    );
  }
  return <tbody>{children}</tbody>;
};

export const TableRow = ({ children, onClick, className = '', style = {} }) => (
  <tr
    onClick={onClick}
    className={cx('hover:bg-surface-hover transition-colors', className)}
    style={{
      borderBottom: '1px solid var(--border)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background-color var(--transition-fast)',
      ...style,
    }}
  >
    {children}
  </tr>
);

export const TableCell = ({ children, isHeader = false, align = 'left', className = '', style = {} }) => {
  const Tag = isHeader ? 'th' : 'td';
  return (
    <Tag
      className={cx(className)}
      style={{
        textAlign: align,
        padding: isHeader ? '0.75rem 1rem' : '0.875rem 1rem',
        fontSize: isHeader ? '11.5px' : 'var(--text-xs)',
        fontWeight: isHeader ? 750 : 500,
        color: isHeader ? 'var(--text-secondary)' : 'var(--text-primary)',
        textTransform: isHeader ? 'uppercase' : 'none',
        letterSpacing: isHeader ? '0.04em' : 'normal',
        verticalAlign: 'middle',
        whiteSpace: isHeader ? 'nowrap' : 'normal',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
};
