module.exports = {
    objectBuilder: (query) => {
        const {
            limit = 10, page = 1, sortBy = 'createdAt', order = 'asc', ...filters
        } = query;
        const offSet = (page - 1) * limit;

        const keys = Object.keys(filters);
        const filterObject = {};
        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };

        return {
            limit, page, offSet, keys, filterObject, sort, filters
        };
    }
};
