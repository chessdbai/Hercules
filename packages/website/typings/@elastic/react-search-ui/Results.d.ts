declare module '@elastic/react-search-ui' {

  import React from 'react';

  export interface ResultsProps {
    titleField: string,
    urlField: string,
    shouldTrackClickThrough: boolean
  }

  export class Results extends React.Component<ResultsProps> {

  }

}