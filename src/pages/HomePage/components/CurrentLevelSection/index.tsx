import type { GradePointList, MeResponse } from '@/shared/api/schema';
import { gradeQueries } from '@/shared/queries/grade';
import { meQueries } from '@/shared/queries/me';
import { ErrorSection } from '@/shared/ui/ErrorSection';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQueries } from '@suspensive/react-query';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Box, Flex, styled } from 'styled-system/jsx';
import { getGradeProgress, getPointsToNextGrade } from './utils';

export function CurrentLevelSection() {
  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>

      <Spacing size={4} />

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={<ErrorSection onRetry={reset} />}>
            <Suspense>
              <SuspenseQueries queries={[meQueries.me(), gradeQueries.point()]}>
                {([{ data: meData }, { data: pointData }]) => {
                  return <MyGradeSection meData={meData} gradePointList={pointData.gradePointList} />;
                }}
              </SuspenseQueries>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </styled.section>
  );
}

function MyGradeSection({ meData, gradePointList }: { meData: MeResponse; gradePointList: GradePointList[] }) {
  const progress = getGradeProgress({
    currentPoint: meData.point,
    myGrade: meData.grade,
    gradePointList,
  });

  const nextPoints = getPointsToNextGrade({
    currentPoint: meData.point,
    myGrade: meData.grade,
    gradePointList,
  });

  return (
    <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
      <Flex flexDir="column" gap={2}>
        <Text variant="H2_Bold">{meData.grade}</Text>

        <ProgressBar value={progress} size="xs" />

        <Flex justifyContent="space-between">
          <Box textAlign="left">
            <Text variant="C1_Bold">현재 포인트</Text>
            <Text variant="C2_Regular" color="neutral.03_gray">
              {meData.point.toFixed(1)}p
            </Text>
          </Box>
          <Box textAlign="right">
            <Text variant="C1_Bold">다음 등급까지</Text>
            <Text variant="C2_Regular" color="neutral.03_gray">
              {nextPoints.toFixed(1)}p
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
