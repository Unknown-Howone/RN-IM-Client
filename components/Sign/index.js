import React from "react"
import {Alert, Button, StyleSheet, TextInput, View} from "react-native"

// 注册组件
const Sign = () => {
    const [id, setId] = React.useState("")
    const [passwd, setPasswd] = React.useState("")
    const [userName, setUserName] = React.useState("")
    // 点击注册按钮时的回调函数
    const toSign = () => {
        let user = {
            "id": id,
            "passwd": passwd,
            "name": userName
        }
        // 表单验证
        if (id === "" || passwd === "" || userName === "") {
            Alert.alert("请填写完整!")
            return
        } else if (id.length > 8) {
            Alert.alert("id不得超过8位!")
            return
        }

        const url = "http://localhost:8080/signIn"
        // 点击注册后向服务器发送请求进行注册
        fetch(
            url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then(response => {
            return response.json()
        }).then(data => {
            Alert.alert(data)
            // 点击注册后清空信息
            setId("")
            setPasswd("")
            setUserName("")
        }).catch(error => {
            Alert.alert(error)
        })
    }
    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setId}
                value={id}
                placeholder="请输入账号"
            />
            <TextInput
                style={styles.input}
                onChangeText={setUserName}
                value={userName}
                placeholder="请输入用户名"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPasswd}
                value={passwd}
                placeholder="请输入密码"
            />
            <Button title={"注册"} onPress={toSign}/>
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
    }
})
export default Sign