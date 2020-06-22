import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';

const NewPlace = () => {
    return <form className="palce-form">
        <Input element="input" label="Title" />
    </form>
};

export default NewPlace;