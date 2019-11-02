import React from 'react';

export const themes = {
  light: {
    foreground: 'rgba(254,254,254,1)',
    background: 'rgba(1,172,236,1)'
  },
  dark: {
    foreground: 'rgba(1,172,236,1)',
    background: 'rgba(254,254,254,1)'
  }
}
// ThemeContext 数据来源
export const ThemeContext = React.createContext(
  themes.dark
)