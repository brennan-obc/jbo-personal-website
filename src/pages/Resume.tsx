import FileDisplay from "../components/FileDisplay";

const Resume = () => {
  const resumePDF = "/media/documents/jboc_resume.pdf";
  const resumeDOCX = "/media/documents/jboc_resume.docx";

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <FileDisplay
        src={resumePDF}
        type='pdf'
      />
      <div style={{ position: "absolute", top: "10px", left: "10px" }}>
        <button onClick={() => window.open(resumePDF, "_blank")}>
          Open PDF in New Tab
        </button>
        <button onClick={() => (window.location.href = resumePDF)}>
          Download PDF
        </button>
        <button onClick={() => (window.location.href = resumeDOCX)}>
          Download DOCX
        </button>
      </div>
    </div>
  );
};

export default Resume;
