
import React from 'react';

const PriceFilter = ({ maxPrice, setMaxPrice }) => {
    return (
        <div className="filter-container">
            <label>
                Filter by price:
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    step="1"
                    style={{ width: '200px' }}
                />
            </label>
            <p>Maximum Price: ₪{maxPrice}</p>
        </div>
    );
};

export default PriceFilter;