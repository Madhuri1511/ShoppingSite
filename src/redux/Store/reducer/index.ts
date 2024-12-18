// Define the type of the state
interface State {
    items: any[]; // or you could use string[], number[], etc., depending on your data
  }
  
  // Define the initial state with an explicit type
  // const initialState: State = {
  //   items: [],
  // };
  
  const loadStateFromLocalStorage = (): State => {
    try {
      const serializedState = localStorage.getItem("Shopping");
      if (serializedState === null) {
        return { items: [] }; // No saved state, return default initial state
      }
      return JSON.parse(serializedState);
    } catch (e) {
      console.warn("Could not load state from local storage:", e);
      return { items: [] };
    }
  };
  const initialState: State = loadStateFromLocalStorage();
// Save state to local storage
const saveStateToLocalStorage = (state: State) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("Shopping", serializedState);
  } catch (e) {
    console.warn("Could not save state to local storage:", e);
  }
};
  // Define the root reducer with the correct type
  const rootReducer = (state = initialState, action: any): State => {
    let newState;
    switch (action.type) {
      case "ADD_ITEM":
        // const allData:any=localStorage.setItem("Shopping",JSON.stringify({ ...state,
        //   items: [...state.items,action.payload] }))
        // return (
        // { ...state,
        //   items: [...state.items,action.payload] })
        newState = {
          ...state,
          items: [...state.items, action.payload],
        };
        saveStateToLocalStorage(newState);
        return newState;
        
          case 'UPDATE_ITEM':
            // const data= {
            //   ...state,
            //   items: state.items.map(item =>
            //       item.id === action.payload.id ? action.payload : item
            //   )}
            //   console.log("dataaaa",data)
            // return {
            //     ...state,
            //     items: state.items.map(item =>
            //         item.id === action.payload.id ? action.payload : item
            //     ),
            // };
            newState = {
              ...state,
              items: state.items.map((item) =>
                item.id === action.payload.id ? action.payload : item
              ),
            };
            saveStateToLocalStorage(newState);
            return newState;
            case 'DELETE_ITEM':
                // return {
                //     ...state,
                //     items: state.items.filter(item => item.id !== action.payload),
                // };
                newState = {
                  ...state,
                  items: state.items.filter((item) => item.id !== action.payload),
                };
                saveStateToLocalStorage(newState);
                return newState;

      default:
        return state;

    }
  };
  
  export default rootReducer;
  