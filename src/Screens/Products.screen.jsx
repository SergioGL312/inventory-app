import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

// API
import { getProductos } from '../Api/Products.api';

export default function Products({ navigation }) {
    const [productos, setProductos] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const productosData = await getProductos();
            setProductos(productosData);
            setFullData(productosData);
        };

        fetchData();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (product) => {
            return contains(product, formattedQuery);
        });
        setProductos(filteredData);
    }
    const contains = (product, query) => {
        if (product.nombre.toLowerCase().includes(query)) {
            return true;
        }
        return false;

    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerRight: () => (
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder='Search'
                        clearButtonMode='always'
                        autoCorrect={false}
                        value={searchQuery}
                        onChangeText={(query) => handleSearch(query)}
                    />
                    {searchQuery !== '' && (
                        <TouchableOpacity onPress={clearSearch}>
                            <Text style={{ color: "#ccc" }}>x</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ),
        });
    }, [navigation, searchQuery]);

    const clearSearch = () => {
        setSearchQuery("");
        setProductos(fullData);
    };

    const renderProducto = ({ item }) => (
        <View style={styles.productoContainer}>

            <View>
                <Image source={{ uri: 'https://picsum.photos/200/200' }} style={styles.productoImagen} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.productoNombre}>{item.nombre}</Text>
            </View>

            <View style={styles.stockActualContainer}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>{item.stock_actual}</Text>
            </View>
        </View>
    );

    return (
        <View>
            <FlatList
                data={productos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderProducto}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    productoContainer: {
        paddingLeft: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    productoImagen: {
        width: 50,
        height: 50,
        // marginRight: 10,
        borderRadius: 50,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 16,
    },
    productoNombre: {
        // paddingLeft: 0,
        fontSize: 17,
        fontWeight: '600',
    },
    stockActualContainer: {
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        width: '100%',
        marginRight: 15,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
    },
    searchContainer: {
        marginRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
