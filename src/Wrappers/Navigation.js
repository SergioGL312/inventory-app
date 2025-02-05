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
import History from "../Screens/History.screen";
import Admin from "../Screens/Admin.screen";
import EditProduct from "../Screens/EditProduct.screen";

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
        <Stack.Screen
          name={ROUTES.incoming}
          component={Incoming}
          options={{ title: 'Compras' }}
        />
        <Stack.Screen
         name={ROUTES.outcoming}
         component={OutComing}
         options={{ title: 'Ventas' }}
        />
        <Stack.Screen
          name={ROUTES.history}
          component={History}
          options={{ title: 'Historial de movimientos' }}
        />
        <Stack.Screen name={ROUTES.admin} component={Admin} />
        <Stack.Screen name={ROUTES.editProduct.name} component={EditProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}