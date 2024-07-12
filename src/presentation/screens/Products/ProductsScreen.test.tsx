import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ProductsScreen } from './ProductsScreen'; // Ajusta la ruta según sea necesario
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParams } from '../../routes/ProductsNavigator';
import ProductService from '../../../services/ProductService';

jest.mock('../../../services/ProductService', () => ({
    getProductos: jest.fn().mockResolvedValue([
        {
            id: '1',
            name: 'Product 1',
            description: 'Description of Product 1',
            logo: 'https://example.com/logo1.png',
            date_release: '2023-01-01',
            date_revision: '2023-01-10',
        },
        {
            id: '2',
            name: 'Product 2',
            description: 'Description of Product 2',
            logo: 'https://example.com/logo2.png',
            date_release: '2023-02-01',
            date_revision: '2023-02-10',
        },
    ]),
}));

describe('ProductsScreen', () => {
    test('renders list of products correctly', async () => {
        const { getByText, getByPlaceholderText } = render(
            <NavigationContainer>
                <ProductsScreen />
            </NavigationContainer>
        );

        
        await waitFor(() => {
            expect(getByText('Product 1')).toBeTruthy();
            expect(getByText('Product 2')).toBeTruthy();
        });
    });

    test('navigates to ProductForm screen on "Agregar" button press', async () => {
        const { getByText } = render(
            <NavigationContainer>
                <ProductsScreen />
            </NavigationContainer>
        );

        const addButton = getByText('Agregar');
        fireEvent.press(addButton);
    });


    test('renders list of products correctly', async () => {
        const { getByText } = render(
            <NavigationContainer>
                <ProductsScreen />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(getByText('Product 1')).toBeTruthy();
            expect(getByText('Product 2')).toBeTruthy();
        });
    });

    test('renders list of products correctly', async () => {
        const { getByText } = render(
            <NavigationContainer>
                <ProductsScreen />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(getByText('Product 1')).toBeTruthy();
            expect(getByText('Product 2')).toBeTruthy();
        });
    });

    test('navigates to ProductForm screen on "Agregar" button press', async () => {
        const { getByText } = render(
            <NavigationContainer>
                <ProductsScreen />
            </NavigationContainer>
        );

        const addButton = getByText('Agregar');
        fireEvent.press(addButton);

    });

    test('filters products based on search input', async () => {
        const { getByPlaceholderText, getByText, queryByText } = render(
            <NavigationContainer>
                <ProductsScreen />
            </NavigationContainer>
        );
    
        const searchInput = getByPlaceholderText('Buscar...');
        fireEvent.changeText(searchInput, 'Product 1');
    
        // Espera a que se filtren los productos
        await waitFor(() => {
            expect(getByText('Product 1')).toBeTruthy();
            expect(queryByText('Product 2')).toBeNull(); 
        });
    });

    test('navigates to ProductForm screen on "Agregar" button press', () => {
        const { getByText } = render(
            <NavigationContainer>
                <ProductsScreen />
            </NavigationContainer>
        );
    
        const addButton = getByText('Agregar');
        fireEvent.press(addButton);
    
    });

    test('navigates to ProductDetail screen on product press', async () => {
        const { getByText, findByText } = render(
            <NavigationContainer>
                <ProductsScreen />
            </NavigationContainer>
        );
    
        // Espera a que se carguen los productos
        await waitFor(() => {
            expect(getByText('Product 1')).toBeTruthy();
        });
    
        // Simula el tap en el primer producto
        fireEvent.press(getByText('Product 1'));
    
        // Verifica que se navegue correctamente a la pantalla de detalle del producto
        const productDetailHeader = await findByText('Detalles del Producto');
        expect(productDetailHeader).toBeTruthy();
    });
    
    

});
