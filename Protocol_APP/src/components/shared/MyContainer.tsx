import { observer } from 'mobx-react-lite'
import React from 'react'
import { Helmet } from 'react-helmet';

interface Props {
    children: React.ReactNode;
    title?: string;
    head?: string;
    size?: string;
}

const MyContainer: React.FC<Props> = ({ children, title, head, size }) => {
    return (
        <div className="layout-px-spacing">
            {
                title &&
                <Helmet>
                    <title>{title}</title>
                </Helmet>
            }
            <div className="row" id="cancel-row">
                <div className={`${size ? size : "container"} layout-spacing layout-top-spacing`}>
                    <div className="statbox widget box box-shadow">
                        <div className="widget-content widget-content-area">
                            {
                                head &&
                                <div className="row">
                                    <div className="container">
                                        <h4>{head}</h4>
                                        <hr style={{ marginTop: "5px", marginBottom: "15px" }} />
                                    </div>
                                </div>
                            }
                            {children}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default observer(MyContainer);
