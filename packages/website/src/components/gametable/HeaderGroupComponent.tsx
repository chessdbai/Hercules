import React from 'react';

interface HeaderGroupComponentProps {
  columnGroup: any,
  displayName: string,
  setExpanded: (expanded: boolean) => void
}

interface HeaderGroupComponentState {
  expanded: boolean | null
}

// Header component to be used as default for all the columns.
export default class HeaderGroupComponent
    extends React.Component<HeaderGroupComponentProps,HeaderGroupComponentState> {

    constructor(props: HeaderGroupComponentProps) {
        super(props);
        this.props.columnGroup.getOriginalColumnGroup().addEventListener('expandedChanged', this.onExpandChanged.bind(this));
        this.state = {
            expanded: null
        };
    }

    componentDidMount() {
        this.onExpandChanged();
    }

    render() {
        let arrowClassName = "customExpandButton " + (this.state.expanded ? " expanded" : " collapsed");

        return <div>
            <div className="customHeaderLabel"> {this.props.displayName}</div>
            <div onClick={this.expandOrCollapse.bind(this)} className={arrowClassName}><i
                className="fa fa-arrow-right"/></div>
        </div>
    }

    expandOrCollapse() {
        this.props.setExpanded(!this.state.expanded);
    };

    onExpandChanged() {
        this.setState({
            expanded: this.props.columnGroup.getOriginalColumnGroup().isExpanded()
        })
    }
}