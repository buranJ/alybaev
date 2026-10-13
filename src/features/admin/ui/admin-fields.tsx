'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useId, useState } from 'react';

import type { AdminField, ContentData, JsonValue, MediaItem } from '../model/types';
import styles from './admin-panel.module.css';

function emptyValue(field: AdminField): JsonValue {
  if (field.widget === 'object')
    return Object.fromEntries((field.fields ?? []).map((child) => [child.name, emptyValue(child)]));
  if (field.widget === 'list') return [];
  if (field.widget === 'boolean') return false;
  if (field.widget === 'number') return 0;
  if (field.widget === 'select') {
    const first = field.options?.[0];
    return typeof first === 'string' ? first : (first?.value ?? '');
  }
  return '';
}

export function validateFields(fields: AdminField[], data: ContentData, prefix = ''): string[] {
  return fields.flatMap((field) => {
    const value = data[field.name];
    const label = prefix ? `${prefix}: ${field.label}` : field.label;
    if (field.widget === 'object' && value && typeof value === 'object' && !Array.isArray(value))
      return validateFields(field.fields ?? [], value, label);
    if (field.widget === 'list') {
      if (!Array.isArray(value)) return [label];
      const errors =
        value.length < (field.min ?? 0) || value.length > (field.max ?? Infinity) ? [label] : [];
      value.forEach((item, index) => {
        if (field.fields && item && typeof item === 'object' && !Array.isArray(item))
          errors.push(...validateFields(field.fields, item, `${label} ${index + 1}`));
        else if (typeof item === 'string' && !item.trim()) errors.push(`${label} ${index + 1}`);
      });
      return errors;
    }
    if (
      typeof value === 'string' &&
      ((field.required && !value.trim()) ||
        (field.pattern?.[0] && !new RegExp(field.pattern[0]).test(value)))
    )
      return [label];
    return [];
  });
}

interface FieldProps {
  field: AdminField;
  value: JsonValue;
  onChange: (value: JsonValue) => void;
  demo: boolean;
  media: MediaItem[];
  onUploaded: (item: MediaItem) => void;
}

