import {FunctionalComponent, h} from 'preact';
import I18n, {I18nContext, ProvideI18n} from '../i18n/i18n';

import {useContext} from 'preact/hooks';

export const I18nProvider: FunctionalComponent = ({children}) => (
  <ProvideI18n value={new I18n()}>{children}</ProvideI18n>
);
export const useI18n = () => useContext(I18nContext);
