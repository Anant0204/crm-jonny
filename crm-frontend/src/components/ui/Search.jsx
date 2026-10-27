import React from 'react';
import { Search as SearchIcon, X, Command } from 'lucide-react';
import { cx } from '../../utils/classNames';

export const Search = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search contacts, leads, accounts...',
  showShortcut = false,
  className = '',
}) => {
  return (
    <div className={cx('form-control-wrapper', className)} style={{ maxWidth: '360px' }}>
      <span className="input-icon-start">
        <SearchIcon size={16} />
      </span>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control form-control-has-icon-start form-control-has-icon-end"
      />

      {value ? (
        <button
          type="button"
          onClick={onClear}
          className="input-icon-end"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <X size={14} />
        </button>
      ) : showShortcut ? (
        <span
          className="input-icon-end"
          style={{
            fontSize: '10px',
            backgroundColor: 'var(--surface-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '2px 6px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <Command size={10} /> K
        </span>
      ) : null}
    </div>
  );
};
