'use client';

import React, { useState, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import type { Theme as MuiTheme, PaletteColor } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

export type FastUploadColor = 'primary' | 'secondary';

export interface FastUploadFile {
  /** File name. */
  name: string;
  /** File size in bytes. */
  size: number;
  /** MIME type. */
  type: string;
  /** Native File object. */
  file: File;
  /** Data URL for preview (images). */
  preview?: string;
}

export interface FastUploadProps {
  /** Accent color. */
  color?: FastUploadColor;
  /** Label text shown when no file is selected. */
  label?: string;
  /** Controlled file list. */
  value?: FastUploadFile[];
  /** Uncontrolled initial files. */
  defaultValue?: FastUploadFile[];
  /** Change handler — receives the updated file list. */
  onChange?: (files: FastUploadFile[]) => void;
  /** Accepted MIME types (e.g. "image/*,application/pdf"). */
  accept?: string;
  /** Allow multiple files. */
  multiple?: boolean;
  /** Max file size in bytes. */
  maxSize?: number;
  /** Red error styling. */
  error?: boolean;
  /** Error message shown in red below. */
  errorMessage?: string;
  /** Helper text shown below. */
  helperText?: string;
  /** Disabled state. */
  disabled?: boolean;
  /** Container width. Number → px, string → raw CSS. */
  width?: number | string;
  /** Container min-height in px. Default 160. */
  height?: number;
  /** Shows asterisk on label, auto-validates on blur if empty — red border + error message. */
  required?: boolean;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function FastUpload({
  color = 'primary',
  label = 'Click to upload',
  value: controlledValue,
  defaultValue,
  onChange,
  accept,
  multiple,
  maxSize,
  error,
  errorMessage,
  helperText,
  disabled,
  width,
  height = 160,
  required,
}: FastUploadProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<FastUploadFile[]>(defaultValue || []);
  const [dragging, setDragging] = useState(false);
  const [oversize, setOversize] = useState('');
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const files = isControlled ? controlledValue : internalValue;
  const hasFiles = files.length > 0;
  const requiredError = !!(required && touched && !hasFiles);
  const showError = !!(error || errorMessage || oversize || requiredError);
  const autoMsg = requiredError && !helperText && !errorMessage ? '*Please upload at least one file' : '';
  const errorMsg = errorMessage || oversize || autoMsg;

  const updateFiles = useCallback(async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const raw: File[] = Array.from(fileList);

    if (maxSize) {
      const oversized = raw.find(f => f.size > maxSize);
      if (oversized) {
        setOversize(`"${oversized.name}" exceeds the maximum file size (${formatSize(maxSize)}).`);
        return;
      }
    }
    setOversize('');

    const processed: FastUploadFile[] = await Promise.all(
      raw.map(async (file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        file,
        preview: file.type.startsWith('image/') ? await readFileAsDataURL(file) : undefined,
      }))
    );

    const merged = multiple ? [...files, ...processed] : processed;
    if (!isControlled) setInternalValue(merged);
    onChange?.(merged);
  }, [files, isControlled, maxSize, multiple, onChange]);

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    updateFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  return (
    <StyledWrapper $color={color} $w={width} $isPct={typeof width === 'string'} $disabled={!!disabled} $error={showError} $height={height} $dragging={dragging} $hasFiles={files.length > 0}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onBlur={() => setTouched(true)}
      onClick={() => !disabled && inputRef.current?.click()}
      tabIndex={disabled ? -1 : 0}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        required={required}
        onChange={(e) => { updateFiles(e.target.files); e.target.value = ''; setTouched(false); }}
        disabled={disabled}
      />

      {files.length === 0 ? (
        <EmptyState>
          <CloudUploadIcon sx={{ fontSize: 36, opacity: 0.25 }} className="upload-icon" />
          <LabelText>{label}{required && <Asterisk> *</Asterisk>}</LabelText>
          <HintText>{accept ? `Accepted: ${accept}` : 'Drag & drop or click to browse'}</HintText>
        </EmptyState>
      ) : (
        <FileList>
          {files.map((f, i) => (
            <FileRow key={i}>
              {f.preview ? <Thumb src={f.preview} alt="" /> : <FileIcon />}
              <FileInfo>
                <FileName>{f.name}</FileName>
                <FileSize>{formatSize(f.size)}</FileSize>
              </FileInfo>
              <RemoveBtn type="button" disabled={disabled} onClick={(e) => { e.stopPropagation(); removeFile(i); }}>
                <ClearIcon sx={{ fontSize: 18 }} />
              </RemoveBtn>
            </FileRow>
          ))}
          {multiple && (
            <AddMoreBtn type="button" $color={color} disabled={disabled} onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
              + Add more
            </AddMoreBtn>
          )}
        </FileList>
      )}

      {errorMsg && <HelperError>{errorMsg}</HelperError>}
      {helperText && !errorMsg && <HelperText>{helperText}</HelperText>}
    </StyledWrapper>
  );
}

