module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './',
        },
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
          '.json',
        ],
      },
    ],
  ],
};
