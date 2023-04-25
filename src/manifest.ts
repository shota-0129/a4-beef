import { ManifestV3Export } from '@crxjs/vite-plugin';

const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: 'Gmail Automatic Creation',
  description: 'Automate the creation of emails in gmail using GPT3.5',
  version: '1.0',
  background: {
    service_worker: 'src/background/index.ts',
  },
  content_scripts: [
    {
      matches: ['https://mail.google.com/*'],
      js: ['src/content/index.tsx'],
    },
  ],
  options_ui: {
    page: 'src/options/options.html',
    open_in_tab: true,
  },
  web_accessible_resources: [
    {
      resources: [
        // this file is web accessible; it supports HMR b/c it's declared in `rollupOptions.input`
        'src/welcome/welcome.html',
      ],
      matches: ['<all_urls>'],
    },
  ],
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
  permissions: ['storage', 'tabs'],
};

export default manifest;
