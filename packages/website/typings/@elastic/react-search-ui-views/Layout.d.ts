declare module '@elastic/react-search-ui-views' {

  import React from 'react';

  export interface LayoutProps {
    header: React.ReactNode,
    sideContent: React.ReactNode,
    bodyContent: React.ReactNode,
    bodyHeader: React.ReactNode,
    bodyFooter: React.ReactNode
  }

  export class Layout extends React.Component<LayoutProps, {}> {

  }

}