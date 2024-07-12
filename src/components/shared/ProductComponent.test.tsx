import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductComponent } from './ProductComponent'; // Ajusta la ruta según sea necesario

describe('ProductComponent', () => {
    const onPressMock = jest.fn();
    const label = 'Product Label';
    const idNumber = '12345';

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly with given label and idNumber', () => {
        const { getByText } = render(
            <ProductComponent onPress={onPressMock} label={label} idNumber={idNumber} />
        );

        expect(getByText(label)).toBeTruthy();
        expect(getByText(`ID: ${idNumber}`)).toBeTruthy();
    });

    test('calls onPress when pressed', () => {
        const { getByText } = render(
            <ProductComponent onPress={onPressMock} label={label} idNumber={idNumber} />
        );

        fireEvent.press(getByText(label));
        expect(onPressMock).toHaveBeenCalled();
    });
});
