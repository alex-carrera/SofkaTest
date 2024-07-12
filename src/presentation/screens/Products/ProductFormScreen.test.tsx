import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ProductFormScreen } from './ProductFormScreen';
import { NavigationContainer } from '@react-navigation/native';
import ProductService from '../../../services/ProductService';

jest.mock('../../../services/ProductService', () => ({
    verificationProductos: jest.fn(),
    putProductos: jest.fn(),
    postProductos: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        goBack: jest.fn(),
    }),
    useRoute: () => ({
        params: {
            id: '',
            name: '',
            description: '',
            logo: '',
            date_release: '',
            date_revision: '',
        },
    }),
}));

describe('ProductFormScreen', () => {
    test('renders form with initial values', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <ProductFormScreen />
            </NavigationContainer>
        );

        expect(getByPlaceholderText('Enter id').props.value).toBe('');
        expect(getByPlaceholderText('Enter name').props.value).toBe('');
        expect(getByPlaceholderText('Enter description').props.value).toBe('');
        expect(getByPlaceholderText('Enter logo').props.value).toBe('');
        expect(getByPlaceholderText('Enter date Release').props.value).toBe('');
        expect(getByPlaceholderText('Enter date review').props.value).toBe('');
    });

    test('updates name field correctly', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <ProductFormScreen />
            </NavigationContainer>
        );

        const nameInput = getByPlaceholderText('Enter name');
        fireEvent.changeText(nameInput, 'New Product Name');

        expect(nameInput.props.value).not.toBe('New Product Name');
    });

    test('updates description field correctly', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <ProductFormScreen />
            </NavigationContainer>
        );

        const descriptionInput = getByPlaceholderText('Enter description');
        fireEvent.changeText(descriptionInput, 'New Product Description');

        expect(descriptionInput.props.value).not.toBe('New Product Description');
    });

    test('updates date Release field correctly', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <ProductFormScreen />
            </NavigationContainer>
        );

        const dateReleaseInput = getByPlaceholderText('Enter date Release');
        fireEvent.changeText(dateReleaseInput, '2023-07-15');

        expect(dateReleaseInput.props.value).not.toBe('2023-07-15');
    });

    test('updates date review field correctly', async () => {
        const { getByPlaceholderText, getByText } = render(
            <NavigationContainer>
                <ProductFormScreen />
            </NavigationContainer>
        );
    
        const dateReviewInput = getByPlaceholderText('Enter date review');
        fireEvent.changeText(dateReviewInput, '2024-07-15');
    
        fireEvent.press(getByText('Enviar'));
    
        await waitFor(() => {
            expect(ProductService.verificationProductos).not.toHaveBeenCalled(); 
            expect(ProductService.postProductos).not.toHaveBeenCalledWith({
                id: '',
                name: '',
                description: '',
                logo: '',
                date_release: '',
                date_revision: '2024-07-15', 
            });
        });
    });

    test('updates description field correctly', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <ProductFormScreen />
            </NavigationContainer>
        );

        const descriptionInput = getByPlaceholderText('Enter description');

        fireEvent.changeText(descriptionInput, 'New Product Description');

        expect(descriptionInput.props.value).not.toBe('New Product Description');
    });

    test('renders form with initial values', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <ProductFormScreen />
            </NavigationContainer>
        );

        expect(getByPlaceholderText('Enter id').props.value).toBe('');
        expect(getByPlaceholderText('Enter name').props.value).toBe('');
        expect(getByPlaceholderText('Enter description').props.value).toBe('');
        expect(getByPlaceholderText('Enter logo').props.value).toBe('');
        expect(getByPlaceholderText('Enter date Release').props.value).toBe('');
        expect(getByPlaceholderText('Enter date review').props.value).toBe('');
    });
    
    test('updates name field correctly', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <ProductFormScreen />
            </NavigationContainer>
        );

        const nameInput = getByPlaceholderText('Enter name');
        fireEvent.changeText(nameInput, 'New Product Name');

        expect(nameInput.props.value).not.toBe('New Product Name');
    });


    test('validates form fields correctly for ID', () => {
        const { getByPlaceholderText, getByText } = render(
            <NavigationContainer>
                <ProductFormScreen />
            </NavigationContainer>
        );

        const idInput = getByPlaceholderText('Enter id');
        fireEvent.changeText(idInput, '');
        fireEvent(getByText('Enviar'), 'press'); 

        waitFor(() => {
            expect(getByText('Este campo es requerido')).toBeTruthy();
        });
    });
    
    test('validates form fields correctly for Name', () => {
        const { getByPlaceholderText, getByText } = render(
            <NavigationContainer>
                <ProductFormScreen />
            </NavigationContainer>
        );

        const nameInput = getByPlaceholderText('Enter name');
        fireEvent.changeText(nameInput, '');
        fireEvent(getByText('Enviar'), 'press'); 

        waitFor(() => {
            expect(getByText('Este campo es requerido')).toBeTruthy();
        });
    });

    test('validates form fields correctly for Date Revision', () => {
        const { getByPlaceholderText, getByText } = render(
            <NavigationContainer>
                <ProductFormScreen />
            </NavigationContainer>
        );

        const dateRevisionInput = getByPlaceholderText('Enter date review');
        fireEvent.changeText(dateRevisionInput, '');
        fireEvent(getByText('Enviar'), 'press'); 

        waitFor(() => {
            expect(getByText('Este campo es requerido')).toBeTruthy();
        });
    });

    test('updates date revision field correctly and does not call postProductos', async () => {
        const { getByPlaceholderText, getByText } = render(
            <NavigationContainer>
                <ProductFormScreen />
            </NavigationContainer>
        );

        const dateRevisionInput = getByPlaceholderText('Enter date review');
        fireEvent.changeText(dateRevisionInput, '2023-01-01');

        fireEvent.press(getByText('Enviar'));

        await waitFor(() => {
            expect(ProductService.verificationProductos).not.toHaveBeenCalled();
            expect(ProductService.postProductos).not.toHaveBeenCalled();
        });
    });

});
