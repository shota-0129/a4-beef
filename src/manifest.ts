import { ManifestV3Export } from '@crxjs/vite-plugin';

const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: 'Beef#',
  description: 'めちゃめちゃ神大生入れてね',
  version: '1.0',
  background: {
    service_worker: 'src/background/index.ts',
  },
  content_scripts: [
    {
      matches: ['https://kym22-web.ofc.kobe-u.ac.jp/campusweb/campussquare.do*'],
      js: ['src/content/index.tsx'],
    },
  ],
  host_permissions: ['<all_urls>'],
  options_ui: {
    page: 'src/options/options.html',
    open_in_tab: true,
  },
  action: {
    default_popup: 'src/popup/popup.html',
    default_icon: {
      '16': 'images/icons_16.png',
      '32': 'images/icons_32.png',
      '48': 'images/icons_48.png',
      '128': 'images/icons_128.png',
    },
  },
  icons: {
    '16': 'images/icons_16.png',
    '32': 'images/icons_32.png',
    '48': 'images/icons_48.png',
    '128': 'images/icons_128.png',
  },
  permissions: ['storage', 'alarms'],
};

export default manifest;
