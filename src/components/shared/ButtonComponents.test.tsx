import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PrimaryButton, SecondaryButton, WarningButton } from './ButtonComponents'; 
describe('Button Components', () => {
    const onPressMock = jest.fn();
    const label = 'Click me';

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('PrimaryButton renders correctly and responds to press', () => {
        const { getByText } = render(
            <PrimaryButton onPress={onPressMock} label={label} />
        );

        const button = getByText(label);
        expect(button).toBeTruthy();

        fireEvent.press(button);
        expect(onPressMock).toHaveBeenCalled();
    });

    test('SecondaryButton renders correctly and responds to press', () => {
        const { getByText } = render(
            <SecondaryButton onPress={onPressMock} label={label} />
        );

        const button = getByText(label);
        expect(button).toBeTruthy();

        fireEvent.press(button);
        expect(onPressMock).toHaveBeenCalled();
    });

    test('WarningButton renders correctly and responds to press', () => {
        const { getByText } = render(
            <WarningButton onPress={onPressMock} label={label} />
        );

        const button = getByText(label);
        expect(button).toBeTruthy();

        fireEvent.press(button);
        expect(onPressMock).toHaveBeenCalled();
    });
});
