import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Button, TableHead, Modal, Typography, Card, CardContent, CardActionArea, Grid, styled } from '@mui/material';
import { AutofpsSelectRounded, HdrOnSelectRounded, Warehouse } from '@mui/icons-material';
// import { orders } from '../../../data/orders';
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
interface SMOrderTableProps {
  orders: any[];
  handleStatusChange: () => void;
  setSelected: (id: number) => void;
  selected: number;
  warehouses: string[];
  handleSelected: (id: number) => void;
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}

export function SMOrderTable({ orders, handleStatusChange, setSelected, selected, warehouses, handleSelected, selectedItem, setSelectedItem }: SMOrderTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id: string) => {
    setOpen(true);
    setSelectedItem(id);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected(-1);
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell component="th">Item Code</TableCell>
            <TableCell component="th">Name </TableCell>
            <TableCell component="th">Brand</TableCell>
            <TableCell component="th">Quantity</TableCell>
            {/* <TableCell component="th">Status</TableCell> */}
            <TableCell component="th">Required By</TableCell>
            {/* <TableCell component="th">Requested By</TableCell> */}
            <TableCell component="th">Requested Date</TableCell>
            <TableCell component="th">Request</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : orders)
            .filter((order) => !order.sentRequest && order.request)
            .map((order) => (
              <TableRow key={order.item_code}>
                <TableCell component="th" scope="row">
                  {order.item_code}
                </TableCell>
                <TableCell style={{}}>{order.name}</TableCell>
                <TableCell style={{}}>{order.brand}</TableCell>
                <TableCell style={{}}>{order.quantity}</TableCell>
                {/* <TableCell style={{}}>{order.status}</TableCell> */}
                <TableCell style={{}}>{order.required_by}</TableCell>
                {/* <TableCell style={{}}>{order.requested_by}</TableCell> */}
                <TableCell style={{}}>{order.requested_date}</TableCell>
                <TableCell style={{}}>
                  {/* <Button variant="contained" onClick={handleStatusChange}> */}
                  <Button variant="contained" onClick={() => handleOpen(order.item_code)}>
                    Request
                  </Button>
                  <BasicModal open={open} handleClose={handleClose} data={warehouses} handleSelect={handleSelected} selected={selected} handleStatusChange={handleStatusChange} selectedItem={selectedItem} />
                </TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={10}
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default SMOrderTable;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type BasicModalProps = {
  open: boolean;
  handleClose: () => void;
  data: string[];
  handleSelect: (id: number) => void;
  selected: number;
  handleStatusChange: (warehouseID: number, selectedItem: string) => void;
  selectedItem: string;
  // setSelectedItem: (item: string) => void;
};

function BasicModal({ open, handleClose, data, handleSelect, selected, handleStatusChange, selectedItem }: BasicModalProps) {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
          Select Warehouse to Request
        </Typography>
        <Grid container spacing={2} direction="row" paddingTop={2}>
          {data.map((warehouse, index) => (
            <Grid item xs="auto">
              <Card sx={{ width: 100 }} onClick={() => handleSelect(index)} className={selected === index && index !== 1 ? 'highlightTier' : ''} style={index === 1 ? { backgroundColor: '#9e9e9e' } : {}}>
                {index !== 1 && (
                  <CardActionArea>
                    <CardContent>{warehouse}</CardContent>
                  </CardActionArea>
                )}
                {index === 1 && (
                  <StyledCardActionArea>
                    <CardContent>{warehouse}</CardContent>
                  </StyledCardActionArea>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container direction="row" justifyContent="space-around" alignItems="center" sx={{}}>
          {/* <Button variant="contained" color="success" sx={{ mt: 4, mr: 4 }} onClick={() => handleStatusChange(selected, selectedItem)}> */}
          <Button variant="contained" color="success" sx={{ mt: 4, mr: 4 }} onClick={(selected !== -1 && selected !== 1)? () => handleStatusChange(selected, selectedItem) : undefined}>
            Request
          </Button>
          <Button variant="contained" color="warning" sx={{ mt: 4, mr: 'end' }} onClick={handleClose}>
            Cancel
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}
const StyledCardActionArea = styled(CardActionArea)(
  ({ theme }) => `
    .MuiCardActionArea-focusHighlight {
        background: transparent;
    }
`
);
