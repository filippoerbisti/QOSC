import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.vercel.qosc',
  appName: 'QOSC',
  webDir: 'out',
  bundledWebRuntime: false,
  // server: {
	// 	url: 'http://192.168.116.75:3000',
	// 	cleartext: true
	// }
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
};

export default config;
