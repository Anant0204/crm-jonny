import React, { useState, useRef } from 'react';
import { UploadCloud, File, Trash2 } from 'lucide-react';
import { Button } from './Button';
import { cx } from '../../utils/classNames';

export const FileUpload = ({
  label = 'Upload Documents',
  accept = '*',
  maxFiles = 5,
  onFilesSelected,
}) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      const updatedFiles = [...files, ...selectedFiles].slice(0, maxFiles);
      setFiles(updatedFiles);
      if (onFilesSelected) onFilesSelected(updatedFiles);
    }
  };

  const removeFile = (index) => {
    const updated = files.filter((_, idx) => idx !== index);
    setFiles(updated);
    if (onFilesSelected) onFilesSelected(updated);
  };

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}

      <div
        onClick={() => fileInputRef.current?.click()}
        className="flex flex-col items-center justify-center p-6 border-subtle rounded-md text-center cursor-pointer"
        style={{
          borderStyle: 'dashed',
          borderWidth: '2px',
          borderColor: 'var(--border-strong)',
          backgroundColor: 'var(--surface-secondary)',
          transition: 'border-color var(--transition-fast)',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <UploadCloud size={32} className="text-tertiary" style={{ marginBottom: '0.5rem' }} />
        <p className="text-xs font-semibold text-primary mb-1">
          Click to upload <span className="font-normal text-secondary">or drag and drop</span>
        </p>
        <span className="text-xs text-tertiary">PDF, DOCX, XLSX, PNG, JPG (Max {maxFiles} files)</span>
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-2 mt-3">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-sm border-subtle surface-card text-xs"
            >
              <div className="flex items-center gap-2 truncate">
                <File size={16} className="text-primary flex-shrink-0" />
                <span className="truncate font-medium">{file.name}</span>
                <span className="text-tertiary">({(file.size / 1024).toFixed(1)} KB)</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                isIconOnly
                icon={Trash2}
                onClick={() => removeFile(idx)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
