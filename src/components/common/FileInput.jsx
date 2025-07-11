import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant FileInput DaisyUI - Complet pour prototypage rapide
 * Toutes les variantes, tailles, états et options disponibles
 */
const FileInput = forwardRef(({
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  name,
  id,
  className = '',
  accept,
  multiple = false,
  
  // Variantes DaisyUI
  variant = 'default', // default, bordered, ghost, primary, secondary, accent, info, success, warning, error
  size = 'md', // xs, sm, md, lg
  
  // Props d'accessibilité
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  
  // Props HTML natives
  autoFocus,
  form,
  
  ...props
}, ref) => {
  const [dragOver, setDragOver] = useState(false);
  
  // Classes de base
  const baseClasses = 'file-input w-full max-w-xs';
  
  // Classes de variantes
  const variantClasses = {
    default: '',
    bordered: 'file-input-bordered',
    ghost: 'file-input-ghost',
    primary: 'file-input-primary',
    secondary: 'file-input-secondary',
    accent: 'file-input-accent',
    info: 'file-input-info',
    success: 'file-input-success',
    warning: 'file-input-warning',
    error: 'file-input-error'
  };
  
  // Classes de tailles
  const sizeClasses = {
    xs: 'file-input-xs',
    sm: 'file-input-sm',
    md: 'file-input-md',
    lg: 'file-input-lg'
  };
  
  // Classes d'état
  const stateClasses = {
    disabled: disabled ? 'file-input-disabled' : ''
  };
  
  // Assemblage final des classes
  const fileInputClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    stateClasses.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      type="file"
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      required={required}
      name={name}
      id={id}
      className={fileInputClasses}
      accept={accept}
      multiple={multiple}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      autoFocus={autoFocus}
      form={form}
      {...props}
    />
  );
});

FileInput.displayName = 'FileInput';

FileInput.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  variant: PropTypes.oneOf([
    'default', 'bordered', 'ghost', 'primary', 'secondary', 'accent', 
    'info', 'success', 'warning', 'error'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  'aria-label': PropTypes.string,
  'aria-describedby': PropTypes.string,
  autoFocus: PropTypes.bool,
  form: PropTypes.string
};

// Composants de commodité pour prototypage ultra-rapide
FileInput.Bordered = (props) => <FileInput variant="bordered" {...props} />;
FileInput.Ghost = (props) => <FileInput variant="ghost" {...props} />;
FileInput.Primary = (props) => <FileInput variant="primary" {...props} />;
FileInput.Secondary = (props) => <FileInput variant="secondary" {...props} />;
FileInput.Accent = (props) => <FileInput variant="accent" {...props} />;
FileInput.Success = (props) => <FileInput variant="success" {...props} />;
FileInput.Warning = (props) => <FileInput variant="warning" {...props} />;
FileInput.Error = (props) => <FileInput variant="error" {...props} />;

// Composants par taille
FileInput.XS = (props) => <FileInput size="xs" {...props} />;
FileInput.SM = (props) => <FileInput size="sm" {...props} />;
FileInput.LG = (props) => <FileInput size="lg" {...props} />;

// Composants par type de fichier
FileInput.Image = (props) => <FileInput accept="image/*" {...props} />;
FileInput.Document = (props) => <FileInput accept=".pdf,.doc,.docx,.txt" {...props} />;
FileInput.Audio = (props) => <FileInput accept="audio/*" {...props} />;
FileInput.Video = (props) => <FileInput accept="video/*" {...props} />;

/**
 * Composant FileInputWithPreview pour afficher un aperçu des fichiers
 */
const FileInputWithPreview = ({ 
  label, 
  showPreview = true,
  previewType = 'auto', // auto, image, text, none
  maxFiles = 5,
  onFilesChange,
  className = '',
  ...fileInputProps 
}) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    
    if (showPreview) {
      generatePreviews(selectedFiles);
    }
    
    onFilesChange && onFilesChange(selectedFiles);
    fileInputProps.onChange && fileInputProps.onChange(event);
  };

  const generatePreviews = (fileList) => {
    const newPreviews = [];
    
    fileList.forEach((file, index) => {
      if (file.type.startsWith('image/') && previewType !== 'none') {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews[index] = {
            type: 'image',
            src: e.target.result,
            name: file.name
          };
          setPreviews([...newPreviews]);
        };
        reader.readAsDataURL(file);
      } else {
        newPreviews[index] = {
          type: 'file',
          name: file.name,
          size: file.size
        };
      }
    });
    
    setPreviews(newPreviews);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
    onFilesChange && onFilesChange(newFiles);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={fileInputProps.id} 
          className="block text-sm font-medium"
        >
          {label}
        </label>
      )}
      
      {/* File Input */}
      <FileInput
        {...fileInputProps}
        onChange={handleFileChange}
      />
      
      {/* Preview */}
      {showPreview && previews.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Fichiers sélectionnés:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative p-2 border rounded-lg">
                {preview.type === 'image' ? (
                  <img 
                    src={preview.src} 
                    alt={preview.name}
                    className="w-full h-24 object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-24 bg-base-200 rounded flex items-center justify-center">
                    <span className="text-xs text-base-content opacity-60">
                      {preview.name}
                    </span>
                  </div>
                )}
                
                <div className="mt-2 text-xs">
                  <p className="truncate">{preview.name}</p>
                  {preview.size && (
                    <p className="text-base-content opacity-60">{formatFileSize(preview.size)}</p>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-error text-error-content rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-error hover:opacity-80"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

FileInputWithPreview.propTypes = {
  label: PropTypes.string,
  showPreview: PropTypes.bool,
  previewType: PropTypes.oneOf(['auto', 'image', 'text', 'none']),
  maxFiles: PropTypes.number,
  onFilesChange: PropTypes.func,
  className: PropTypes.string
};

// Attacher FileInputWithPreview au composant FileInput
FileInput.WithPreview = FileInputWithPreview;

export default FileInput; 