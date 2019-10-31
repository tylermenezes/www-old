import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {};

theme.modularScaleConfig = {
  ratio: 1.33,
  base: 14,
}
theme.modularScale = (pow) => `${Math.pow(theme.modularScaleConfig.ratio, pow) * theme.modularScaleConfig.base}px`;
theme.maxWidth = '1000px';
theme.columns = 12;
theme.columnPadding = theme.modularScale(1);

theme.font = {
  headLarge: `'Abril Fatface', cursive`,
  head: `'Frank Ruhl Libre', serif`,
  body: `'Frank Ruhl Libre', serif`,
  mono: `'Ubuntu Mono', monospace`,
};

theme.color = {
  black: '#382235',
  white: '#ffffff',
  grey: ['#71566e', '#a98ea6', '#e0d6df'],
  blue: ['#1E6B93', '#67C9E8'],
}
theme.color.primary = theme.color.black;
theme.color.background = theme.color.white;
theme.color.accent = theme.color.blue[0];


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Abril+Fatface|Frank+Ruhl+Libre|Ubuntu+Mono&display=swap');

  a, a:visited {
    color: ${({ theme }) => theme.color.accent};
  }

  h2 {
    font-family: ${({ theme }) => theme.font.headLarge};
    font-weight: 500;
    font-size: ${({ theme }) => theme.modularScale(3)};
    margin-top: ${({ theme }) => theme.modularScale(5)};
    margin-bottom: ${({ theme }) => theme.modularScale(0)};
  }

  h3 {
    font-size: ${({ theme }) => theme.modularScale(1)};
    margin-top: ${({ theme }) => theme.modularScale(3)};
    margin-bottom: ${({ theme }) => theme.modularScale(0)};
  }

  & :not(pre) > code {
    border: 1px solid ${({ theme }) => theme.color.grey[2]};
    padding: 3px 5px;
    border-radius: 2px;
    position: relative;
    top: -1px;
    font-size-adjust: 0.4;
  }

  pre code {
    font-size: ${({ theme }) => theme.modularScale(0)};
    display: block;
    border: 1px solid ${({ theme }) => theme.color.grey[2]};
    padding: ${({ theme }) => theme.columnPadding};
    overflow-x: auto;
    font-size-adjust: unset;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.font.body};
    font-size: ${({ theme }) => theme.modularScale(1)};
    padding: 0 ${({ theme }) => theme.columnPadding};
    margin: 0;
    color: ${({ theme }) => theme.color.black};
  }
`;
export default ({ children }) => <ThemeProvider theme={theme}><GlobalStyle />{children}</ThemeProvider>;
