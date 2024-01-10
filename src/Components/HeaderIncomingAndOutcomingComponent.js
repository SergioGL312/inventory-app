import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HeaderIncomingAndOutcomingComponent({ backgroundColor, accion, currentDate, noDoc }) {
    return (
        <View style={[styles.infoIncommingContainer, { backgroundColor }]}>
            <View style={[styles.dateContainer, { flex: 1 }]}>
                <Text style={{ paddingBottom: 12, fontSize: 16 }}>Fecha {accion}:</Text>
                <Text style={{ borderBottomWidth: 1, width: "90%", color: "#616A6B" }}>{currentDate}</Text>
            </View>
            <View style={[styles.noInContainer, { flex: 1 }]}>
                <Text style={{ paddingBottom: 12, fontSize: 16 }}>No. doc.</Text>
                <Text style={{ borderBottomWidth: 1, width: "90%", color: "#616A6B" }}>{noDoc}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    infoIncommingContainer: {
        flexDirection: 'row',
        height: 96,
        // backgroundColor: "#CBF8B8",
        // B9B8F8
    },
    dateContainer: {
        justifyContent: 'center',
        paddingLeft: 20

    },


    noInContainer: {
        justifyContent: 'center',
        paddingLeft: 20
    },
})