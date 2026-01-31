import { queryOptions } from '@tanstack/react-query';
import { getGradePoint, getGradeShipping } from '../api/fetcher';

export const gradeQueries = {
  point: () =>
    queryOptions({
      queryKey: ['grade', 'point'],
      queryFn: () => getGradePoint(),
    }),
  shipping: () =>
    queryOptions({
      queryKey: ['grade', 'shipping'],
      queryFn: () => getGradeShipping(),
    }),
};
