import { useMemo } from 'react';

export interface BOMCalculatorInput {
  area?: number | null;
  spacingRow?: number | null;
  spacingPlant?: number | null;
}

export interface BOMCalculatorResult {
  sprinklerCount: number;
  branchPipeLength: number;
  mainPipeLength: number;
  estimatedCost: number;
}

export function useBOMCalculator({
  area,
  spacingRow,
  spacingPlant,
}: BOMCalculatorInput) {
  return useMemo(() => {
    const hasValidInput = Boolean(
      area &&
      spacingRow &&
      spacingPlant &&
      area > 0 &&
      spacingRow > 0 &&
      spacingPlant > 0,
    );

    if (!hasValidInput) {
      return {
        hasValidInput: false,
        calculation: null as BOMCalculatorResult | null,
      };
    }

    const sprinklerCount = Math.ceil(area / (spacingRow * spacingPlant));
    const branchPipeLength = Math.ceil((area / spacingRow) * 1.1);
    const mainPipeLength = Math.ceil(Math.sqrt(area) * 1.1);
    const estimatedCost =
      (sprinklerCount * 15000) +
      (branchPipeLength * 5000) +
      (mainPipeLength * 20000);

    return {
      hasValidInput: true,
      calculation: {
        sprinklerCount,
        branchPipeLength,
        mainPipeLength,
        estimatedCost,
      },
    };
  }, [area, spacingPlant, spacingRow]);
}
