module.exports = {
    nameNormalizator: (name = '') => {
        if (!name) {
            return '';
        }

        name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        name = name.replace(/[.,@&~|<>:;({}#*?!_+=%-]/g, ' ');
        name = name.split(' ').filter((char) => !!char);
        name = name.map((string) => string.toLowerCase()); // [john,DOE] => [john,doe]
        name = name.map((string) => string.charAt(0).toUpperCase() + string.slice(1)); // [john,DOE] => [John,Doe]
        name = name.join(' ').trim(); // [John,Doe] => John Doe

        return name;
    }
};
