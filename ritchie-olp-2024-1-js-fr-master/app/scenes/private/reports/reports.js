import styles from './reports.css';
import img from '../../../assets/galaxy.mp4'

export function ReportScene() {

  const pageContent = `
    <div class=${styles.reportsContainer}>
      <video
        class=${styles.reportsBackgroundVideo}
        src="${img}"
        autoplay
        muted
        loop
      ></video>           
    </div>
    `;

  const logic = () => {
    console.log("hello from reports logic")
  }

  return {
    pageContent,
    logic
  }
}