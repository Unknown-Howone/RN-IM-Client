import React from "react"
import {View, Text, StyleSheet} from "react-native"

const EmptyList = () => {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center",height:600}}>
            <Text style={styles.empty}>请先登陆...</Text>
            <Text style={styles.empty}>或者去添加好友?</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    empty: {
        fontSize:30
    }
})
export default EmptyList