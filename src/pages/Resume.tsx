import FileDisplay from "../components/FileDisplay";
import "../styles/modules/Resume.scss";
import "../styles/global.scss";
import "../styles/variables.scss";

const Resume = () => {
  const resumeImage = "/media/documents/jboc_resume-img.png";
  const resumePDF = "/media/documents/jboc_resume-pdf.pdf";
  const resumeDOCX = "/media/documents/jboc_resume-doc.docx";

  return (
    <div className='resumeContainer'>
      <div className='buttonContainer'>
        <a
          href={resumePDF}
          download='Resume.pdf'
        >
          <button>Download PDF</button>
        </a>
        <a
          href={resumeDOCX}
          download='Resume.docx'
        >
          <button>Download DOCX</button>
        </a>
      </div>
      <FileDisplay
        src={resumeImage}
        alt='Resume Image'
      />
    </div>
  );
};

export default Resume;
