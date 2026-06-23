import { useEffect } from 'react';
import { AdConfig, AdNetwork } from './AdConfig';

let mobileAds: any = null;

try {
  mobileAds = require('react-native-google-mobile-ads').default;
} catch {}

export const AdInit = () => {
  useEffect(() => {
    const init = async () => {
      if (AdConfig.activeNetwork === AdNetwork.ADMOB && mobileAds) {
        try {
          await mobileAds().initialize();
        } catch {}
      }
    };
    init();
  }, []);

  return null;
};
