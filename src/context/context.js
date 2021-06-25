import React, { useReducer, createContext } from 'react';

import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [{"amount":10000,"category":"Salary","type":"Income","date":"2021-06-25","id":"38fa8fdd-ad0a-4f26-a7f2-03efe7d3fa1a"},{"amount":200,"category":"Bills","type":"Expense","date":"2021-06-25","id":"5df34768-cade-4ea8-a298-328104cddaf0"},{"amount":100,"category":"Extra income","type":"Income","date":"2021-06-25","id":"e80629ad-7d13-4c05-b03e-fddf13c78697"}];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

  return (
    <ExpenseTrackerContext.Provider value={{
      transactions,
      balance,
      deleteTransaction,
      addTransaction,
    }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
