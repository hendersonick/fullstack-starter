import axios from 'axios'
import { openSuccess } from '../alerts/index.js'
import { createAction, handleActions } from 'redux-actions'


const actions = {
  INVENTORY_GET_ALL: 'inventory/get_all',
  INVENTORY_GET_ALL_PENDING: 'inventory/get_all_PENDING',
  INVENTORY_SAVE: 'inventory/save',
  INVENTORY_DELETE: 'inventory/delete',
  INVENTORY_REFRESH: 'inventory/refresh'
}

export let defaultState = {
  all: [],
  fetched: false,
}

export const findInventory = createAction(actions.INVENTORY_GET_ALL, () =>
  (dispatch, getState, config) => axios
    .get(`${config.restAPIUrl}/inventory`)
    .then((suc) => dispatch(refreshInventory(suc.data)))
)


export const saveInventory = createAction(actions.INVENTORY_SAVE, (inventory) =>
  (dispatch, getState, config) => axios
    .post(`${config.restAPIUrl}/inventory`, inventory)
    .then((suc) => {
      const invs = []
      getState().inventory.all.forEach(inv => {
        if (inv.id !== suc.data.id) {
          invs.push(inv)
        }
      })
      invs.push(suc.data)
      dispatch(refreshInventory(invs))
      dispatch(openSuccess('Inventory saved successfully.'))
    })
)

{/* export const saveInventory = createAction(actions.INVENTORY_SAVE, (inventory) =>
  (dispatch, getState, config) => {
    const url = `${config.restAPIUrl}/inventory`

    // If the inventory has an ID, it means it's an existing item, so use PUT for update
    const axiosMethod = inventory.id ? axios.put : axios.post

    return axiosMethod(url, inventory)
      .then((suc) => {
        const invs = getState().inventory.all.filter(inv => inv.id !== suc.data.id)
        invs.push(suc.data)
        dispatch(refreshInventory(invs))
        dispatch(openSuccess('Inventory saved successfully.'))
      })
  }
) */}

export const removeInventory = createAction(actions.INVENTORY_DELETE, (ids) =>
  async(dispatch, getState, config) => {
    for (const id of ids) {
      await axios.delete(`${config.restAPIUrl}/inventory`, { data: id })
        .then(() => console.log(`Inventory deleted successfully: ${id}`))
        .catch((error) => console.error(`Error deleting inventory (${id}):`, error))
    }
    const remainingInventory = getState().inventory.all.filter(
      (inv) => !ids.includes(inv.id)
    )
    dispatch(refreshInventory(remainingInventory))
    dispatch(openSuccess('Inventory removed successfully.'))
  }
)

export const refreshInventory = createAction(actions.INVENTORY_REFRESH, (payload) =>
  (dispatcher, getState, config) =>
    payload.sort((inventoryA, inventoryB) => inventoryA.name < inventoryB.name ? -1 : inventoryA.name > inventoryB.name ? 1 : 0)
)

export default handleActions({
  [actions.INVENTORY_GET_ALL_PENDING]: (state) => ({
    ...state,
    fetched: false
  }),
  [actions.INVENTORY_REFRESH]: (state, action) => ({
    ...state,
    all: action.payload,
    fetched: true,
  })
}, defaultState)
