import { useCallback, useRef, useEffect, useState } from 'react';
import { AdConfig } from '../AdConfig';

let AdMobRewarded: any = null;

try {
  AdMobRewarded = require('react-native-google-mobile-ads').RewardedAd;
} catch {}

export function useRewardedAd() {
  const rewardedAd = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadAd = useCallback(() => {
    if (!AdConfig.enableRewardedAds || !AdMobRewarded) return;
    const ad = AdMobRewarded.createForAdRequest(AdConfig.unitIds.rewarded);
    ad.addAdEventListener('loaded', () => setIsLoaded(true));
    ad.addAdEventListener('closed', () => {
      setIsLoaded(false);
      setTimeout(loadAd, 2000);
    });
    ad.addAdEventListener('error', () => setIsLoaded(false));
    ad.load();
    rewardedAd.current = ad;
  }, []);

  const showAd = useCallback(() => {
    if (!AdConfig.enableRewardedAds || !rewardedAd.current) return;
    try {
      rewardedAd.current.show();
      setIsLoaded(false);
    } catch {}
  }, []);

  useEffect(() => {
    if (AdConfig.enableRewardedAds) loadAd();
  }, [loadAd]);

  return { showRewardedAd: showAd, loadRewardedAd: loadAd, isLoaded };
}
