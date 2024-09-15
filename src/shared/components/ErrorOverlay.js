import { Text, View, StyleSheet } from "react-native";
import { Colors } from "../Colors";

const ErrorOverlay = ({message, onConfirm} ) => {
    return ( <View style={styles.container}>
        <Text style={styles.title}>An Error Occurred</Text>
        <Text style={styles.text}>{message}</Text>
    </View> );
}
 
export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
      backgroundColor: Colors.primary700,
    },
    text: {
      color: "white",
      textAlign: "center",
      marginBottom: 8,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });
  