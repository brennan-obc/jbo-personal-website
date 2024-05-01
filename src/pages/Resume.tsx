import FileDisplay from "../components/FileDisplay";
import "../styles/modules/Resume.scss";
import "../styles/global.scss";
import "../styles/variables.scss";

const Resume = () => {
  const resumeImage = "/media/documents/jboc_resume-img.png";
  const resumePDF = "/media/documents/jboc_resume-pdf.pdf";
  const resumeDOCX = "/media/documents/jboc_resume-doc.docx";

  const iconPDF = "assets/icons/pdf-outline.svg";
  const iconDOCX = "assets/icons/docx-outline.svg";

  //? why is the PDF loading as '2_page_resume' when opened in separate tab?

  return (
    <div className='resumeContainer'>
      <div className='resumeImgWrapper'>
        <FileDisplay
          src={resumeImage}
          alt='Resume Image'
          pdf={resumePDF}
        />
        <div className='buttonContainer'>
          <a
            href={resumePDF}
            download='Resume.pdf'
          >
            <img
              src={iconPDF}
              alt='Download PDF'
            />
          </a>
          <a
            href={resumeDOCX}
            download='Resume.docx'
          >
            <img
              src={iconDOCX}
              alt='Download DOCX'
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resume;
