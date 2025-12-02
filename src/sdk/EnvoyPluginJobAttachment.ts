/**
 * Display some text in Envoy's dashboard.
 *
 * @category Attachment
 */
export interface EnvoyPluginTextJobAttachment {
  type?: 'text' | 'password' | string;
  label: string;
  value: string;
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
  label: string;
  value: ScreenerDetails;
}

/**
 * Screener report definitions
 */
export interface ScreenerDetails {
  input: {
    fields: ScreenerInputField[];
  }
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
  | EnvoyPluginLinkJobAttachment
  | EnvoyPluginCredentialJobAttachment
  | EnvoyPluginScreenerJobAttachment;

export default EnvoyPluginJobAttachment;
