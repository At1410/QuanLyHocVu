import { useState } from 'react';

export const useSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return { searchQuery, handleSearch };
};
