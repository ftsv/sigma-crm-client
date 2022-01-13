import React from 'react';

interface CurrencyFormatterProps {
(number: number,
currency?: 'RUR' | 'RUB' | 'USD',
country?: 'RU' | 'RUS' | 'USA',
): string;
}

const CurrencyFormatter: CurrencyFormatterProps = (
    number, 
    currency = 'RUB', 
    country = 'RU') => {
    let localeMatcher: string, localeCurrency: string;

    switch (country) {
        case 'USA':
            localeMatcher = 'en-US';
            break;
        case 'RU':
        case 'RUS':
        default:
            localeMatcher = 'ru-RU';
            break;
    }

    const newNumber = new Intl.NumberFormat(localeMatcher).format(number);

    switch (currency) {
        case 'USD':
            localeCurrency = '$';
            break;
        case 'RUB':
            return `${newNumber} руб.`
        case 'RUR':
        default:
            localeCurrency = '₽';
            break;
    }
    return `${localeCurrency} ${newNumber} `;
}

export default CurrencyFormatter;