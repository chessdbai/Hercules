declare module '@elastic/react-search-ui' {

  import React from 'react';

  export interface FacetProps {
    /**
    * The field of the search document.
    */
    field?: string,
    /**
    * The label for the UI.
    */
    label?: string,
    /**
    * The type of filter.
    */
    filterType?: string,
    isFilterable?: boolean
  }

  /**
   * A facet or property to search on.
   */
  export class Facet extends React.Component<FacetProps,{}> {

  }

}