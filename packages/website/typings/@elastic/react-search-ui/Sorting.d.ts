declare module '@elastic/react-search-ui' {

  import React from 'react';

  export interface SortingOptions {
    name: string,
    value: string,
    direction: string
  }

  export interface SortingProps {
    label: string,
    sortOptions: SortingOptions
  }

  export class Sorting extends React.Component<SortingProps,{}> {

  }

}