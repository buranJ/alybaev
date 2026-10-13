import { describe, expect, it } from 'vitest';

import { httpsSchema, imagePathSchema, linkSchema } from '@/shared/lib/content-schema';
import { adminEntries, contentSchemas } from './content-registry';

describe('editable site content', () => {
  it('exposes every data field in the editor and accepts all migrated content', () => {
    function checkFields(
      fields: { name: string; fields?: unknown[]; field?: unknown }[],
      data: Record<string, unknown>,
    ) {
      expect(fields.map((field) => field.name).sort()).toEqual(Object.keys(data).sort());
      for (const field of fields) {
        const value = data[field.name];
        if (!field.fields) continue;
        if (Array.isArray(value))
          value.forEach((item) => checkFields(field.fields as typeof fields, item));
        else checkFields(field.fields as typeof fields, value as Record<string, unknown>);
      }
    }
    for (const entry of adminEntries) {
      expect(contentSchemas[entry.name]?.safeParse(entry.data).success).toBe(true);
      checkFields(entry.fields, entry.data);
    }
  });

  it('supports adding new results, certificates and directions', () => {
    for (const name of ['results', 'certificates', 'services']) {
      const data = structuredClone(adminEntries.find((entry) => entry.name === name)!.data);
      const items = data.items as unknown[];
      items.push(structuredClone(items[0]));
      expect(contentSchemas[name]?.safeParse(data).success).toBe(true);
    }
  });

  it('rejects executable links and paths outside the image library', () => {
    expect(linkSchema.safeParse('javascript:alert(1)').success).toBe(false);
    expect(httpsSchema.safeParse('javascript:alert(1)').success).toBe(false);
    expect(linkSchema.safeParse('//other.example').success).toBe(false);
    expect(imagePathSchema.safeParse('/images/../secret').success).toBe(false);
    expect(imagePathSchema.safeParse('/images/новое-фото.webp').success).toBe(true);
  });
});
