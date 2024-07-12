import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { ProductsNavigator } from './presentation/routes/ProductsNavigator';



export const App = () => {
    return (
        <NavigationContainer>
            <ProductsNavigator />
        </NavigationContainer>
    )
}
