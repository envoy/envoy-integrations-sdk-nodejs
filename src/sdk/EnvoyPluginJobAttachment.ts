/**
 * Display some text in Envoy's dashboard.
 *
 * @category Attachment
 */
export interface EnvoyPluginTextJobAttachment {
  type?: 'text' | 'password' | string;
  label: string;
  value: string;
  /**
   * When true, Garaje omits this attachment from the visitor details screen.
   * The job status line still renders.
   * To hide the whole ignored job, use {@link EnvoyResponse.sendHiddenIgnored}.
   */
  hidden?: boolean;
}

/**
 * Marker type that opts a single ignored job out of the dashboard's job panel.
 *
 * Garaje hides the row only when the job status is `ignored` and an attachment
 * has this type (`isHiddenIgnored`). A missing `type` is stamped `password` by
 * envoy-web, which would leave the job visible.
 */
export const HIDDEN_JOB_ATTACHMENT_TYPE = 'hidden_job';

/**
 * Attachment that keeps a no-op's reason on the job and marks that ignored job as hidden.
 *
 * `hidden: true` keeps the reason out of the attachment list if the job is shown.
 * envoy-web drops attachments missing `label` or `value`, so both are required.
 *
 * @category Attachment
 */
export interface EnvoyPluginHiddenJobAttachment extends EnvoyPluginTextJobAttachment {
  type: typeof HIDDEN_JOB_ATTACHMENT_TYPE;
  hidden: true;
}

/**
 * Builds the attachment Garaje uses to drop an ignored job from activity.
 */
export function hiddenJobAttachment(label: string, value: string): EnvoyPluginHiddenJobAttachment {
  return {
    type: HIDDEN_JOB_ATTACHMENT_TYPE,
    label,
    value,
    hidden: true,
  };
}

/**
 * Display some JSON data in Envoy's dashboard.
 *
 * @category Attachment
 */
export interface EnvoyPluginJSONJobAttachment {
  type: 'json';
  label: string;
  value: unknown;
}

/**
 * Display a link in Envoy's dashboard.
 *
 * @category Attachment
 */
export interface EnvoyPluginLinkJobAttachment extends EnvoyPluginTextJobAttachment {
  type: 'link';
  url: string;
}

/**
 * Display a credential in Envoy's dashboard,
 * and include the credential's image in the invitee's welcome email.
 *
 * @category Attachment
 */
export interface EnvoyPluginCredentialJobAttachment extends EnvoyPluginTextJobAttachment {
  type: 'credential_image';
  title: string;
  image: {
    type: 's3';
    link: string;
  };
}

/**
 * Display a screener report in Envoy's dashboard,
 * and allow for approval or rejection.
 *
 * @category Attachment
 */
export interface EnvoyPluginScreenerJobAttachment extends EnvoyPluginJSONJobAttachment {
  label: 'Screener Details';
  value: ScreenerDetails;
}

/**
 * Screener report definitions
 */
export interface ScreenerDetails {
  input: {
    fields: ScreenerInputField[];
  };
  matches: ScreenerMatch[];
}

export interface ScreenerMatch {
  headers: ScreenerMatchHeaders;
  'visible-fields-count': number;
  fields: ScreenerMatchField[];
}

export interface ScreenerMatchHeaders {
  name: string; // ex: Tags
  value: string; // ex: Content
}

export interface ScreenerMatchField {
  name: string;
  value: string;
  type: 'text' | 'image';
}

export interface ScreenerInputField {
  name: string;
  value: string;
  type: 'text' | 'image';
}

/**
 * Attachments to jobs, which will be displayed in the Envoy dashboard.
 * Some attachments like `credential_image` can show up in other places,
 * like an invitee's welcome email.
 *
 * @category Attachment
 */
type EnvoyPluginJobAttachment =
  | EnvoyPluginTextJobAttachment
  | EnvoyPluginHiddenJobAttachment
  | EnvoyPluginLinkJobAttachment
  | EnvoyPluginCredentialJobAttachment
  | EnvoyPluginScreenerJobAttachment;

export default EnvoyPluginJobAttachment;

function isPlainTextAttachment(attachment: EnvoyPluginJobAttachment): attachment is EnvoyPluginTextJobAttachment {
  if (attachment.type !== undefined && attachment.type !== 'text') {
    return false;
  }
  return typeof attachment.label === 'string' && typeof attachment.value === 'string';
}

/**
 * Ensures an ignored response carries a `hidden_job` attachment.
 * A plain text attachment is upgraded in place so its label and value are kept.
 */
export function attachmentsForHiddenIgnored(
  message: string,
  attachments: Array<EnvoyPluginJobAttachment> = [],
): Array<EnvoyPluginJobAttachment> {
  const markerIndex = attachments.findIndex((attachment) => attachment.type === HIDDEN_JOB_ATTACHMENT_TYPE);
  if (markerIndex >= 0) {
    return attachments.map((attachment, index) => {
      if (index !== markerIndex) {
        return attachment;
      }
      const textAttachment = attachment as EnvoyPluginTextJobAttachment;
      const label = textAttachment.label || message || 'Ignored';
      const value = textAttachment.value || message || 'Ignored';
      return {
        ...textAttachment,
        ...hiddenJobAttachment(label, value),
      };
    });
  }

  const textIndex = attachments.findIndex(isPlainTextAttachment);
  if (textIndex === -1) {
    const fallback = message || 'Ignored';
    return [hiddenJobAttachment(fallback, fallback), ...attachments];
  }

  return attachments.map((attachment, index) => {
    if (index !== textIndex) {
      return attachment;
    }
    const textAttachment = attachment as EnvoyPluginTextJobAttachment;
    const label = textAttachment.label || message || 'Ignored';
    const value = textAttachment.value || message || 'Ignored';
    return {
      ...textAttachment,
      ...hiddenJobAttachment(label, value),
    };
  });
}
