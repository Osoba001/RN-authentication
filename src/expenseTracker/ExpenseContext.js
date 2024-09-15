import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
});

function expenesReducer(state, action) {
    switch (action.type) {
      case "ADD":
        return [action.payload, ...state];
      //   const id = new Date().toString() + Math.random().toString();
      //   return [{ ...action.payload, id: id }, ...state];
      case "SET":
        const invited = action.payload.reverse();
        return invited;
      case "UPDATE":
        const updatableExpenseIndex = state.findIndex(
          (expense) => expense.id == action.payload.id
        );
        const updatableExpense = state[updatableExpenseIndex];
        const updatedItem = { ...updatableExpense, ...action.payload.data };
        const updatedExpenses = [...state];
        updatedExpenses[updatableExpenseIndex] = updatedItem;
        return updatedExpenses;
      case "DELETE":
        return state.filter((item) => item.id !== action.payload);
      default:
        return state;
    }
  }

  function ExpensesContextProvider({ children }) {
    const [expenseState, dispatch] = useReducer(expenesReducer, []);
  
    function addExpense(expenseData) {
      dispatch({ type: "ADD", payload: expenseData });
    }
    function setExpenses(expenses) {
      dispatch({ type: "SET", payload: expenses });
    }
    function deleteExpense(id) {
      dispatch({ type: "DELETE", payload: id });
    }
  
    function updateExpense(id, expenseData) {
      dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
    }
  
    const value = {
      expenses: expenseState,
      addExpense: addExpense,
      setExpenses: setExpenses,
      updateExpense: updateExpense,
      deleteExpense: deleteExpense,
    };
  
    return (
      <ExpensesContext.Provider value={value}>
        {children}
      </ExpensesContext.Provider>
    );
  }
  export default ExpensesContextProvider;
  
