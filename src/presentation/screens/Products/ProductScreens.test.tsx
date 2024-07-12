import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ProductScreen } from './ProductScreens'; 
import { NavigationContainer } from '@react-navigation/native';

const mockRouteParams = {
    id: '1',
    name: 'Product Name',
    description: 'Product Description',
    logo: 'logo.png',
    date_release: '2023-01-01',
    date_revision: '2024-01-01',
};

jest.mock('../../../services/ProductService', () => ({
    deleteProductos: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useRoute: () => ({
        params: mockRouteParams,
    }),
}));

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: jest.fn(),
    }),
    useRoute: () => ({
        params: {
            id: '1',
            name: 'Product Name',
            description: 'Product Description',
            logo: 'https://example.com/logo.png',
            date_release: '2023-07-15T00:00:00.000Z',
            date_revision: '2024-07-15T00:00:00.000Z',
        },
    }),
}));

describe('ProductScreen', () => {
    test('renders product details correctly', () => {
        const { getByText, getByPlaceholderText } = render(
            <NavigationContainer>
                <ProductScreen />
            </NavigationContainer>
        );

        expect(getByText('ID: 1')).toBeTruthy();
        expect(getByText('Nombre')).toBeTruthy();
        expect(getByText('Product Name')).toBeTruthy();
        expect(getByText('Descripción')).toBeTruthy();
        expect(getByText('Product Description')).toBeTruthy();
        expect(getByText('Fecha liberación')).toBeTruthy();
        expect(getByText('2023-07-15')).toBeTruthy();
        expect(getByText('Fecha revisión')).toBeTruthy();
        expect(getByText('2024-07-15')).toBeTruthy();
        expect(getByText('Editar')).toBeTruthy();
        expect(getByText('Eliminar')).toBeTruthy();
    });

    test('formats date correctly', () => {
        const { getByText } = render(
            <NavigationContainer>
                <ProductScreen />
            </NavigationContainer>
        );

        expect(getByText('2023-07-15')).toBeTruthy();
        expect(getByText('2024-07-15')).toBeTruthy();
    });

    test('opens delete confirmation modal on press', () => {
        const { getByText, getByPlaceholderText } = render(
            <NavigationContainer>
                <ProductScreen />
            </NavigationContainer>
        );

        fireEvent.press(getByText('Eliminar'));

        expect(getByText('¿Estás seguro de eliminar el producto Product Name?')).toBeTruthy();
        expect(getByText('Confirmar')).toBeTruthy();
        expect(getByText('Cancelar')).toBeTruthy();
    });


    test('displays delete confirmation modal on delete button press', () => {
        const { getByText, getByTestId } = render(
            <NavigationContainer>
                <ProductScreen />
            </NavigationContainer>
        );

        fireEvent.press(getByText('Eliminar'));
        expect(getByTestId('delete-modal')).toBeTruthy(); 

        fireEvent.press(getByText('Confirmar')); 
        fireEvent.press(getByText('Eliminar'));
        fireEvent.press(getByText('Cancelar')); 
    });

    test('renders correctly with initial data', () => {
        const { getByText, getByPlaceholderText } = render(
            <NavigationContainer>
                <ProductScreen />
            </NavigationContainer>
        );

        // Verificar que los elementos con los datos iniciales se rendericen correctamente
        expect(getByText(`ID: ${mockRouteParams.id}`)).toBeTruthy();
        expect(getByText(mockRouteParams.name)).toBeTruthy();
        expect(getByText(mockRouteParams.description)).toBeTruthy();
    });


});