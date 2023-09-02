import type { ThemeColor } from '@a-luna/shared-ui';

export type ThemeColorShallowCopy = Omit<ThemeColor, 'color' | 'isSelected' | 'colorSpace' | 'colorInGamut'>;
