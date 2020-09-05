declare module '@elastic/react-search-ui' {

  interface SearchContextParam {
    wasSearched: boolean
  }
  interface SearchContextProps {
    wasSearched: boolean
  }
  export function withSearch(mapContextToProps: (par: SearchContextParam) => SearchContextProps);

}