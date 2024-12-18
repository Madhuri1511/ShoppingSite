export const addItem = (item:any) => ({
    type: 'ADD_ITEM',
    payload: item
});

export const updateItem = (item:any) => ({
    type: 'UPDATE_ITEM',
    payload: item
});

export const deleteItem = (id:any) => ({
    type: 'DELETE_ITEM',
    payload: id
});
export const GetItems = () => ({
    type: 'GetItems',
    payload: []
});
