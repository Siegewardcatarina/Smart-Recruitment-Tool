import CloseIcon from "@mui/icons-material/Close";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Instructions() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <HelpCenterIcon onClick={handleClickOpen}>Open dialog</HelpCenterIcon>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Instructions
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            1.This application was created particularly for the Candidate
            dataset, which includes the following information: candidate number,
            first and last names, phone number, age, experience, email, role,
            location, and skill sets. 2. To begin querying any questions you may
            have about the dataset, simply type your query in the query field
            and click Submit to begin the query's execution. 3. Please include
            context and examples as needed to support the model's
            decision-making process in order to obtain accurate results. 4. Give
            specific instructions in the prompt, such as "Create a pie chart,
            display percentage of employees of each role throughout the
            dataset," if you want the output in a certain format, such as a bar
            chart, pie chart, or line chart. 5. To get the output as a table,
            please specify so in the prompt clearly for the model to understand.
            For eg. “Tabulate the first 5 roles. Include the roles and the
            number of employees in each of these roles only.” 6. In rare
            circumstances, the model might produce undesirable results. In these
            cases, please reload the page and rewrite the prompt; it is advised
            to include more context. 7. Refer to the example queries and try to
            frame any queries you have similarly for better results. 8. It is
            advised to request data in smaller chunks rather than all at once in
            order to gain access to it in situations where the query's output is
            restricted by a token limit.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Understood
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
