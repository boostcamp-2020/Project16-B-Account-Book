import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TransactionInputForm from './TransactionInputForm';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const TransactionModal = ({
  openModalStatus,
  setOpenModalStatus,
  insertTransaction,
  updateTransactionHandler,
  editIdStatus,
  handleCancel,
  tags,
  paymentMethods,
}) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpenModalStatus(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalStatus || false}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalStatus}>
          <div className={classes.paper}>
            <TransactionInputForm
              insertTransaction={insertTransaction}
              updateTransactionHandler={updateTransactionHandler}
              editIdStatus={editIdStatus}
              handleCancel={handleCancel}
              tags={tags}
              paymentMethods={paymentMethods}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransactionModal;
