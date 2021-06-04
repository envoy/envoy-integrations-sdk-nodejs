import JSONAPIModel from '../util/json-api/JSONAPIModel';

export type LocationSortFields = 'name' | 'created_at' | '-name' | '-created_at';

export interface LocationFilterFields {
  disabled?: boolean;
  company?: string;
}

export interface LocationAttributes {
  name: string;
  address: string;
  'address-line-1'?: string;
  'address-line-2'?: string;
  city?: string;
  state?: string;
  zip?: string;
  latitude?: number;
  longitude?: number;
  locale?: string;
  timezone?: string;
  'company-name-override'?: string;
  'logo-small-url'?: string;
  'logo-thumb-url'?: string;
  'logo-url'?: string;
  disabled?: boolean;
  'visitors-onboarding-complete'?: boolean;
  'registration-eligibility-end-offset'?: number;
  'registration-eligibility-start-offset'?: number;
  'visitor-registration-eligibility-start-offset'?: number;
  'welcome-email-preference'?: string;
  'average-monthly-visitors'?: number;
  'capacity-limit'?: number;
  'auto-sign-out-at-midnight'?: boolean;
  'employee-screening-enabled'?: boolean;
  'pre-registration-enabled'?: boolean;
  'pre-registration-required-enabled'?: boolean;
  'host-approval-enabled'?: boolean;
  'multiple-languages-enabled'?: boolean;
  'near-visit-screening-enabled'?: boolean;
  'printer-notifications-enabled'?: boolean;
  'security-desk-link-enabled'?: boolean;
  'touchless-signin-enabled'?: boolean;
  'visitor-survey-enabled'?: boolean;
  'visual-compliance-enabled'?: boolean;
  'created-at'?: string;
  'updated-at'?: string;
}

export type LocationRelationships = 'company' | 'employees' | 'flows' | 'employee-screening-flow';

export type LocationModel = JSONAPIModel<LocationAttributes, LocationRelationships>;
