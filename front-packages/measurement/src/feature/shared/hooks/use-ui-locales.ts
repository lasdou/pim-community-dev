import {useCallback, useEffect, useState} from 'react';
import {useRoute, Locale} from '@akeneo-pim-community/shared';
import {baseFetcher} from '../fetcher/base-fetcher';

let uiLocalesPromise: Promise<Locale[]> | null = null;
const fetchUiLocales = async (route: string): Promise<Locale[]> => {
  if (null === uiLocalesPromise) {
    uiLocalesPromise = (await baseFetcher(route)) as Promise<Locale[]>;
  }

  return uiLocalesPromise;
};

const useUiLocales = (): Locale[] | null => {
  const [locales, setLocales] = useState<Locale[] | null>(null);
  const route = useRoute('pim_localization_locale_index');

  const fetchLocales = useCallback(async () => setLocales(await fetchUiLocales(route)), [route, setLocales]);

  useEffect(() => {
    (async () => fetchLocales())();
  }, [fetchLocales]);

  return locales;
};

export {useUiLocales};
