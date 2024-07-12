import React, { useState } from 'react';
import { Image, Text, View, Modal } from 'react-native';
import { globaStyles } from '../../theme/theme';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../../routes/ProductsNavigator';
import { PrimaryButton, SecondaryButton, WarningButton } from '../../../components/shared/ButtonComponents';

interface ProductScreenProps {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string; 
}

export const ProductScreen = () => {
    const route = useRoute<RouteProp<RootStackParams, 'Product'>>();
    const {
        id,
        name,
        description,
        logo,
        date_release,
        date_revision
    } = route.params as ProductScreenProps;

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return ''; 
        try {
            // Cortar la cadena para obtener solo YYYY-MM-DD
            const isoDate = dateString.substring(0, 10);
            return isoDate;
        } catch (error) {
            console.error('Error formatting date:', error);
            return ''; 
        }
    };

    const data_release_format = formatDate(date_release);
    const data_revision_format = formatDate(date_revision);

    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParams, 'Product'>>();

    return (
        <View style={globaStyles.container}>
            <Text style={globaStyles.headerText}>{`ID: ${id}`} </Text>
            <Text>Información Extra</Text>

            <View style={{ ...globaStyles.description, marginTop: 60, paddingHorizontal: 30 }}>
                <Text>Nombre</Text>
                <Text style={{ fontWeight: 'bold' }}>{name}</Text>
            </View>

            <View style={{ ...globaStyles.description, paddingHorizontal: 30 }}>
                <Text>Descripción</Text>
                <Text numberOfLines={3} style={{ maxWidth: '50%', fontWeight: 'bold' }}>{description}</Text>
            </View>

            <View style={{ ...globaStyles.description, paddingLeft: 30, paddingRight: 30 }}>
                <Text>Logo</Text>
            </View>
            <Image
                style={{ width: 200, height: 125, alignSelf: 'center', borderRadius: 10, marginBottom: 20, marginTop: -15 }}
                source={{ uri: logo }}
            />

            <View style={{ ...globaStyles.description, paddingHorizontal: 30 }}>
                <Text>Fecha liberación</Text>
                <Text style={{ fontWeight: 'bold' }}>{data_release_format}</Text>
            </View>

            <View style={{ ...globaStyles.description, paddingHorizontal: 30 }}>
                <Text>Fecha revisión</Text>
                <Text style={{ fontWeight: 'bold' }}>{data_revision_format}</Text>
            </View>

            <View style={{ marginTop: 'auto', padding: 20 }}>
                <SecondaryButton
                    onPress={() => navigation.navigate('ProductForm', { id, name, description, logo, date_release, date_revision })}
                    label="Editar"
                />

                <WarningButton
                    onPress={() => setModalVisible(true)}
                    label="Eliminar"
                />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={globaStyles.centeredView}>
                    <View style={globaStyles.modalView}>
                        <Text style={globaStyles.modalText}>{`¿Estás seguro de eliminar el producto ${name}?`}</Text>
                        <PrimaryButton
                            onPress={() => {
                                navigation.navigate('Products');
                                setModalVisible(false);
                            }}
                            label="Confirmar"
                        />
                        <SecondaryButton
                            onPress={() => setModalVisible(false)}
                            label="Cancelar"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};
