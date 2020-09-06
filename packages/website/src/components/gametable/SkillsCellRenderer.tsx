import React from 'react';
import * as PropTypes from 'prop-types';
import RefData from './RefData';

interface SkillsCellRendererProps {
  skills: any[],
  data: {
    skills: any
  }
}

export default class SkillsCellRenderer extends React.Component<SkillsCellRendererProps,{}> {

    render = () : React.ReactNode => {
        const skills : React.ReactNode[] = [];
        const rowData = this.props.data;
        RefData.IT_SKILLS.forEach((skill) => {
            if (rowData && rowData.skills && rowData.skills[skill]) {
                skills.push(<img key={skill} src={'images/skills/' + skill + '.png'} width={16} title={skill}/>);
            }
        });

        return <span>{skills}</span>;
    }

}