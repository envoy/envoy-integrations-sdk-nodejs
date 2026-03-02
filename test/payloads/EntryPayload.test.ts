import EntryPayload, { normalizeEntryPayload } from '../../src/payloads/EntryPayload';

const makePayload = (attributeOverrides = {}): EntryPayload => ({
  id: '1',
  type: 'entries' as const,
  attributes: {
    'full-name': 'Jane Doe',
    email: 'jane@example.com',
    'employee-screening-flow': false,
    host: null,
    'host-email': null,
    'private-notes': null,
    'signed-in-at': '2024-01-15 10:30:00',
    thumbnails: { large: null, original: null, small: null },
    'flow-name': 'Default',
    'user-data': [],
    ...attributeOverrides,
  },
  relationships: {
    location: { data: { id: 'loc1', type: 'locations' as const } },
  },
});

describe('normalizeEntryPayload', () => {
  it('converts signed-in-at from SQL to ISO', () => {
    const result = normalizeEntryPayload(makePayload());

    expect(result.attributes['signed-in-at']).toBe('2024-01-15T10:30:00.000Z');
  });

  it('converts signed-out-at from SQL to ISO when present', () => {
    const result = normalizeEntryPayload(makePayload({ 'signed-out-at': '2024-01-15 11:00:00' }));

    expect(result.attributes['signed-out-at']).toBe('2024-01-15T11:00:00.000Z');
  });

  it('converts legal-docs signed-at from SQL to ISO', () => {
    const legalDocs = [
      { id: 'doc1', url: 'https://example.com/doc1', 'signed-at': '2024-01-15 10:30:00', agreement: { id: 'a1' } },
    ];

    const result = normalizeEntryPayload(makePayload({ 'legal-docs': legalDocs }));

    expect(result.attributes['legal-docs']?.[0]['signed-at']).toBe('2024-01-15T10:30:00.000Z');
  });

  it('does not mutate the original payload', () => {
    const payload = makePayload();

    normalizeEntryPayload(payload);

    expect(payload.attributes['signed-in-at']).toBe('2024-01-15 10:30:00');
  });

  it('produces the same result when called twice on the same payload', () => {
    const payload = makePayload();

    const first = normalizeEntryPayload(payload);
    const second = normalizeEntryPayload(payload);

    expect(second.attributes['signed-in-at']).toBe(first.attributes['signed-in-at']);
    expect(second.attributes['signed-in-at']).not.toBeNull();
  });
});
