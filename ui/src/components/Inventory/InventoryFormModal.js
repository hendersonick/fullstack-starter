import { MeasurementUnits } from '../../constants/units'
import React from 'react'
import TextField from '../Form/TextField'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, InputLabel, MenuItem, Select } from '@material-ui/core'
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
    console.log('MeasurementUnits:', MeasurementUnits)
    console.log('availableProducts:', availableProducts)
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
            values.bestBeforeDate = new Date(values.bestBeforeDate)
            values.bestBeforeDate.setDate(values.bestBeforeDate.getDate() + 1)
            values.bestBeforeDate = values.bestBeforeDate.toISOString()
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
                  <Grid item xs={12} sm={12}>
                    <InputLabel htmlFor='name'>Name</InputLabel>
                    <Field name='name' component={TextField} required />
                  </Grid>
                  {/* Product Type */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor='productType'>Product Type</InputLabel>
                    <Field name="productType" as={Select} required>
                      {availableProducts.map((product) =>
                        <MenuItem key={product.id} value={product.name}>
                          {product.name}
                        </MenuItem>
                      )}
                    </Field>
                  </Grid>
                  {/* Description */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor='description'>Description</InputLabel>
                    <Field name='description' component={TextField} />
                  </Grid>
                  {/* Average Price */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor='averagePrice'>Average Price</InputLabel>
                    <Field name='averagePrice' component={TextField} />
                  </Grid>
                  {/* Amount */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor='amount'>Amount</InputLabel>
                    <Field name='amount' component={TextField} />
                  </Grid>
                  {/* Unit of Measurement */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor='unitOfMeasurement'>Unit of Measurement</InputLabel>
                    <Field name='unitOfMeasurement' as={Select} required>
                      {Object.entries(MeasurementUnits).map(([key, value]) =>
                        <MenuItem key={key} value={key}>
                          {value.name} ({value.abbreviation})
                        </MenuItem>
                      )}
                    </Field>
                  </Grid>
                  {/* Best Before Date */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor='bestBeforeDate'>Best Before Date</InputLabel>
                    <Field name='bestBeforeDate' component={TextField} type='date' />
                  </Grid>
                  {/* Never Expires */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor='neverExpires'>Does it expire?</InputLabel>
                    <Field name='neverExpires' component={Checkbox} />
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