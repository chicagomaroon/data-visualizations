import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

const Headline = () => {
    return (
        <div className="headerdiv">
            <h1 id="header">
                {' '}
                $16.6 Million in Terminated Federal Research Grants at UChicago,
                Visualized{' '}
            </h1>
            <h2 id="subhead">
                The <i>Maroon</i> used publicly available data to track millions
                of dollars in research grants that were terminated at UChicago
                last spring, as the Trump administration cut funding for
                universities nationwide.
            </h2>
        </div>
    );
};

const Byline = () => {
    return (
        <div className="headerdiv" style={{ marginTop: '30px' }}>
            <p className="byline">
                Written and Data Collected by:{' '}
                <a
                    className="byline_link"
                    href="https://chicagomaroon.com/staff_name/celeste-alcalay/"
                >
                    Celeste Alcalay
                </a>{' '}
                and{' '}
                <a
                    className="byline_link"
                    href="https://chicagomaroon.com/staff_name/gabriel-kraemer/"
                >
                    Gabriel Kraemer
                </a>
            </p>
            <p className="byline">
                Graphics and Development by{' '}
                <a
                    className="byline_link"
                    href="https://chicagomaroon.com/staff_name/nolan-shaffer"
                >
                    Nolan Shaffer
                </a>
            </p>
            <p className="byline">September 1, 2025</p>
            <FontAwesomeIcon
                icon={faAngleDoubleDown}
                color="white"
                id="arrow"
                size="3x"
            />
        </div>
    );
};

const Header = ({ height }) => {
    return (
        <div id="intro-container" style={{ height: height + 'px' }}>
            <img id="maroon" src="maroon_logo_white.svg" />
            <Headline />
            <div id="separator"></div>
            <Byline />
        </div>
    );
};

export default Header;
