import { useReactToPrint } from "react-to-print";

const usePrint = (options) => {
  const handlePrint = useReactToPrint({
    documentTitle: options.documentTitle,
    // onBeforePrint: options.onBeforePrint,
    // onAfterPrint: options.onAfterPrint,
    pageStyle: ` @media print {
        .pagebreak {
          page-break-before: always;
        }
        
      }
    `,
    removeAfterPrint: options.removeAfterPrint,
    content: options.content,
  });

  return handlePrint;
};

export default usePrint;
