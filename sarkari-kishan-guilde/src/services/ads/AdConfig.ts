export enum AdNetwork {
  ADMOB = 'admob',
  FACEBOOK = 'facebook',
}

export type AdUnitIds = {
  banner: string;
  interstitial: string;
  rewarded: string;
  appOpen: string;
};

export const AdConfig = {
  activeNetwork: AdNetwork.ADMOB as AdNetwork,

  units: {
    [AdNetwork.ADMOB]: {
      banner: 'ca-app-pub-1301360281595770/2035768832',  // 'ca-app-pub-3940256099942544/6300978111',   //
      interstitial: 'ca-app-pub-1301360281595770/8736908555',  // 'ca-app-pub-3940256099942544/1033173712',   //
      rewarded: 'ca-app-pub-1301360281595770/4606091856',    // 'ca-app-pub-3940256099942544/5224354917',    //
      appOpen: 'ca-app-pub-1301360281595770/9323653372',   // 'ca-app-pub-3940256099942544/5575463023',   //
    },
    [AdNetwork.FACEBOOK]: {
      banner: 'IMG_16_9_APP_INSTALL#YOUR_PLACEMENT_ID',
      interstitial: 'IMG_16_9_APP_INSTALL#YOUR_PLACEMENT_ID',
      rewarded: 'VID_HD_16_9_15S_APP_INSTALL#YOUR_PLACEMENT_ID',
      appOpen: 'IMG_16_9_APP_INSTALL#YOUR_PLACEMENT_ID',
    },
  } as Record<AdNetwork, AdUnitIds>,

  get unitIds() {
    return this.units[this.activeNetwork];
  },

  enableBannerAds: true,
  enableInterstitialAds: true,
  enableRewardedAds: true,
  enableAppOpenAd: true,
  interstitialFrequency: 2,
};
