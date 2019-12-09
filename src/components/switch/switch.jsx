import React from 'react';

const Switch = ({onChange, checked}) => {
  
    return(
        <div className="onoffswitch">
            <input onChange={onChange} type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" checked={checked} />
            <label className="onoffswitch-label" htmlFor="myonoffswitch">
                <span className="onoffswitch-inner"></span>
                <span className="onoffswitch-switch"></span>
            </label>
        </div>
    )
}

export default Switch;