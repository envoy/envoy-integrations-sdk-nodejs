/**
 * Display some text in Envoy's dashboard.
 */
export interface EnvoyPluginTextJobAttachment {
  type?: 'text' | 'password' | 'link' | 'credential_image',
  label: string,
  value: string,
}

/**
 * Display a link in Envoy's dashboard.
 */
export interface EnvoyPluginLinkJobAttachment extends EnvoyPluginTextJobAttachment {
  type: 'link',
  url: string,
}

/**
 * Display a credential in Envoy's dashboard,
 * and include the credential's image in the invitee's welcome email.
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
 */
type EnvoyPluginJobAttachment = EnvoyPluginTextJobAttachment
| EnvoyPluginLinkJobAttachment
| EnvoyPluginCredentialJobAttachment;

export default EnvoyPluginJobAttachment;
