declare module '@elastic/react-search-ui' {

  import React from 'react';

  export interface ErrorBoundaryProps {
    children: React.ReactNode[]
  }

  export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {

  }

}