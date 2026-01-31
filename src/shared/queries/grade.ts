import { queryOptions } from '@tanstack/react-query';
import { getGradePoint } from '../api/fetcher';

export const gradeQueries = {
  point: () =>
    queryOptions({
      queryKey: ['grade', 'point'],
      queryFn: () => getGradePoint(),
    }),
};
