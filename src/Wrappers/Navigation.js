// NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// CONSTANTS
import { ROUTES } from '../Constants/navigation.constants';

// SCREENS
import Main from "../Screens/Main.screen";
import Inventory from "../Screens/Inventory.screen";
import Incoming from "../Screens/Incoming.screen";
import OutComing from "../Screens/Outcoming.screen";
import Products from "../Screens/Products.screen";

// Navigation
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={ROUTES.main}
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.inventory}
          component={Inventory}
        />
        <Stack.Screen name={ROUTES.incoming} component={Incoming} />
        <Stack.Screen name={ROUTES.products} component={Products} />
        <Stack.Screen name={ROUTES.outcoming} component={OutComing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}