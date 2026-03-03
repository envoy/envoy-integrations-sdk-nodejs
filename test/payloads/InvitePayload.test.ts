import InvitePayload, { normalizeInvitePayload } from '../../src/payloads/InvitePayload';

const makePayload = (attributeOverrides = {}): InvitePayload => ({
  id: '1',
  type: 'invites' as const,
  attributes: {
    'employee-screening-flow': false,
    'full-name': 'Jane Doe',
    email: 'jane@example.com',
    'inviter-name': null,
    'inviter-email': null,
    'expected-arrival-time': '2024-01-15T10:30:00.000Z',
    'private-notes': null,
    arrived: false,
    'been-here-before': false,
    'flow-name': 'Default',
    'flow-id': 'flow1',
    'user-data': [],
    'secret-token': 'secret',
    'edit-token': 'edit',
    'photo-url': null,
    'qr-code': null,
    'qr-code-sent-at': null,
    'preregistration-complete': false,
    'reminder-sent-at': null,
    ...attributeOverrides,
  },
  relationships: {
    location: { data: { id: 'loc1', type: 'locations' as const } },
  },
});

describe('normalizeInvitePayload', () => {
  it('returns the payload unchanged when there are no legal-docs', () => {
    const payload = makePayload();

    const result = normalizeInvitePayload(payload);

    expect(result.attributes).toEqual(payload.attributes);
  });

  it('converts legal-docs signed-at from SQL to ISO', () => {
    const legalDocs = [
      { id: 'doc1', url: 'https://example.com/doc1', 'signed-at': '2024-01-15 10:30:00', agreement: { id: 'a1' } },
    ];

    const result = normalizeInvitePayload(makePayload({ 'legal-docs': legalDocs }));

    expect(result.attributes['legal-docs']?.[0]['signed-at']).toBe('2024-01-15T10:30:00.000Z');
  });

  it('does not mutate the original payload', () => {
    const legalDocs = [
      { id: 'doc1', url: 'https://example.com/doc1', 'signed-at': '2024-01-15 10:30:00', agreement: { id: 'a1' } },
    ];
    const payload = makePayload({ 'legal-docs': legalDocs });

    normalizeInvitePayload(payload);

    expect(payload.attributes['legal-docs']).toBe(legalDocs);
    expect(payload.attributes['legal-docs']?.[0]['signed-at']).toBe('2024-01-15 10:30:00');
  });

  it('produces the same result when called twice on the same payload', () => {
    const legalDocs = [
      { id: 'doc1', url: 'https://example.com/doc1', 'signed-at': '2024-01-15 10:30:00', agreement: { id: 'a1' } },
    ];
    const payload = makePayload({ 'legal-docs': legalDocs });

    const first = normalizeInvitePayload(payload);
    const second = normalizeInvitePayload(payload);

    expect(second.attributes['legal-docs']?.[0]['signed-at']).toBe(first.attributes['legal-docs']?.[0]['signed-at']);
    expect(second.attributes['legal-docs']?.[0]['signed-at']).not.toBeNull();
  });
});
