import { useCallback, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

interface ExportOptions {
  filename?: string;
  quality?: number;
  scale?: number;
  format?: 'A4' | 'A3' | 'Letter';
  orientation?: 'portrait' | 'landscape';
}

interface ChartData {
  id: string;
  title: string;
  data: any[];
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'radar' | 'gauge' | 'sparkline';
}

export const useExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // Exportar gráfico individual como PNG
  const exportChartAsPNG = useCallback(async (
    elementId: string, 
    filename: string = 'chart.png',
    options: ExportOptions = {}
  ) => {
    try {
      setIsExporting(true);
      setExportProgress(0);

      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Elemento não encontrado');
      }

      setExportProgress(25);

      const canvas = await html2canvas(element, {
        scale: options.scale || 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
      });

      setExportProgress(75);

      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, filename);
          setExportProgress(100);
        }
      }, 'image/png', options.quality || 0.95);

    } catch (error) {
      console.error('Erro ao exportar PNG:', error);
      throw error;
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
      }, 1000);
    }
  }, []);

  // Exportar dashboard completo como PDF
  const exportDashboardAsPDF = useCallback(async (
    elementIds: string[],
    filename: string = 'dashboard.pdf',
    options: ExportOptions = {}
  ) => {
    try {
      setIsExporting(true);
      setExportProgress(0);

      const pdf = new jsPDF({
        orientation: options.orientation || 'portrait',
        unit: 'mm',
        format: options.format || 'A4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const contentWidth = pageWidth - (margin * 2);
      const contentHeight = pageHeight - (margin * 2);

      let currentY = margin;

      for (let i = 0; i < elementIds.length; i++) {
        const elementId = elementIds[i];
        const element = document.getElementById(elementId);
        
        if (!element) {
          console.warn(`Elemento ${elementId} não encontrado`);
          continue;
        }

        setExportProgress((i / elementIds.length) * 80);

        const canvas = await html2canvas(element, {
          scale: options.scale || 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Verificar se precisa de nova página
        if (currentY + imgHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
        }

        pdf.addImage(imgData, 'PNG', margin, currentY, imgWidth, imgHeight);
        currentY += imgHeight + 10; // Espaço entre elementos
      }

      setExportProgress(90);
      pdf.save(filename);
      setExportProgress(100);

    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      throw error;
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
      }, 1000);
    }
  }, []);

  // Exportar dados como CSV
  const exportDataAsCSV = useCallback((
    data: ChartData[],
    filename: string = 'dashboard-data.csv'
  ) => {
    try {
      setIsExporting(true);
      setExportProgress(0);

      let csvContent = 'Tipo de Gráfico,Título,Dados\n';

      data.forEach((chart, index) => {
        setExportProgress((index / data.length) * 80);

        // Converter dados do gráfico para CSV
        let chartData = '';
        
        if (chart.type === 'line' || chart.type === 'bar') {
          // Para gráficos de linha e barra
          chartData = chart.data.map((item, i) => {
            if (typeof item === 'object') {
              return Object.entries(item)
                .map(([key, value]) => `${key}:${value}`)
                .join(';');
            }
            return `Ponto ${i + 1}:${item}`;
          }).join('|');
        } else if (chart.type === 'pie') {
          // Para gráficos de pizza
          chartData = chart.data.map((item, i) => 
            `${item.label || `Item ${i + 1}`}:${item.value || item}`
          ).join('|');
        } else {
          // Para outros tipos
          chartData = chart.data.map((item, i) => 
            `Valor ${i + 1}:${item}`
          ).join('|');
        }

        csvContent += `${chart.type},${chart.title},"${chartData}"\n`;
      });

      setExportProgress(90);

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, filename);

      setExportProgress(100);

    } catch (error) {
      console.error('Erro ao exportar CSV:', error);
      throw error;
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
      }, 1000);
    }
  }, []);

  // Exportar relatório completo (PDF + dados CSV)
  const exportFullReport = useCallback(async (
    elementIds: string[],
    data: ChartData[],
    filename: string = 'relatorio-completo'
  ) => {
    try {
      setIsExporting(true);
      setExportProgress(0);

      // Exportar PDF
      await exportDashboardAsPDF(elementIds, `${filename}.pdf`);
      setExportProgress(50);

      // Exportar CSV
      await new Promise(resolve => setTimeout(resolve, 1000)); // Delay para não sobrecarregar
      exportDataAsCSV(data, `${filename}-dados.csv`);
      setExportProgress(100);

    } catch (error) {
      console.error('Erro ao exportar relatório completo:', error);
      throw error;
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
      }, 1000);
    }
  }, [exportDashboardAsPDF, exportDataAsCSV]);

  return {
    isExporting,
    exportProgress,
    exportChartAsPNG,
    exportDashboardAsPDF,
    exportDataAsCSV,
    exportFullReport,
  };
};

export default useExport;
