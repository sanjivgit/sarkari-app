import { useEffect, useRef, useCallback, useState } from 'react';
import { AdConfig } from '../AdConfig';

let AdMobInterstitial: any = null;

try {
  AdMobInterstitial = require('react-native-google-mobile-ads').InterstitialAd;
} catch {}

let navigationCount = 0;

export function useInterstitialAd() {
  const adMobInstance = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadAd = useCallback(() => {
    if (!AdMobInterstitial) return;
    const interstitial = AdMobInterstitial.createForAdRequest(AdConfig.unitIds.interstitial);
    interstitial.addAdEventListener('loaded', () => setIsLoaded(true));
    interstitial.addAdEventListener('closed', () => {
      setIsLoaded(false);
      setTimeout(loadAd, 1000);
    });
    interstitial.addAdEventListener('error', () => setIsLoaded(false));
    interstitial.load();
    adMobInstance.current = interstitial;
  }, []);

  const showInterstitial = useCallback(() => {
    if (!AdConfig.enableInterstitialAds || !adMobInstance.current) return;

    navigationCount++;
    if (navigationCount % AdConfig.interstitialFrequency !== 0) return;

    try {
      adMobInstance.current.show();
      setIsLoaded(false);
    } catch {}
  }, []);

  const showNow = useCallback(() => {
    if (!AdConfig.enableInterstitialAds || !adMobInstance.current) return;
    try {
      adMobInstance.current.show();
      setIsLoaded(false);
    } catch {}
  }, []);

  useEffect(() => {
    if (AdConfig.enableInterstitialAds) loadAd();
  }, [loadAd]);

  return { showInterstitial, showNow, isLoaded };
}
