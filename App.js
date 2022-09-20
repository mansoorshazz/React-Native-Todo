import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddStudentScreen from "./src/screens/AddStudentScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createStackNavigator()

export default () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='home' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='addstudent' component={AddStudentScreen} options={{ headerShown: false }} />
        <Stack.Screen name='detailsscreen' component={DetailsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

