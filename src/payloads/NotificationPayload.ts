type NotificationPayload = {
  recipient: {
    name: {
      full: string,
    },
    email: string | null,
    user_id: number | null,
    employee_id: number | null,
    phone_number: string | null,
  },
  message?: string,
  details?: Array<{
    label: string,
    value: string,
  }>,
  actions?: Array<{
    label: string,
    callback_url: string,
  }>,
  attachments?: Array<{
    url: string,
  }>,
  channel_overrides?: {
    slack?: {
      dm_only?: boolean,
      footer_text?: string,
      short_details?: boolean,
      large_image?: boolean,
      attachments?: Array<Record<string, any>>,
      message?: string,
      text?: string,
    },
    email?: {
      from: string,
      subject: string,
      html_body: string,
      text_body: string,
      reply_to?: {
        name: {
          full: string,
        },
        email: string,
      },
      bcc?: Array<{
        name: {
          full: string,
        },
        email: string,
      }>
    }
  },
};

export default NotificationPayload;
