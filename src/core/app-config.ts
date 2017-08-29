export interface AppConfig {
  getPortletName: () => string;
  getPortletNamespace: () => string;
  getPortletConfiguration: () => Map<string, any>;
  isValid: () => boolean;
}
