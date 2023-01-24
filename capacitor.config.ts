import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'music',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
		url: 'http://192.168.116.75:3000',
		cleartext: true
	}
};

export default config;
