import { createStackNavigator } from "@react-navigation/stack";
import { globalColors } from "../theme/theme";
import { ProductFormScreen } from "../screens/Products/ProductFormScreen";
import { ProductsScreen } from "../screens/Products/ProductsScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { ProductScreen } from "../screens/Products/ProductScreens";


export type RootStackParams = {
  Home: undefined,
  Product: {
    id: string,
    name: string,
    description: string,
    logo: string,
    date_release: string,
    date_revision: string
  },
  Products: undefined
  ProductForm: {
    id: string,
    name: string,
    description: string,
    logo: string,
    date_release: string,
    date_revision: string
  },
}

const Stack = createStackNavigator<RootStackParams>();

export const ProductsNavigator = () => {


  return (
    <Stack.Navigator
      screenOptions={{
        title: 'BANCO',
        headerTintColor: globalColors.headerText,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="ProductForm" component={ProductFormScreen} />

    </Stack.Navigator>
  );
}