import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Select, Checkbox } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import TextField from '../Form/TextField';
import { DatePicker } from '@material-ui/pickers';

class InventoryFormModal extends React.Component {
    state = {
        availableProducts: [],
        unitOfMeasurements: [
            { value: 'CUP', label: 'Cup (c)' },
           
        ]
    };

    componentDidMount() {
        // Fetch available products here
        axios.get('/products') // Replace with actual backend endpoint
            .then(response => {
                this.setState({ availableProducts: response.data });
            });
    }

    render() {
        const { formName, handleDialog, handleInventory, title, initialValues } = this.props;
        const { availableProducts, unitOfMeasurements } = this.state;

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
                        handleInventory(values);
                        handleDialog(false);
                    }}>
                    {helpers => (
                        <Form noValidate autoComplete='off' id={formName}>
                            <DialogTitle id='alert-dialog-title'>{`${title} Inventory`}</DialogTitle>
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
                                        <Field name='unitOfMeasurement' label='Unit of Measurement' component={Select} options={unitOfMeasurements} required />
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
                                <Button type='submit' variant='contained' color='primary' disabled={!helpers.dirty || !helpers.isValid}>Save</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        );
    }
}

export default InventoryFormModal;