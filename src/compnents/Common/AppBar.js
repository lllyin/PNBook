/**
 *  created by ling on 2017-12-25 09:09.
 */

import React from "react";
import { NavBar, Icon } from 'antd-mobile';

const AppBar = () => {
    return(
        <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                ]}
            >PNBook</NavBar>
        </div>
    )
};

export default AppBar;