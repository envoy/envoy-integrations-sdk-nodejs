export interface EnvoyPluginTextJobAttachment {
  type?: 'text' | 'password' | 'link' | 'credential_image',
  label: string,
  value: string,
}

export interface EnvoyPluginLinkJobAttachment extends EnvoyPluginTextJobAttachment {
  type: 'link',
  url: string,
}

export interface EnvoyPluginCredentialJobAttachment extends EnvoyPluginTextJobAttachment {
  type: 'credential_image',
  title: string,
  image: {
    type: 's3',
    link: string,
  },
}

type EnvoyPluginJobAttachment = EnvoyPluginTextJobAttachment
| EnvoyPluginLinkJobAttachment
| EnvoyPluginCredentialJobAttachment;

export default EnvoyPluginJobAttachment;
