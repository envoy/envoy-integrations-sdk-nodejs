/**
 * Display some text in Envoy's dashboard.
 *
 * @category Attachment
 */
export interface EnvoyPluginTextJobAttachment {
  type?: 'text' | 'password' | string,
  label: string,
  value: string,
}

/**
 * Display a link in Envoy's dashboard.
 *
 * @category Attachment
 */
export interface EnvoyPluginLinkJobAttachment extends EnvoyPluginTextJobAttachment {
  type: 'link',
  url: string,
}

/**
 * Display a credential in Envoy's dashboard,
 * and include the credential's image in the invitee's welcome email.
 *
 * @category Attachment
 */
export interface EnvoyPluginCredentialJobAttachment extends EnvoyPluginTextJobAttachment {
  type: 'credential_image',
  title: string,
  image: {
    type: 's3',
    link: string,
  },
}

/**
 * Attachments to jobs, which will be displayed in the Envoy dashboard.
 * Some attachments like `credential_image` can show up in other places,
 * like an invitee's welcome email.
 *
 * @category Attachment
 */
type EnvoyPluginJobAttachment = EnvoyPluginTextJobAttachment
| EnvoyPluginLinkJobAttachment
| EnvoyPluginCredentialJobAttachment;

export default EnvoyPluginJobAttachment;
