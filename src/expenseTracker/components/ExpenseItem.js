import { Pressable, StyleSheet, Text, View } from "react-native";
import { GetFormattedDate } from "../../shared/UtilServices";
import {Colors} from "../../shared/Colors";
import { useNavigation } from "@react-navigation/native";
import { ExpenseTrackerNavRoutes } from "../Constants";

const ExpensesItem = ({ id, description, amount, date }) => {
    const navigation = useNavigation();
  
    const expensePressHandler = () => {
      navigation.navigate(ExpenseTrackerNavRoutes.Manage_Expense, { expenseId: id });
    };
  
    return (
      <Pressable
        onPress={expensePressHandler}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.expenseItem}>
          <View>
            <Text style={[styles.textBase, styles.description]}>
              {description}
            </Text>
            <Text style={styles.textBase}>{GetFormattedDate(date)}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.textBase}>${amount.toFixed(2)}</Text>
          </View>
        </View>
      </Pressable>
    );
  };
  
  export default ExpensesItem;
  const styles = StyleSheet.create({
    pressed: {
      opacity: 0.75,
    },
    expenseItem: {
      padding: 12,
      marginVertical: 8,
      backgroundColor: Colors.primary500,
      flexDirection: "row",
      justifyContent: "space-between",
      borderRadius: 6,
      elevation: 3,
      shadowColor: Colors.gray500,
      shadowRadius: 4,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
    },
    textBase: {
      colors: Colors.primary50,
    },
    description: {
      fontsize: 16,
      marginBottom: 4,
      fontWeight: "bold",
    },
    amountContainer: {
      paddingVertical: 4,
      paddingHorizontal: 12,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      minWidth: 80,
    },
    amount: {
      fontWeight: "bold",
      color: Colors.primary500,
    },
  });
  