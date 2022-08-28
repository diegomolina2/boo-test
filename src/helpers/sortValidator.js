'use strict'

exports.sortValidator = (value) => {
    const allowedSortValues = ['asc', 'desc', 'ascending', 'descending'];

    return allowedSortValues.includes(value);
}