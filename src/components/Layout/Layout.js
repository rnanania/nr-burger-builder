import React, {Fragment} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Layout.css';
const layout = (props) => {
    return (
        <Fragment>
            <div>
                <FontAwesomeIcon icon="home" size="lg" title="Home"/>
            </div>
            <main className="Content">
                {props.children}
            </main>
        </Fragment>
    );
};

export default layout;