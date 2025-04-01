import JSONAPIModel from '../util/json-api/JSONAPIModel';

/**
 * @category API Resource
 */
export type LocationSortFields = 'name' | 'created_at' | '-name' | '-created_at';

/**
 * @category API Resource
 */
export interface LocationFilterFields {
  disabled?: boolean;
  company?: string;
}

/**
 * @category API Resource
 */
export interface LocationAttributes {
  name: string;
  address: string;
  'address-line-1': string | null;
  'address-line-2': string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip: string | null;
  latitude: number | null;
  longitude: number | null;
  locale: string | null;
  timezone: string;
  'company-name-override': string | null;
  'logo-small-url': string | null;
  'logo-thumb-url': string | null;
  'logo-url': string | null;
  disabled: boolean | null;
  'visitors-onboarding-complete': boolean | null;
  'registration-eligibility-end-offset': number | null;
  'registration-eligibility-start-offset': number | null;
  'visitor-registration-eligibility-start-offset': number | null;
  'welcome-email-preference': string | null;
  'average-monthly-visitors': number | null;
  'capacity-limit': number | null;
  'auto-sign-out-at-midnight': boolean | null;
  'employee-screening-enabled': boolean | null;
  'pre-registration-enabled': boolean | null;
  'pre-registration-required-enabled': boolean | null;
  'host-approval-enabled': boolean | null;
  'multiple-languages-enabled': boolean | null;
  'near-visit-screening-enabled': boolean | null;
  'printer-notifications-enabled': boolean | null;
  'security-desk-link-enabled': boolean | null;
  'touchless-signin-enabled': boolean | null;
  'visitor-survey-enabled': boolean | null;
  'visual-compliance-enabled': boolean | null;
  'created-at': string;
  'updated-at': string;
}

/**
 * @category API Resource
 */
export type LocationRelationships = 'company' | 'employees' | 'flows' | 'employee-screening-flow';

/**
 * @category API Resource
 */
export type LocationModel = JSONAPIModel<LocationAttributes, LocationRelationships>;
