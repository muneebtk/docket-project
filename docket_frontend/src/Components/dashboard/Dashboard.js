import React, { useEffect, useState } from 'react';
import { Card, Typography, CardContent, Button, TextField, Select, Grid, Alert } from '@mui/material';
import './dashboard.css'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import axios from '../../Utils/axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    name: '', startTime: '', endTime: '', workedHours: '', supplier: '', PO: '', ratePerHour: ''
  })
  const [po, setPo] = useState([]);
  const [supplier, setSupplier] = useState()
  const [dockets, setDockets] = useState()
  const [docketStatus, setDocketStatus] = useState()
  // trigger when form filed changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (e.target.name === 'supplier') {
      PoOptions(e.target.value)
    }
  }
  // docket form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    docketForm(formData)
  }
  // add a new docket 
  let docketForm = (formData) => {
    axios.post('/add_docket/', formData).then((response) => {
      setDocketStatus({ 'message': response.data.message, status: response.status })
    }).catch((error) => {
      console.log('error', error)
    })
  }
  // get all suppliers
  let getSupplier = async () => {
    axios.get('/add_docket').then((response) => {
      setPo(response.data.data.df['Supplier'])
      setDockets(response.data.data.dockets)
      setSupplier(response.data.data.df)
    })
  }
  useEffect(() => {
    getSupplier()
  }, [open])
  // get the all the "po" belongs to the "Supplier"
  let PoOptions = async (supplier) => {
    axios.get('add_docket/', { params: { 'supplier': supplier } }).then((response) => {
      setPo(response.data.df)
    })
  }

  return (
    <div className='main'>
      <Box className='button'>
        <Button onClick={handleOpen} variant='contained' color='success' sx={{ marginRight: 2 }}>Add Docket <AddCircleOutlineIcon></AddCircleOutlineIcon></Button>
      </Box>
      <div className='card' style={{ display: 'flex' }}>
        {/* Card start */}
        <Grid container spacing={2} >
          {dockets ? dockets.map((obj, index) => (
            <Grid item xs={6} lg={3} md={3} xl={3} key={index} >
              <Card variant="outlined" className='single_card'>
                <CardContent>
                  <Typography variant="h5">Name : {obj.name}</Typography>
                  <Typography >Worked Hours : {obj.worked_hours}</Typography>
                  <Typography >Rate/Hour : {obj.rate_per_hour}</Typography>
                  <Typography >Supplier : {obj.supplier_name}</Typography>
                  <Typography >PO : {obj.po}</Typography>
                  <Typography variant='p'>Time : {obj.start_time} - {obj.end_time}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )) : 'null'}
        </Grid>
        {/* Card end */}
        {/* docket form Modal start  */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2" textAlign={'center'}>
                Docket Form
              </Typography>
              {docketStatus ? docketStatus.status === 201 ? <Alert severity='success'>{docketStatus.message}</Alert> :
                <Alert severity='error'>{docketStatus.message}</Alert> : null}
              <form onSubmit={handleSubmit}>
                <div className='form'>
                  <TextField variant='outlined' label='Name' name='name' sx={{ mt: 2 }} onChange={handleChange}></TextField>
                  <Box sx={{ display: 'flex', marginTop: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimePicker']} >
                        <TimePicker label="Start Time" name="startTime" id="" style={{ paddingRight: 10 }}
                          onChange={(date) => handleChange({ target: { name: 'startTime', value: date.format('hh:mm A') } })} />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimePicker']} >
                        <TimePicker label="End Time" name="endTime" id="" style={{}}
                          onChange={(date) => handleChange({ target: { name: 'endTime', value: date.format('hh:mm A') } })} />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                  <TextField variant='outlined' name='workedHours' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={handleChange} label='Worked hours' sx={{ mt: 2 }} ></TextField>
                  <TextField variant='outlined' label='Rate per hour' name='ratePerHour' style={{ marginTop: 15 }} onChange={handleChange}></TextField>
                  <Select variant='outlined' label='Select Supplier' name='supplier' sx={{ mt: 2 }} onChange={handleChange}>
                    {supplier ? supplier.map((key) => (
                      <MenuItem key={key} value={key}>
                        {key}
                      </MenuItem>
                    )) : null}
                    <MenuItem key='' selected>Select Supplier</MenuItem>
                  </Select>
                  <Select variant='outlined' name='PO' label='Select PO' sx={{ mt: 2 }} onChange={handleChange}>
                    <MenuItem key=''>Select PO</MenuItem>
                    {po ? po.map((obj) => (
                      <MenuItem value={obj}>{obj}</MenuItem>
                    )) : null}
                  </Select>
                  <Button type='submit' sx={{ marginTop: 2 }}>Submit</Button>
                </div>
              </form>
            </Box>
          </Fade>
        </Modal>
        {/* docket form modal end */}
      </div>
    </div>
  )
}

export default Dashboard
