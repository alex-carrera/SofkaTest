import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ProductsNavigator, RootStackParams } from './ProductsNavigator';

describe('ProductsNavigator', () => {
    it('renders HomeScreen by default', () => {
        const { getByText } = renderNavigator();
        const homeText = getByText('Home Screen'); // Ajusta según tu componente HomeScreen
        expect(homeText).toBeTruthy();
    });

    it('navigates to ProductsScreen when navigating from HomeScreen', () => {
        const { getByText, getByTestId } = renderNavigator({ initialRouteName: 'Home' });
        const productsButton = getByText('Go to Products'); // Ajusta según tu lógica de navegación
        fireEvent.press(productsButton);

        const productsScreen = getByTestId('ProductsScreen'); // Ajusta según cómo identificas ProductsScreen
        expect(productsScreen).toBeTruthy();
    });

    it('navigates to ProductScreen with correct params', () => {
        const { getByText, getByTestId } = renderNavigator({
            initialRouteName: 'Products',
            initialParams: { id: '1', name: 'Product 1', description: 'Description', logo: 'logo.png', date_release: '2023-01-01', date_revision: '2023-01-02' }
        });
        const productItem = getByText('Product 1'); // Ajusta según tu componente ProductsScreen
        fireEvent.press(productItem);

        const productScreen = getByTestId('ProductScreen'); // Ajusta según cómo identificas ProductScreen
        expect(productScreen).toBeTruthy();
    });

    it('navigates to ProductFormScreen with correct params', () => {
        const { getByText, getByTestId } = renderNavigator({
            initialRouteName: 'Products',
            initialParams: { id: '', name: '', description: '', logo: '', date_release: '', date_revision: '' }
        });
        const addButton = getByText('Add Product'); // Ajusta según tu componente ProductsScreen
        fireEvent.press(addButton);

        const productFormScreen = getByTestId('ProductFormScreen'); // Ajusta según cómo identificas ProductFormScreen
        expect(productFormScreen).toBeTruthy();
    });

    // Función helper para renderizar el navigator dentro de NavigationContainer para testing
    function renderNavigator(initialRouteParams?: { initialRouteName?: keyof RootStackParams, initialParams?: Partial<RootStackParams[keyof RootStackParams]> }) {
        const { initialRouteName, initialParams } = initialRouteParams || {};
        return render(
            <NavigationContainer>
                <ProductsNavigator />
            </NavigationContainer>
        );
    }
});
