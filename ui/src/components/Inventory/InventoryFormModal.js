import * as Yup from 'yup'
import { MeasurementUnits } from '../../constants/units'
import React from 'react'
import TextField from '../Form/TextField'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, InputLabel, MenuItem, Select } from '@material-ui/core'
import { ErrorMessage, Field, Form, Formik } from 'formik'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  productType: Yup.string().required('Product Type is required'),
  unitOfMeasurement: Yup.string().required('Unit of Measurement is required'),
  averagePrice: Yup.number().typeError('Average Price must be a number').required('Average Price is required'),
  amount: Yup.number().typeError('Amount must be a number').required('Amount is required'),
})


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
        onClose={() => {
          handleDialog(false)
        }}

      >
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            values.bestBeforeDate = new Date(values.bestBeforeDate)
            values.bestBeforeDate.setDate(values.bestBeforeDate.getDate() + 1)
            values.bestBeforeDate = values.bestBeforeDate.toISOString()
            handleInventory(values)
            handleDialog(true)
          }}
          validationSchema={validationSchema}>
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
                    <Field name='name' component={TextField} style={{ width: '100%' }} required />
                  </Grid>
                  {/* Product Type */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor='productType' style={{ paddingBottom: '8px' }}>
                      Product Type</InputLabel>
                    <Field
                      name="productType"
                      as={Select}
                      required
                      variant="outlined"
                      fullWidth
                    >
                      {availableProducts.map((product) =>
                        <MenuItem key={product.id} value={product.name}>
                          {product.name}
                        </MenuItem>
                      )}
                    </Field>
                    <ErrorMessage name="productType" component="div" style={{ color: '#FF4500' }} />
                  </Grid>
                  {/* Description */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor='description'>Description</InputLabel>
                    <Field name='description' component={TextField} style={{ width: '100%' }} />
                  </Grid>
                  {/* Average Price */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor='averagePrice'>Average Price</InputLabel>
                    <Field
                      name='averagePrice'
                      component={TextField}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      style={{ width: '100%' }}
                    />
                    <ErrorMessage name="averagePrice" component="div" className="error-message" />
                  </Grid>
                  {/* Amount */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor='amount'>Amount</InputLabel>
                    <Field
                      name='amount'
                      component={TextField}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      style={{ width: '100%' }}
                    />
                    <ErrorMessage name="amount" component="div" className="error-message" />
                  </Grid>
                  {/* Unit of Measurement */}
                  <Grid item xs={12} >
                    <InputLabel htmlFor='unitOfMeasurement' style={{ paddingBottom: '8px' }}>
                      Unit of Measurement</InputLabel>
                    <Field
                      name='unitOfMeasurement'
                      as={Select}
                      required
                      variant="outlined"
                      fullWidth
                    >
                      {Object.entries(MeasurementUnits).map(([key, value]) =>
                        <MenuItem key={key} value={key}>
                          {value.name} ({value.abbreviation})
                        </MenuItem>
                      )}
                    </Field>
                    <ErrorMessage name="unitOfMeasurement" component="div" style={{ color: '#FF4500' }} />
                  </Grid>
                  {/* Best Before Date */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor='bestBeforeDate'>Best Before Date</InputLabel>
                    <Field name='bestBeforeDate' component={TextField} type='date' style={{ width: '100%' }} />
                  </Grid>
                  {/* Never Expires */}
                  <Grid item xs={12}>
                    <InputLabel htmlFor='neverExpires'>Does it expire?</InputLabel>
                    <Field name='neverExpires' type='checkbox' as={Checkbox} checked={helpers.values.neverExpires} />
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