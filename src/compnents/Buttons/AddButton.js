/**
 *  created by ling on 2017-12-25 17:23.
 */

import React from "react";
import {Icon} from 'antd-mobile';

const fixed = {
    position: "fixed",
    right: 15,
    bottom: 30,
    transform:"rotate(45deg)"
};

const AddButton = ({onClick}) => {
    return (
        <div style={fixed} onClick={onClick}>
            <Icon type="cross-circle-o" size="lg" color="purple"/>
        </div>
    )
};

export default AddButton;