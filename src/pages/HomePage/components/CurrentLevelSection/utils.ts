import type { GradePointList, GradeType } from '@/shared/api/schema';
import { minBy } from 'es-toolkit';

export const findNextGrade = ({
  currentGrade,
  gradePointList,
}: {
  currentGrade: GradeType;
  gradePointList: GradePointList[];
}) => {
  const currentGradeStartPoint = gradePointList.find(g => g.type === currentGrade)?.minPoint ?? 0;

  const isNextGrade = (grade: GradePointList, currentGradeStartPoint: number) =>
    grade.minPoint > currentGradeStartPoint;

  const getNextGrades = (gradePointList: GradePointList[], currentGradeStartPoint: number) =>
    gradePointList.filter(grade => isNextGrade(grade, currentGradeStartPoint));

  return minBy(getNextGrades(gradePointList, currentGradeStartPoint), grade => grade.minPoint);
};

export const calculateRemainingPoints = ({
  currentPoint,
  targetPoint,
}: {
  currentPoint: number;
  targetPoint: number;
}) => {
  return Math.max(0, targetPoint - currentPoint);
};

const MAX_RATIO = 1;
const MIN_RATIO = 0;

export const calculateProgressRatio = ({
  currentPoint,
  currentGradeStartPoint,
  nextGradeStartPoint,
}: {
  currentPoint: number;
  currentGradeStartPoint: number;
  nextGradeStartPoint: number | undefined;
}) => {
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
