import HttpStatus from '../../src/internal/HttpStatus';
import EnvoyPluginJobAttachment, {
  attachmentsForHiddenIgnored,
  HIDDEN_JOB_ATTACHMENT_TYPE,
  hiddenJobAttachment,
} from '../../src/sdk/EnvoyPluginJobAttachment';
import EnvoyResponse from '../../src/sdk/EnvoyResponse';
import { assignEnvoyResponseHelpers } from '../../src/sdk/middleware';

type MockEnvoyResponse = EnvoyResponse & { body: string; contentType: string };

function mockResponse(): MockEnvoyResponse {
  const response = {
    statusCode: 200,
    body: '',
    contentType: '',
    setHeader(name: string, value: string) {
      if (name === 'Content-Type') {
        response.contentType = value;
      }
    },
    end(payload?: string) {
      response.body = payload ?? '';
    },
  };

  return response as unknown as MockEnvoyResponse;
}

describe('hiddenJobAttachment', () => {
  it('marks an ignored no-op so the dashboard drops the job', () => {
    const inputLabel = 'Invite Updated';
    const inputValue = 'No relevant fields changed';

    const actualAttachment = hiddenJobAttachment(inputLabel, inputValue);

    expect(actualAttachment).toEqual({
      type: HIDDEN_JOB_ATTACHMENT_TYPE,
      label: inputLabel,
      value: inputValue,
      hidden: true,
    });
  });
});

describe('attachmentsForHiddenIgnored', () => {
  it('upgrades a plain text attachment to hidden_job', () => {
    const inputMessage = 'No relevant fields changed';
    const inputAttachments: Array<EnvoyPluginJobAttachment> = [{ label: 'Invite Updated', value: inputMessage }];

    const actualAttachments = attachmentsForHiddenIgnored(inputMessage, inputAttachments);

    expect(actualAttachments).toEqual([hiddenJobAttachment('Invite Updated', inputMessage)]);
  });

  it('builds a marker from the message when no attachment is passed', () => {
    const inputMessage = 'No relevant fields changed';

    const actualAttachments = attachmentsForHiddenIgnored(inputMessage);

    expect(actualAttachments).toEqual([hiddenJobAttachment(inputMessage, inputMessage)]);
  });

  it('uses a fallback label when the message is empty', () => {
    const inputMessage = '';

    const actualAttachments = attachmentsForHiddenIgnored(inputMessage, []);

    expect(actualAttachments).toEqual([hiddenJobAttachment('Ignored', 'Ignored')]);
  });

  it('keeps an existing hidden_job attachment and forces hidden', () => {
    const inputMessage = 'No relevant fields changed';
    const inputAttachment = {
      type: HIDDEN_JOB_ATTACHMENT_TYPE,
      label: 'Invite Updated',
      value: inputMessage,
    };

    const actualAttachments = attachmentsForHiddenIgnored(inputMessage, [inputAttachment]);

    expect(actualAttachments).toEqual([hiddenJobAttachment('Invite Updated', inputMessage)]);
  });

  it('leaves non-text attachments in place and prepends a marker', () => {
    const inputMessage = 'Skipped';
    const inputAttachment: EnvoyPluginJobAttachment = {
      type: 'link',
      label: 'Docs',
      value: 'Docs',
      url: 'https://example.com',
    };

    const actualAttachments = attachmentsForHiddenIgnored(inputMessage, [inputAttachment]);

    expect(actualAttachments).toEqual([hiddenJobAttachment(inputMessage, inputMessage), inputAttachment]);
  });
});

describe('sendHiddenIgnored', () => {
  it('responds with the ignored status and a hidden_job attachment', () => {
    const inputMessage = 'No relevant fields changed';
    const inputDebugInfo = { flowId: '1' };
    const inputAttachment: EnvoyPluginJobAttachment = { label: 'Invite Updated', value: inputMessage };
    const mockRes = mockResponse();
    assignEnvoyResponseHelpers(mockRes);

    mockRes.sendHiddenIgnored(inputMessage, inputDebugInfo, inputAttachment);

    expect(mockRes.statusCode).toBe(HttpStatus.IGNORED);
    expect(mockRes.contentType).toBe('application/json');
    expect(JSON.parse(mockRes.body)).toEqual({
      message: inputMessage,
      debugInfo: inputDebugInfo,
      attachments: [hiddenJobAttachment('Invite Updated', inputMessage)],
    });
  });

  it('leaves sendIgnored visible by not adding a hidden_job attachment', () => {
    const inputMessage = 'Employee excluded from integration.';
    const mockRes = mockResponse();
    assignEnvoyResponseHelpers(mockRes);

    mockRes.sendIgnored(inputMessage, {});

    expect(mockRes.statusCode).toBe(HttpStatus.IGNORED);
    expect(JSON.parse(mockRes.body)).toEqual({
      message: inputMessage,
      debugInfo: {},
      attachments: [],
    });
  });
});
