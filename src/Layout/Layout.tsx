import React from 'react';
import './Resources/Scss/main.scss';

interface PropTypes {
 children : JSX.Element,
 pageTitle : string,
 headerJsx : () => JSX.Element
}

const Layout : React.FC<PropTypes> = ({children, pageTitle,headerJsx}) => {


    return (
        <main>
            <header>
                <span className='title'>{pageTitle}</span>
                {headerJsx()}
            </header>
            {children}
        </main>
    );
}

export default Layout;