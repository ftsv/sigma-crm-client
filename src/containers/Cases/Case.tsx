import React from 'react';

interface CaseProps {
    caseItem: number;

}

class Case extends React.Component<CaseProps> {
    static defaultProps = {
        caseItem: 0,
    }

    
    render() {
        return (
            <div>
                Дело № НОМЕР
            </div>
        );
    }
}

export default Case;
