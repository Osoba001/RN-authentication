import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../../shared/components/IconButton";
import { Colors } from "../../shared/Colors";
import { ExpensesContext } from "../ExpenseContext";
import ExpenseForm from "../components/ExpenseForm";
import { deleteExpense, StoreExpense, updateExpense } from "../ExpensesDb";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import ErrorOverlay from "../../shared/components/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        title: isEditing ? "Edit Expense" : "Add Expense",
      },
      [navigation, isEditing]
    );
  });

  const expensesCtx = useContext(ExpensesContext);

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  const deleteExpenseHandler = async () => {
    setIsLoading(true);

    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Error occurred when deleting expense.");
      setIsLoading(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await StoreExpense(expenseData);
        expensesCtx.addExpense({ expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
        console.log(error);
      setError("Could not save data - Please try again later.");
      setIsLoading(false);
    }
  };
  function errorHandler() {
    setError(null);
  }
  if (error && !isLoading)
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;

  if (isLoading) return <LoadingOverlay />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: Colors.primary200,
    alignItems: "center",
  },
});
