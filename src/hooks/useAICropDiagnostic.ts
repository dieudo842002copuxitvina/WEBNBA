import { useState, useCallback } from 'react';

export interface AICropDiagnosticInput {
  imageFile?: File | null;
  imagePreviewUrl?: string | null;
}

export interface DiagnosticResult {
  confidence: number;
  diseaseName: string;
  description: string;
  treatment: string;
  preventionTips: string[];
  suggestedProducts: Array<{
    id: string;
    name: string;
    activeIngredient: string;
  }>;
}

export function useAICropDiagnostic() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file ảnh hợp lệ.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Kích thước ảnh không vượt quá 5MB.');
      return;
    }

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreviewUrl(previewUrl);
    setError(null);
    setResult(null);
  }, []);

  const analyzeDiagnosis = useCallback(async () => {
    if (!imageFile) return;

    setIsScanning(true);
    setError(null);

    try {
      // Mock API call: 3 seconds delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock Result - Simulate diagnosis
      const mockResult: DiagnosticResult = {
        confidence: 94,
        diseaseName: 'Nấm Hồng / Tuyến Trùng Rễ',
        description:
          'Cây bị nhiễm nấm hồng Fusarium sp. gây thối rễ và héo lá. Đây là bệnh nguy hiểm gây tổn thất 30-50% năng suất nếu không xử lý kịp thời.',
        treatment:
          'Sử dụng thuốc diệt nấm chứa hoạt chất Hexaconazole 5% hoặc Propiconazole 25% EC. Kết hợp tưới Trichoderma harzianum vào gốc cây. Lặp lại mỗi 7-10 ngày cho đến hết triệu chứng.',
        preventionTips: [
          'Lựa chọn giống cây có khả năng chống bệnh cao.',
          'Quản lý nước tưới: Không tưới quá nhiều, đảm bảo thoát nước tốt.',
          'Vệ sinh dụng cụ làm vườn và khử trùng đất trước khi trồng.',
          'Xoay vòng cây trồng hàng năm để phá vòng sống của nấm bệnh.',
        ],
        suggestedProducts: [
          {
            id: 'hexaconazole-5',
            name: 'Thuốc Diệt Nấm Hexaconazole 5% EC',
            activeIngredient: 'Hexaconazole',
          },
          {
            id: 'trichoderma-1',
            name: 'Trichoderma harzianum (Vi sinh diệt nấm)',
            activeIngredient: 'Trichoderma harzianum',
          },
          {
            id: 'humic-acid',
            name: 'Axit Humic (Tăng sức đề kháng cây)',
            activeIngredient: 'Humic Acid',
          },
        ],
      };

      setResult(mockResult);
    } catch (err) {
      setError('Có lỗi xảy ra khi phân tích. Vui lòng thử lại.');
    } finally {
      setIsScanning(false);
    }
  }, [imageFile]);

  const resetDiagnosis = useCallback(() => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setImageFile(null);
    setImagePreviewUrl(null);
    setResult(null);
    setError(null);
    setIsScanning(false);
  }, [imagePreviewUrl]);

  return {
    imageFile,
    imagePreviewUrl,
    isScanning,
    result,
    error,
    handleImageSelect,
    analyzeDiagnosis,
    resetDiagnosis,
  };
}
