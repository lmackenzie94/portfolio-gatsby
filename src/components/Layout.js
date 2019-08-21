import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { ThemeProvider, ColorMode } from 'theme-ui';
import { Global, css } from '@emotion/core';
import create from 'zustand';
import theme from 'theme';
import useSmoothScroll from 'hooks/useSmoothScroll';
import NetworkDetectorWithTheme from 'utils/networkDetectorWithTheme';

// css to be injected into global styles
import minireset from '!!raw-loader!theme/minireset.css';

const [useVideo] = create(set => ({
  currentVideo: null,
  actions: {
    set: id => set(() => ({ currentVideo: id })),
  },
}));

const GlobalContext = React.createContext();
GlobalContext.displayName = `Global`;

export const withGlobal = FunctionalComponent => props => (
  <FunctionalComponent {...props} {...useContext(GlobalContext)} />
);

function Layout({ location, children, data }) {
  useSmoothScroll();
  return (
    <GlobalContext.Provider value={{ foo: `bar`, bal: `baz`, useVideo }}>
      <Helmet />
      <Global
        styles={css`
          ${minireset}

          html {
            width: 100%;
            font-size: 125%;
          }
          body {
            font-size: 1rem;
            width: 100%;
            will-change: background-color;
            transition: background-color 0.2s ease-out;
            overflow-x: hidden;
            overflow-y: scroll;
          }
        `}
      />
      <ThemeProvider theme={theme}>
        <ColorMode />
        <NetworkDetectorWithTheme errorMessage="No internet connection" />
        <main style={{ position: `relative`, width: `100%` }}>{children}</main>
      </ThemeProvider>
    </GlobalContext.Provider>
  );
}

export default Layout;
