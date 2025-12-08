import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'GoaliePass',
  webDir: 'dist',
  server: {
    cleartext: true
  },
  android: {
    "allowMixedContent": true
  }
};

export default config;
