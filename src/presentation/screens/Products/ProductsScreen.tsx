import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, FlatList } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { globaStyles } from '../../theme/theme';
import { RootStackParams } from '../../routes/ProductsNavigator';
import { ProductComponent } from '../../../components/shared/ProductComponent';
import { PrimaryButton } from '../../../components/shared/ButtonComponents';
import ProductService from '../../../services/ProductService';

interface Producto {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}

export const ProductsScreen = () => {
    const [error, setError] = useState<string | null>(null);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]); 
    const [search, setSearch] = useState('');

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const productosData = await ProductService.getProductos();
                setProductos(productosData);
                setProductosFiltrados(productosData); // Inicialmente, mostramos todos los productos
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchProductos();
    }, []);

    useEffect(() => {

        if (search.trim() === '') {
            setProductosFiltrados(productos);
        } else {
            const filteredProducts = productos.filter((producto) =>
                producto.name.toLowerCase().includes(search.toLowerCase())
            );
            setProductosFiltrados(filteredProducts);
        }
    }, [search, productos]);

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            style={globaStyles.container}
        >
            <TextInput
                style={globaStyles.inputForm}
                placeholder="Buscar..."
                value={search}
                onChangeText={(text) => setSearch(text)}
            />

            <FlatList
                data={productosFiltrados}
                renderItem={({ item }) => (
                    <ProductComponent
                        onPress={() =>
                            navigation.navigate('Product', {
                                id: item.id,
                                name: item.name,
                                description: item.description,
                                logo: item.logo,
                                date_release: item.date_release,
                                date_revision: item.date_revision,
                            })
                        }
                        label={item.name}
                        idNumber={item.id}
                    />
                )}
                keyExtractor={(item) => item.id}
            />

            <PrimaryButton
                onPress={() =>
                    navigation.navigate('ProductForm', {
                        id: '',
                        name: '',
                        description: '',
                        logo: '',
                        date_release: '',
                        date_revision: '',
                    })
                }
                label="Agregar"
            />
        </KeyboardAvoidingView>
    );
};
