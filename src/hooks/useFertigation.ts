import { useMemo } from 'react';

export interface FertigationInput {
  tankVolume?: number | null;
  fertilizerWeight?: number | null;
  venturiFlow?: number | null;
}

export interface FertigationResult {
  isCalculated: boolean;
  injectionTime: number | null;
  warningMessage: string | null;
  isSafe: boolean;
  minRequiredVolume: number;
}

const SOLUBILITY_RATIO = 3; // 3L nước cho 1kg phân

export function useFertigation({
  tankVolume,
  fertilizerWeight,
  venturiFlow,
}: FertigationInput): FertigationResult {
  return useMemo(() => {
    const hasValidInput = Boolean(
      tankVolume &&
      fertilizerWeight &&
      venturiFlow &&
      tankVolume > 0 &&
      fertilizerWeight > 0 &&
      venturiFlow > 0,
    );

    if (!hasValidInput) {
      return {
        isCalculated: false,
        injectionTime: null,
        warningMessage: null,
        isSafe: false,
        minRequiredVolume: 0,
      };
    }

    const minRequiredVolume = fertilizerWeight * SOLUBILITY_RATIO;
    const isSafe = tankVolume >= minRequiredVolume;

    if (!isSafe) {
      return {
        isCalculated: true,
        injectionTime: null,
        warningMessage: `Cảnh báo: Pha quá đặc (Cần tối thiểu ${minRequiredVolume}L nước cho ${fertilizerWeight}kg phân). Phân có thể không tan hết gây nghẹt béc. Hãy chia làm 2 mẻ hoặc dùng bồn lớn hơn.`,
        isSafe: false,
        minRequiredVolume,
      };
    }

    // Tính thời gian châm (phút) = (tankVolume / venturiFlow) * 60
    const injectionTime = Math.ceil((tankVolume / venturiFlow) * 60);

    return {
      isCalculated: true,
      injectionTime,
      warningMessage: null,
      isSafe: true,
      minRequiredVolume,
    };
  }, [tankVolume, fertilizerWeight, venturiFlow]);
}
