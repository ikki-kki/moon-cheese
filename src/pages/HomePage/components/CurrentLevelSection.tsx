import ErrorSection from '@/components/ErrorSection';
import type { GradePointList, GradeType } from '@/shared/api/schema';
import { gradeQueries } from '@/shared/queries/grade';
import { meQueries } from '@/shared/queries/me';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQueries } from '@suspensive/react-query';
import { minBy } from 'es-toolkit';
import { Box, Flex, styled } from 'styled-system/jsx';

function CurrentLevelSection() {
  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>

      <Spacing size={4} />

      <ErrorBoundary fallback={<ErrorSection />}>
        <Suspense>
          <SuspenseQueries queries={[meQueries.me(), gradeQueries.point()]}>
            {([{ data: meData }, { data: pointData }]) => {
              const nextGrade = findNextGrade({
                currentGrade: meData.grade,
                gradePointList: pointData.gradePointList,
              });

              const progressRatio = calculateProgressRatio({
                currentPoint: meData.point,
                currentGradeMin: pointData.gradePointList.find(g => g.type === meData.grade)?.minPoint ?? 0,
                nextGradeMin: nextGrade?.minPoint,
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
    </styled.section>
  );
}

export default CurrentLevelSection;

const findNextGrade = ({
  currentGrade,
  gradePointList,
}: {
  currentGrade: GradeType;
  gradePointList: GradePointList[];
}) => {
  const currentMin = gradePointList.find(g => g.type === currentGrade)?.minPoint ?? 0;

  return minBy(
    gradePointList.filter(g => g.minPoint > currentMin),
    g => g.minPoint
  );
};

const calculateRemainingPoints = ({ currentPoint, targetPoint }: { currentPoint: number; targetPoint: number }) => {
  return Math.max(0, targetPoint - currentPoint);
};

const calculateProgressRatio = ({
  currentPoint,
  currentGradeMin,
  nextGradeMin,
}: {
  currentPoint: number;
  currentGradeMin: number;
  nextGradeMin: number | undefined;
}) => {
  if (nextGradeMin === undefined) {
    return 1;
  }

  const totalRange = nextGradeMin - currentGradeMin;
  const earnedInRange = currentPoint - currentGradeMin;

  if (totalRange <= 0) {
    return 1;
  }
  return Math.max(0, Math.min(1, earnedInRange / totalRange));
};
