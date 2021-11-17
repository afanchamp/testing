import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = ({ navigation }) => {
    let [stories, setStories] = useState([]);
    let [loader, setLoader] = useState(true)

    useEffect(() => {
        fetch(`https://dev-challenge.ap-southeast-2-dev.aws.yesterdaystories.net.au/stories`)
            .then((response) => response.json())
            .then((json) => {
                setStories(json);
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                console.error(error);
            });
    }, [])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Detail', {
                item: item,
            })}
                style={styles.item}
            >
                <Text style={styles.title}>{item.name}</Text>
                <Text numberOfLines={3} style={styles.description}>{item.description}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
            {stories && stories.length ?
                <FlatList
                    style={{ flex: 1 }}
                    data={stories}
                    renderItem={renderItem}
                />
                : null}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 20,
        backgroundColor: '#C5C5C5',
        borderRadius: 20
    },
    title: {
        fontSize: 25,
        fontWeight: '500',
        textDecorationLine: 'underline'
    },
    description: {
        fontSize: 18,
        marginTop: 10
    },
});

export default Home;