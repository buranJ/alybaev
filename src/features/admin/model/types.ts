export type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
export type ContentData = { [key: string]: JsonValue };

export interface AdminField {
  name: string;
  label: string;
  widget: string;
  required?: boolean;
  hint?: string;
  min?: number;
  max?: number;
  fields?: AdminField[];
  field?: AdminField;
  pattern?: string[];
  options?: (string | { label: string; value: string })[];
}

export interface AdminEntry {
  name: string;
  label: string;
  group: string;
  preview_path: string;
  fields: AdminField[];
  data: ContentData;
}

export interface MediaItem {
  path: string;
  name: string;
}
