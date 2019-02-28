import uniqueId from 'lodash/uniqueId';
import React from 'react';
import Sortable from 'react-sortablejs';

// Functional Component
const SharedList = ({ items, listType }) => {
    items = items.map(val => (<li key={uniqueId()} data-id={val}>{val}</li>));

    return (
        <Sortable
            // See all Sortable options at https://github.com/RubaXa/Sortable#options
            options={{
                group: 'shared'
            }}
            tag={listType}
        >
            {items}
        </Sortable>
    );
};

export default SharedList;
