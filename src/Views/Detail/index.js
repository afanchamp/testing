import { Icon } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Detail = ({ route, navigation }) => {
    let [categories, setCategories] = useState([]);
    let [loader, setLoader] = useState(true)

    useEffect(() => {
        fetch(`https://dev-challenge.ap-southeast-2-dev.aws.yesterdaystories.net.au/categories`)
            .then((response) => response.json())
            .then((json) => {
                setCategories(json.categories);
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                console.error(error);
            });
    }, [])

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.categoryText}>{item.name}</Text>
            </View>
        )
    }
    const { item} = route.params;
    return (
        <SafeAreaView style={{ flex: 1}}>
            <Icon onPress={() => navigation.goBack()} name="chevron-left" type='Feather' style={styles.Icon} />
            <View style={styles.container}>
            <Text style={styles.title}>{item.name}</Text>
            {categories && categories.length ?
                <FlatList
                    style={{ flex: 1, marginTop:10 }}
                    data={categories}
                    renderItem={renderItem}
                />
                : null}
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    Icon:{
        fontSize:40, 
        paddingHorizontal: 10
    },
    container:{
        flex:1,
        paddingHorizontal:20
    },
    item:{
        paddingHorizontal: 20, 
        paddingVertical:10,
        marginVertical:10, 
        backgroundColor:'#C5C5C5',
        borderRadius:20
    },
    title: {
        fontSize: 25,
        fontWeight:'500',
        marginTop:20
    },
    categoryText: {
        fontSize: 18,
    },
});

export default Detail;