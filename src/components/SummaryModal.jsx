import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";

const SummaryModal = ({ content, modalOpen, toggleModal }) => {
  const convertScoreToRating = (score) => {
    const minScore = 1;
    const maxScore = 100;
    const minRating = 0.5;
    const maxRating = 5;

    const rating =
      ((score - minScore) / (maxScore - minScore)) * (maxRating - minRating) +
      minRating;

    return rating;
  };
  return (
    <>
      <Dialog open={modalOpen} onClose={() => toggleModal(false)}>
        <DialogTitle>{content?.title?.english}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content?.description}</DialogContentText>
        </DialogContent>
        <div style={{ textAlign: "center" }}>
          <div>RATING</div>
          <Rating
            name="half-rating-read"
            defaultValue={convertScoreToRating(content?.averageScore)}
            precision={0.5}
            readOnly
          />
        </div>
        <DialogActions>
          <Button onClick={() => toggleModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SummaryModal;
