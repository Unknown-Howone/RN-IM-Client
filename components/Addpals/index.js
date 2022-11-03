import React from "react"
import {Alert, StyleSheet, Text, TextInput, View} from "react-native"
import {Button} from "@rneui/base"

// 添加好友组件
const AddPals = (props) => {
    const [id, setId] = React.useState("")
    const [searchId,setSearchId] = React.useState("")
    const [searchName,setSearchName] = React.useState("")
    const url = "http://localhost:8080/"

    // 退出登陆时清空搜索用户结果
    React.useEffect(() => {
        setId("")
        setSearchId("")
        setSearchName("")
    },[props.isLogin])

    // 查找用户功能
    const search = () => {
        if (id === "") {
            Alert.alert("请填写完整!")
            return
        } else if (id.length > 8) {
            Alert.alert("id不得超过8位!")
            return
        }
        // 点击搜索进行搜索请求
        fetch(
            url+"search",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(id)
            }).then(response => {
            return response.json()
        }).then(data => {
            setSearchId(data.split(":")[0])
            setSearchName(data.split(":")[1])
        }).catch(() => {
            // 若服务端没有返回,则提示
            Alert.alert("查询失败!")
        })
    }

    // 点击按钮添加好友
    const addPals = () => {
        fetch(
            url+"addPal",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // 发送要添加的好友的id与自己的id
                body: JSON.stringify(props.userId+":"+props.userName+":"+searchId+":"+searchName)
            }).then(response => {
            return response.json()
        }).then(data => {
            Alert.alert(data)
        }).catch(() => {
            // 若服务端没有返回,则提示
            Alert.alert("添加失败!")
        })
    }
    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setId}
                value={id}
                placeholder="查找用户"
            />
            <Button title={"查找"} onPress={search}/>
            <View style={styles.search}>
                <Text>                      id:{searchId}</Text>
                <Text>                      用户名:{searchName}</Text>
                <Button title={"添加好友"} onPress={addPals}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200
    },
    search: {
        backgroundColor:"yellow"
    }
})

export default AddPals