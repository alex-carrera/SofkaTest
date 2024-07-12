import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import { globaStyles, globalColors } from '../../theme/theme';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../../routes/ProductsNavigator';
import { PrimaryButton, SecondaryButton } from '../../../components/shared/ButtonComponents';

interface FormErrors {
    id: string;
    name: string;
    description: string;
    logo: string;
    dateRelease: string;
    dateRevision: string;
}

export const ProductFormScreen = () => {
    const params = useRoute<RouteProp<RootStackParams, 'Product'>>().params;

    const [id, setId] = useState<string>(params.id);
    const [name, setName] = useState<string>(params.name);
    const [description, setDescription] = useState<string>(params.description);
    const [logo, setLogo] = useState<string>(params.logo);
    const [dateRelease, setDateRelease] = useState<string>(params.date_release.substring(0, 10));
    const [dateRevision, setDateRevision] = useState<string>(params.date_revision.substring(0, 10));
    const [errors, setErrors] = useState<FormErrors>({
        id: '',
        name: '',
        description: '',
        logo: '',
        dateRelease: '',
        dateRevision: '',
    });

    const validateForm = () => {
        let errors: FormErrors = {
            id: '',
            name: '',
            description: '',
            logo: '',
            dateRelease: '',
            dateRevision: '',
        };

        if (id.length > 10 || id.length < 3) errors.id = 'ID no válido';
        if (!id) errors.id = 'Este campo es requerido';
        if (!name) errors.name = 'Este campo es requerido';
        if (name.length > 100 || name.length < 5) errors.name = 'Nombre no válido';
        if (!description) errors.description = 'Este campo es requerido';
        if (description.length > 200 || description.length < 10) errors.description = 'Descripción no válida';
        if (!logo) errors.logo = 'Este campo es requerido';
        if (!dateRelease) errors.dateRelease = 'Este campo es requerido';
        if (!dateRevision) errors.dateRevision = 'Este campo es requerido';

        // Validación de fecha de liberación
        const today = new Date().toISOString().substring(0, 10);
        if (dateRelease < today) errors.dateRelease = 'La fecha de liberación debe ser igual o posterior a hoy';

        const releaseDate = new Date(dateRelease);
        const revisionDate = new Date(dateRevision);
        const oneYearLater = new Date(releaseDate.getFullYear() + 1, releaseDate.getMonth(), releaseDate.getDate())
            .toISOString()
            .substring(0, 10);

        if (dateRevision !== oneYearLater) {
            errors.dateRevision = `La fecha de revisión debe ser exactamente un año posterior a la fecha de liberación (${oneYearLater})`;
        }

        setErrors(errors);
        return Object.keys(errors).every((key) => errors[key as keyof FormErrors] === '');
    };

    const handleSubmit = () => {
        if (validateForm()) {
            
            setId(params.id);
            setName(params.name);
            setDescription(params.description);
            setLogo(params.logo);
            setDateRelease(params.date_release.substring(0, 10));
            setDateRevision(params.date_revision.substring(0, 10));
            setErrors({
                id: '',
                name: '',
                description: '',
                logo: '',
                dateRelease: '',
                dateRevision: '',
            });
        }
    };

    const restartForm = () => {
        setId(params.id);
        setName(params.name);
        setDescription(params.description);
        setLogo(params.logo);
        setDateRelease(params.date_release.substring(0, 10));
        setDateRevision(params.date_revision.substring(0, 10));
        setErrors({
            id: '',
            name: '',
            description: '',
            logo: '',
            dateRelease: '',
            dateRevision: '',
        });
    };

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            style={globaStyles.container}
        >
            <Text style={{ marginBottom: 10, fontSize: 30 }}>Formulario de Registro </Text>

            <Text style={{ marginBottom: 5 }}>ID</Text>
            <TextInput
                style={errors.id ? globaStyles.warningForm : globaStyles.inputForm}
                placeholder="Enter id"
                value={id}
                onChangeText={setId}
            />
            {errors.id ? <Text style={globaStyles.errorText}>{errors.id}</Text> : null}

            <Text style={{ marginBottom: 5 }}>Nombre</Text>
            <TextInput
                style={errors.name ? globaStyles.warningForm : globaStyles.inputForm}
                placeholder="Enter name"
                value={name}
                onChangeText={setName}
            />
            {errors.name ? <Text style={globaStyles.errorText}>{errors.name}</Text> : null}

            <Text style={{ marginBottom: 5 }}>Descripción</Text>
            <TextInput
                style={errors.description ? globaStyles.warningForm : globaStyles.inputForm}
                placeholder="Enter description"
                value={description}
                onChangeText={setDescription}
            />
            {errors.description ? <Text style={globaStyles.errorText}>{errors.description}</Text> : null}

            <Text style={{ marginBottom: 5 }}>Logo</Text>
            <TextInput
                style={errors.logo ? globaStyles.warningForm : globaStyles.inputForm}
                placeholder="Enter logo"
                value={logo}
                onChangeText={setLogo}
            />
            {errors.logo ? <Text style={globaStyles.errorText}>{errors.logo}</Text> : null}

            <Text style={{ marginBottom: 5 }}>Fecha Liberación</Text>
            <TextInput
                style={errors.dateRelease ? globaStyles.warningForm : globaStyles.inputForm}
                placeholder="Enter date Release"
                value={dateRelease}
                onChangeText={setDateRelease}
            />
            {errors.dateRelease ? <Text style={globaStyles.errorText}>{errors.dateRelease}</Text> : null}

            <Text style={{ marginBottom: 5 }}>Fecha Revisión</Text>
            <TextInput
                style={errors.dateRevision ? globaStyles.warningForm : globaStyles.inputForm}
                placeholder="Enter date review"
                value={dateRevision}
                onChangeText={setDateRevision}
            />
            {errors.dateRevision ? <Text style={globaStyles.errorText}>{errors.dateRevision}</Text> : null}

            <PrimaryButton onPress={handleSubmit} label="Enviar" />
            <SecondaryButton onPress={restartForm} label="Reiniciar" />
        </KeyboardAvoidingView>
    );
};
