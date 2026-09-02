export const formatCurrency = (value, currency = 'EUR') => {
    return value.toLocaleString('it-IT', { style: 'currency', currency })
}