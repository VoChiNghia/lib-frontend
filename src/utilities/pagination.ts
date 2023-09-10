const range = (firstIndex: number, lastIndex: number): number[] => {
  let range: number[] = [];
  for (let i = firstIndex; i < lastIndex; i++) {
    range.push(i);
  }
  return range;
};

const pagination = ( pageSize: number, currentPage: number, truncateTwoSide: number) => {
  let totalIndex = 7 + truncateTwoSide;
  if (totalIndex >= pageSize) {
    return range(1, pageSize + 1);
  }
  let left: number = Math.max(currentPage - truncateTwoSide, 1);
  let showLeftDot: boolean = left > 2;
  let showRightDot: boolean = left < pageSize - 2;
  if (!showLeftDot && showRightDot) {
    let leftItemCount: number = 3 + 2 * truncateTwoSide;
    let leftRange: number[] = range(1, leftItemCount + 1);
    return [...leftRange, "...", pageSize];
  } else if (showLeftDot && !showRightDot) {
    let rightRange: number[] = range(left, pageSize + 1);
    return [1, "...", ...rightRange];
  } else {
    let middleRange: number[] = range(left, left + 3);
    return [1, "...", ...middleRange, "...", pageSize];
  }
};

export default pagination;
