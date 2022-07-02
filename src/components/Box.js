import React from 'react';
import styles from './Box.module.css';

const Box = ({value,onBoxClick}) => {

    const boxClasses = `${styles.box} ${value==="X"?styles.x_value:styles.o_value}`;
    return (
        <div className={boxClasses} onClick={onBoxClick}  >
            {value}
        </div>
    )
}

export default Box;
