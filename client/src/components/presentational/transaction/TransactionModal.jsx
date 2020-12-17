import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import TransactionInputForm from './TransactionInputForm';
import ParserInputForm from './ParserInputForm';
import BulkInputForm from './BulkInputForm';
import { useSelector } from 'react-redux';

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
  insertTransaction,
  updateTransactionHandler,
  deleteTransactionHandler,
  bulkInsertTransactionHandler,
  handleClose,
}) => {
  const classes = useStyles();

  const openModalStatus = useSelector(
    (state) => state.transaction.openModalStatus
  );
  const bulkInsert = useSelector((state) => state.transaction.bulkInsert);
  const parserStatus = useSelector((state) => state.transaction.parserStatus);
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
            {bulkInsert[0] ? (
              <BulkInputForm
                bulkInsertTransactionHandler={bulkInsertTransactionHandler}
                handleClose={handleClose}
              />
            ) : parserStatus ? (
              <ParserInputForm />
            ) : (
              <TransactionInputForm
                insertTransaction={insertTransaction}
                updateTransactionHandler={updateTransactionHandler}
                deleteTransactionHandler={deleteTransactionHandler}
                handleClose={handleClose}
              />
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransactionModal;
