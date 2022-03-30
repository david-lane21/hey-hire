import {createFilter} from 'redux-persist-transform-filter';

const JobDetailFilter = createFilter('JobDetail', [
    'jobs'
]);

export const AllFilters = [JobDetailFilter];