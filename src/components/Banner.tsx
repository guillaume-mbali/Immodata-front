import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';

function Banner() {
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const router = useRouter();

    const fetchSuggestions = async (value) => {
        try {
            const response = await fetch(
                `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(value)}`
            );
            const data = await response.json();

            if (data.features) {
                const suggestions = data.features.map((feature) => feature.properties.label);
                setSuggestions(suggestions);
            }
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
        }
    };

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

    const handleInputChange = (event, { newValue }) => {
        setSearchInput(newValue);
    };

    const handleSuggestionSelected = (event, { suggestion }) => {
        setSearchInput(suggestion);
    };

    const handleSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
            },
        });
    };

    const getSuggestionValue = (suggestion) => suggestion;
    const renderSuggestion = (suggestion) => (
        <div className="flex flex-col">
            <span className="my-1 ml-5">{suggestion}</span>
            <hr className="my-1 border-gray-200" />
        </div>
    );

    const inputProps = {
        placeholder: '10 place du marché, 92 000 Boulogne-Billancourt',
        value: searchInput,
        onChange: handleInputChange,
        className: 'pl-5 bg-white outline-none w-full h-10 rounded-md'
    };

    return (
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[700px] 2xl:h-[700px] flex max-w-7xl mx-auto pt-24">
            <div className="grid grid-cols-2 w-full">
                <div>
                    <h2 className="text-4xl">
                        Estimez un bien immobilier gratuitement sur le site de référence
                    </h2>
                    <div className="flex flex-col space-x py-5 gap-2 mt-5 w-2/3">
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={({ value }) => debouncedFetchSuggestions(value)}
                            onSuggestionsClearRequested={() => setSuggestions([])}
                            onSuggestionSelected={handleSuggestionSelected}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                            renderSuggestionsContainer={({ containerProps, children }) => (
                                <div
                                    {...containerProps}
                                    className="bg-white w-76 mt-2 rounded-lg shadow-lg border border-white-900 z-10 relative"
                                >
                                    {children}
                                </div>
                            )}
                        />
                    </div>
                    <button onClick={handleSearch} className="bg-violet-500 text-white p-2 rounded-md absolute">
                        Estimer
                    </button>
                </div>
                <div></div>
            </div>
        </div >
    );
}

export default Banner;
