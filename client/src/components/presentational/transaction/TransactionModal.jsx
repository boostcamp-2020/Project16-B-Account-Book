import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import TransactionInputForm from './TransactionInputForm';
import ParserInputForm from './ParserInputForm';
import BulkInputForm from './BulkInputForm';

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
  deleteTransactionHandler,
  editIdStatus,
  setEditIdStatus,
  handleCancel,
  tags,
  paymentMethods,
  parserStatus,
  setParserStatus,
  bulkInsert,
  setBulkInsert,
  bulkInsertTransactionHandler,
}) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpenModalStatus(false);
    setEditIdStatus('');
    setParserStatus(false);
    setBulkInsert([]);
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
            {bulkInsert[0] ? (
              <BulkInputForm
                bulkInsert={bulkInsert}
                setBulkInsert={setBulkInsert}
                setOpenModalStatus={setOpenModalStatus}
                bulkInsertTransactionHandler={bulkInsertTransactionHandler}
              />
            ) : parserStatus ? (
              <ParserInputForm
                setParserStatus={setParserStatus}
                setEditIdStatus={setEditIdStatus}
              />
            ) : (
              <TransactionInputForm
                insertTransaction={insertTransaction}
                setOpenModalStatus={setOpenModalStatus}
                updateTransactionHandler={updateTransactionHandler}
                deleteTransactionHandler={deleteTransactionHandler}
                editIdStatus={editIdStatus}
                handleCancel={handleCancel}
                tags={tags}
                paymentMethods={paymentMethods}
              />
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransactionModal;