function ImageField({ field, value, onChange, demo, media, onUploaded }: FieldProps) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const path = typeof value === 'string' ? value : '';
  const preview = (src: string) =>
    demo || !src ? src : `/api/admin/media?path=${encodeURIComponent(src)}`;

  async function upload(file?: File) {
    if (!file) return;
    setError('');
    setBusy(true);
    try {
      if (demo) {
        setError(
          'Загрузка доступна после подключения админки. В демо выберите существующую фотографию.',
        );
        return;
      }
      const form = new FormData();
      form.append('file', file);
      const response = await fetch('/api/admin/media', { method: 'POST', body: form });
      const result = (await response.json()) as MediaItem & { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Не удалось загрузить фото.');
      onUploaded(result);
      onChange(result.path);
      setOpen(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка загрузки');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.field}>
      <span className={styles.label}>{field.label}</span>
      <div className={styles.imageRow}>
        {path && (
          // eslint-disable-next-line @next/next/no-img-element -- Admin previews use an authenticated image endpoint, not the public image optimizer.
          <img src={preview(path)} alt="Выбранное изображение" className={styles.thumbnail} />
        )}
        <button className={styles.secondary} type="button" onClick={() => setOpen(true)}>
          Выбрать или загрузить фото
        </button>
      </div>
      {path && <span className={styles.hint}>{path.split('/').at(-1)}</span>}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.modal} aria-describedby={undefined}>
            <div className={styles.modalHeader}>
              <Dialog.Title>Медиатека</Dialog.Title>
              <Dialog.Close className={styles.secondary}>Закрыть</Dialog.Close>
            </div>
            <label className={styles.field}>
              <span className={styles.label}>
                {busy ? 'Загружаем и оптимизируем…' : 'Загрузить новое фото — до 5 МБ'}
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                disabled={busy || demo}
                onChange={(event) => {
                  void upload(event.target.files?.[0]);
                  event.target.value = '';
                }}
              />
            </label>
            {demo && (
              <p className={styles.notice}>
                Это демо. Новые фотографии можно загружать после подключения доступа.
              </p>
            )}
            {error && (
              <p role="alert" className={styles.error}>
                {error}
              </p>
            )}
            <div className={styles.mediaGrid}>
              {media.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  className={styles.mediaTile}
                  onClick={() => {
                    onChange(item.path);
                    setOpen(false);
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview(item.path)} alt={item.name} loading="lazy" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export function AdminFields({
  fields,
  data,
  onChange,
  demo,
  media,
  onUploaded,
}: {
  fields: AdminField[];
  data: ContentData;
  onChange: (data: ContentData) => void;
  demo: boolean;
  media: MediaItem[];
  onUploaded: (item: MediaItem) => void;
}) {
  return fields.map((field) => (
    <Field
      key={field.name}
      field={field}
      value={data[field.name] ?? emptyValue(field)}
      onChange={(value) => onChange({ ...data, [field.name]: value })}
      demo={demo}
      media={media}
      onUploaded={onUploaded}
    />
  ));
}

function Field(props: FieldProps) {
  const { field, value, onChange, demo, media, onUploaded } = props;
  const id = useId();
  if (field.widget === 'image') return <ImageField {...props} />;
  if (field.widget === 'object') {
    const data = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    return (
      <fieldset className={styles.fieldset}>
        <legend>{field.label}</legend>
        <AdminFields
          fields={field.fields ?? []}
          data={data}
          onChange={onChange}
          demo={demo}
          media={media}
          onUploaded={onUploaded}
        />
      </fieldset>
    );
  }
  if (field.widget === 'list') {
    const values = Array.isArray(value) ? value : [];
    const itemField = field.field ?? { name: 'value', label: 'Текст', widget: 'string' };
    function move(index: number, direction: number) {
      const items = [...values];
      const next = index + direction;
      if (next < 0 || next >= items.length) return;
      [items[index], items[next]] = [items[next] ?? null, items[index] ?? null];
      onChange(items);
    }
    return (
      <fieldset className={styles.fieldset}>
        <legend>{field.label}</legend>
        {values.map((item, index) => {
          const record = item && typeof item === 'object' && !Array.isArray(item) ? item : {};
          const title =
            typeof item === 'string'
              ? item
              : (record.title ??
                record.procedure ??
                record.question ??
                record.label ??
                record.alt ??
                `${field.label} ${index + 1}`);
          return (
            <details key={index} className={styles.listItem}>
              <summary>
                {index + 1}. {String(title || 'Новая карточка').slice(0, 100)}
              </summary>
              <div className={styles.listContent}>
                {field.fields ? (
                  <AdminFields
                    fields={field.fields}
                    data={record}
                    onChange={(data) =>
                      onChange(values.map((item, i) => (i === index ? data : item)))
                    }
                    demo={demo}
                    media={media}
                    onUploaded={onUploaded}
                  />
                ) : (
                  <Field
                    {...props}
                    field={itemField}
                    value={item}
                    onChange={(value) =>
                      onChange(values.map((item, i) => (i === index ? value : item)))
                    }
                  />
                )}
                <div className={styles.listActions}>
                  <button type="button" disabled={index === 0} onClick={() => move(index, -1)}>
                    ↑ Выше
                  </button>
                  <button
                    type="button"
                    disabled={index === values.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    ↓ Ниже
                  </button>
                  <button
                    type="button"
                    disabled={values.length <= (field.min ?? 0)}
                    onClick={() => onChange(values.filter((_, i) => i !== index))}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </details>
          );
        })}
        {values.length < (field.max ?? Infinity) && (
          <button
            type="button"
            className={styles.secondary}
            onClick={() =>
              onChange([
                ...values,
                field.fields
                  ? Object.fromEntries(field.fields.map((child) => [child.name, emptyValue(child)]))
                  : emptyValue(itemField),
              ])
            }
          >
            + Добавить
          </button>
        )}
      </fieldset>
    );
  }
  if (field.widget === 'boolean')
    return (
      <div className={styles.field}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={value === true}
            onChange={(event) => onChange(event.target.checked)}
          />
          {field.label}
        </label>
        {field.hint && <span className={styles.hint}>{field.hint}</span>}
      </div>
    );
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {field.label}
      </label>
      {field.widget === 'select' ? (
        <select
          id={id}
          className={styles.input}
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
        >
          {field.options?.map((option) => (
            <option
              key={typeof option === 'string' ? option : option.value}
              value={typeof option === 'string' ? option : option.value}
            >
              {typeof option === 'string' ? option : option.label}
            </option>
          ))}
        </select>
      ) : field.widget === 'text' ? (
        <textarea
          id={id}
          className={styles.input}
          rows={4}
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          id={id}
          className={styles.input}
          type={field.widget === 'number' ? 'number' : 'text'}
          step={field.widget === 'number' ? 'any' : undefined}
          value={String(value)}
          onChange={(event) =>
            onChange(field.widget === 'number' ? Number(event.target.value) : event.target.value)
          }
        />
      )}
      {field.hint && <span className={styles.hint}>{field.hint}</span>}
    </div>
  );
}
