import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AdConfig } from '../AdConfig';

let AdMobBanner: any = null;
let AdMobBannerSize: any = null;

try {
  const ads = require('react-native-google-mobile-ads');
  AdMobBanner = ads.BannerAd;
  AdMobBannerSize = ads.BannerAdSize;
} catch {}

interface BannerAdProps {
  size?: 'banner' | 'largeBanner' | 'mediumRectangle';
  style?: any;
}

const sizeMap: Record<string, any> = {
  banner: AdMobBannerSize?.BANNER,
  largeBanner: AdMobBannerSize?.LARGE_BANNER,
  mediumRectangle: AdMobBannerSize?.MEDIUM_RECTANGLE,
};

export const BannerAd: React.FC<BannerAdProps> = ({ size = 'banner', style }) => {
  if (!AdConfig.enableBannerAds || !AdMobBanner) return null;

  return (
    <View style={[styles.container, style]}>
      <AdMobBanner
        unitId={AdConfig.unitIds.banner}
        size={sizeMap[size] || AdMobBannerSize.BANNER}
      />
    </View>
  );
};

export const MediumRect: React.FC<{ style?: any }> = ({ style }) => (
  <BannerAd size="mediumRectangle" style={style} />
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F7FA',
    minHeight: 50,
  },
});
