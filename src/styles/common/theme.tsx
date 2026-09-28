import type { PropsWithChildren } from 'react';
import { ConfigProvider, type ThemeConfig } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import { fontFamily, palette, sizes } from './variables';

const theme: ThemeConfig = {
  token: {
    colorPrimary: palette.primary,
    colorInfo: palette.primary,
    colorSuccess: palette.success,
    colorError: palette.error,
    colorText: palette.text,
    colorTextSecondary: palette.secondary,
    colorBgLayout: palette.background,
    colorBorder: palette.border,
    fontFamily,
    borderRadius: sizes.radius,
    controlHeight: 42,
  },
  components: {
    Button: { primaryShadow: 'none' },
    Input: { activeShadow: '0 0 0 2px #606dea1a' },
    Layout: { headerBg: palette.surface, siderBg: palette.surface },
  },
};
const ThemeProvider = ({ children }: PropsWithChildren) => (
    <ConfigProvider locale={ruRU} theme={theme}>
      {children}
    </ConfigProvider>
  );

export default ThemeProvider;
