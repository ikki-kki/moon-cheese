import type { GradePointList, GradeType } from '@/shared/api/schema';
import { minBy } from 'es-toolkit';

const findNextGrade = ({ myGrade, gradePointList }: { myGrade: GradeType; gradePointList: GradePointList[] }) => {
  const currentGradeStartPoint = gradePointList.find(g => g.type === myGrade)?.minPoint ?? 0;

  const isNextGrade = (grade: GradePointList, startPoint: number) => grade.minPoint > startPoint;

  const nextCandidates = gradePointList.filter(grade => isNextGrade(grade, currentGradeStartPoint));
  return minBy(nextCandidates, grade => grade.minPoint);
};

const calculateRatio = ({
  currentPoint,
  currentGradeStartPoint,
  nextGradeStartPoint,
}: {
  currentPoint: number;
  currentGradeStartPoint: number;
  nextGradeStartPoint: number | undefined;
}) => {
  const MAX_RATIO = 1;
  const MIN_RATIO = 0;

  if (nextGradeStartPoint === undefined) {
    return MAX_RATIO;
  }

  const pointsToNextGrade = nextGradeStartPoint - currentGradeStartPoint;
  const earnedPoint = currentPoint - currentGradeStartPoint;

  if (pointsToNextGrade <= MIN_RATIO) {
    return MAX_RATIO;
  }

  return Math.max(MIN_RATIO, Math.min(MAX_RATIO, earnedPoint / pointsToNextGrade));
};

const calculateRemaining = ({ currentPoint, targetPoint }: { currentPoint: number; targetPoint: number }) => {
  return Math.max(0, targetPoint - currentPoint);
};

const getGradeProgress = ({
  currentPoint,
  myGrade,
  gradePointList,
}: {
  currentPoint: number;
  myGrade: GradeType;
  gradePointList: GradePointList[];
}) => {
  const currentGrade = gradePointList.find(g => g.type === myGrade);
  const currentStartPoint = currentGrade?.minPoint ?? 0;

  const nextGrade = findNextGrade({ myGrade, gradePointList });
  const nextStartPoint = nextGrade?.minPoint;

  return calculateRatio({
    currentPoint,
    currentGradeStartPoint: currentStartPoint,
    nextGradeStartPoint: nextStartPoint,
  });
};

const getPointsToNextGrade = ({
  currentPoint,
  myGrade,
  gradePointList,
}: {
  currentPoint: number;
  myGrade: GradeType;
  gradePointList: GradePointList[];
}) => {
  const nextGrade = findNextGrade({ myGrade, gradePointList });

  const targetPoint = nextGrade ? nextGrade.minPoint : currentPoint;

  return calculateRemaining({
    currentPoint,
    targetPoint,
  });
};

export { getGradeProgress, getPointsToNextGrade };
