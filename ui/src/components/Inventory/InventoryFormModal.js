import axios from 'axios'
import { DatePicker } from '@material-ui/pickers'
import { MeasurementUnits } from '../../constants/units'
import React from 'react'
import TextField from '../Form/TextField'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Select } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'

class InventoryFormModal extends React.Component {
  render() {
    const { formName,
      handleDialog,
      handleInventory,
      title,
      initialValues,
      availableProducts
    } = this.props
    return (
      <Dialog
        open={this.props.isDialogOpen}
        maxWidth='sm'
        fullWidth={true}
        onClose={() => { handleDialog(false) }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            handleInventory(values)
            handleDialog(true)
          }}>
          {helpers =>
            <Form
              noValidate
              autoComplete='off'
              id={formName}
            >
              <DialogTitle id='alert-dialog-title'>
                {`${title} Inventory`}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  {/* Name */}
                  <Grid item xs={12}>
                    <Field name='name' label='Name' component={TextField} required />
                  </Grid>
                  {/* Product Type */}
                  <Grid item xs={12}>
                    <Field name='productType' label='Product Type' component={Select} options={availableProducts} required />
                  </Grid>
                  {/* Description */}
                  <Grid item xs={12}>
                    <Field name='description' label='Description' component={TextField} />
                  </Grid>
                  {/* Average Price */}
                  <Grid item xs={12}>
                    <Field name='averagePrice' label='Average Price' component={TextField} type='number' />
                  </Grid>
                  {/* Amount */}
                  <Grid item xs={12}>
                    <Field name='amount' label='Amount' component={TextField} type='number' />
                  </Grid>
                  {/* Unit of Measurement */}
                  <Grid item xs={12}>
                    <Field name='unitOfMeasurement' label='Unit of Measurement' component={Select} options={MeasurementUnits} required />
                  </Grid>
                  {/* Best Before Date */}
                  <Grid item xs={12}>
                    <Field name='bestBeforeDate' label='Best Before Date' component={DatePicker} />
                  </Grid>
                  {/* Never Expires */}
                  <Grid item xs={12}>
                    <Field name='neverExpires' label='Never Expires' component={Checkbox} />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => { handleDialog(false) }} color='secondary'>Cancel</Button>
                <Button
                  disableElevation
                  variant='contained'
                  type='submit'
                  form={formName}
                  color='secondary'
                  disabled={!helpers.dirty}>
                  Save
                </Button>
              </DialogActions>
            </Form>
          }
        </Formik>
      </Dialog>
    )
  }
}

export default InventoryFormModal