import { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import icon from '@public/icon';
import csvDataParser from '@util/csvDataParser';
import csvDataToTransaction from '@util/csvDataToTransaction';

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
    position: 'fixed',
    bottom: 0,
    right: 0,
    zIndex: 15,
  },
  exampleWrapper: {
    position: 'fixed',
    marginTop: theme.spacing(3),
  },
  speedDial: {
    position: 'fixed',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const TransactionFab = ({
  setOpenModalStatus,
  setDeleteStatus,
  setParserStatus,
  setBulkInsert,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const inputRef = useRef();

  const handleFileUploadClick = () => {
    inputRef.current.click();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleFiles = (e) => {
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(e.target.files[0]);
    inputRef.current.value = '';
  };

  function handleFileLoad(e) {
    setBulkInsert(csvDataToTransaction(csvDataParser(e.target.result)));
  }

  const actions = [
    {
      icon: icon.plus,
      name: 'Add',
      handleClick: () => {
        setOpenModalStatus(true);
      },
    },
    {
      icon: icon.trashcan,
      name: 'Delete',
      handleClick: () => {
        setDeleteStatus(true);
      },
    },
    {
      icon: icon.message,
      name: 'Upload sms/mms text',
      handleClick: () => {
        setOpenModalStatus(true);
        setParserStatus(true);
      },
    },
    {
      icon: icon.spreadsheet,
      name: 'Upload csv file',
      handleClick: () => {
        handleFileUploadClick();
        setOpenModalStatus(true);
      },
    },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          hidden={false}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={'up'}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.handleClick}
            />
          ))}
        </SpeedDial>
        <input
          style={{ display: 'none' }}
          ref={inputRef}
          accept=".csv"
          type="file"
          onChange={handleFiles}
        />
      </div>
    </div>
  );
};

export default TransactionFab;
