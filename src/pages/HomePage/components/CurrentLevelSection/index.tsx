import { gradeQueries } from '@/shared/queries/grade';
import { meQueries } from '@/shared/queries/me';
import { ErrorSection } from '@/shared/ui/ErrorSection';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQueries } from '@suspensive/react-query';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Box, Flex, styled } from 'styled-system/jsx';
import { calculateProgressRatio, calculateRemainingPoints, findNextGrade } from './utils';

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
                  const nextGrade = findNextGrade({
                    currentGrade: meData.grade,
                    gradePointList: pointData.gradePointList,
                  });

                  const progressRatio = calculateProgressRatio({
                    currentPoint: meData.point,
                    currentGradeStartPoint: pointData.gradePointList.find(g => g.type === meData.grade)?.minPoint ?? 0,
                    nextGradeStartPoint: nextGrade?.minPoint,
                  });

                  const remainingPoints = calculateRemainingPoints({
                    currentPoint: meData.point,
                    targetPoint: nextGrade ? nextGrade.minPoint : meData.point,
                  });

                  return (
                    <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
                      <Flex flexDir="column" gap={2}>
                        <Text variant="H2_Bold">{meData.grade}</Text>

                        <ProgressBar value={progressRatio} size="xs" />

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
                              {remainingPoints.toFixed(1)}p
                            </Text>
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                  );
                }}
              </SuspenseQueries>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </styled.section>
  );
}