const accent = (p: any) => (p.theme.palette[p.$color] as PaletteColor).main;

const StyledWrapper = styled('div')<{
  $color: FastUploadColor;
  $w?: number | string;
  $isPct: boolean;
  $disabled: boolean;
  $error: boolean;
  $height: number;
  $dragging: boolean;
  $hasFiles: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${p => p.$w !== undefined ? `width: ${p.$isPct ? p.$w : `${p.$w}px`};` : ''}
  min-height: ${p => p.$height}px;
  padding: 20px;
  border: 2px ${p => (p.$dragging ? 'solid' : 'dashed')} ${p => p.$error ? p.theme.palette.error.main : (p.$hasFiles ? accent(p) : p.theme.palette.divider)};
  background: ${p => p.$dragging ? `${accent(p)}0d` : 'transparent'};
  cursor: ${p => (p.$disabled ? 'default' : 'pointer')};
  opacity: ${p => (p.$disabled ? 0.35 : 1)};
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover:not(:disabled) {
    border-color: ${p => p.$error ? p.theme.palette.error.main : accent(p)};
    background: ${p => `${accent(p)}08`};

    .upload-icon {
      color: ${accent};
      opacity: 1;
    }
  }
`;

const EmptyState = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: none;
`;

const LabelText = styled('span')`
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${p => p.theme.palette.text.primary};
`;

const HintText = styled('span')`
  font-family: inherit;
  font-size: 0.75rem;
  color: ${p => p.theme.palette.text.secondary};
  text-align: center;
`;

const FileList = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FileRow = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background: ${p => p.theme.palette.action.hover};
`;

const Thumb = styled('img')`
  width: 36px;
  height: 36px;
  object-fit: cover;
  flex-shrink: 0;
`;

const FileIcon = styled('div')`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  background: ${p => p.theme.palette.divider};
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '📄';
    font-size: 18px;
  }
`;

const FileInfo = styled('div')`
  flex: 1;
  min-width: 0;
`;

const FileName = styled('div')`
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${p => p.theme.palette.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled('div')`
  font-family: inherit;
  font-size: 0.7rem;
  color: ${p => p.theme.palette.text.secondary};
`;

const RemoveBtn = styled('button')`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  color: ${p => p.theme.palette.text.secondary};
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};
  transition: background 0.15s ease, color 0.15s ease;

  &:hover:not(:disabled) {
    background: ${p => p.theme.palette.action.selected};
    color: ${p => p.theme.palette.error.main};
  }
`;

const AddMoreBtn = styled('button')<{ $color: string }>`
  width: 100%;
  padding: 8px;
  border: 1px dashed ${p => p.theme.palette.divider};
  background: none;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${p => (p.theme.palette[p.$color as FastUploadColor] as PaletteColor).main};
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: ${p => p.theme.palette.action.hover};
  }
`;

const Asterisk = styled('span')`
  color: ${p => p.theme.palette.error.main};
`;

const HelperError = styled('span')`
  margin-top: 4px;
  font-family: inherit;
  font-size: 0.75rem;
  color: ${p => p.theme.palette.error.main};
  text-align: center;
  width: 100%;
`;

const HelperText = styled('span')`
  margin-top: 4px;
  font-family: inherit;
  font-size: 0.75rem;
  color: ${p => p.theme.palette.text.secondary};
  text-align: center;
  width: 100%;
`;
