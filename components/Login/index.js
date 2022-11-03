import React from "react"
import {Alert, Button, StyleSheet, TextInput, View} from "react-native"

// 登陆组件
const Login = props => {
    // 使用状态保存id与密码
    const [id, setId] = React.useState()
    const [passwd, setPasswd] = React.useState()

    // 点击登陆按钮时的回调函数
    const toLogin = () => {
        // 验证表单
        if (id === "" || passwd === "") {
            Alert.alert("请填写完整!")
            return
        }

        const url = "http://localhost:8080/login"
        let loginMsg = {
            "id": id,
            "passwd": passwd
        }
        // 点击登陆后向服务器发送请求进行登陆
        fetch(
            url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginMsg)
            }).then(response => {
            return response.json()
        }).then(data => {
            if (data.substring(0, 4) === "登陆成功") {
                // 提示登陆成功
                // Alert.alert(data)
                // 登陆成功后清空输入框密码
                setPasswd("")
                // 设置登陆后的用户名
                props.setUserName(data.substring(8))
                // 设置登陆后的id
                props.setId(id)
                // 调用App传给Home传到此的setIsLogin来改变App状态
                props.setIsLogin(true)
            } else {
                // 登陆失败后清空输入框密码
                setPasswd("")
                // 提示失败原因
                Alert.alert(data)
            }
        }).catch(error => Alert.alert(error))
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
                onChangeText={setPasswd}
                value={passwd}
                placeholder="请输入密码"
            />
            <Button title={"登陆"} onPress={toLogin}/>
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
export default Login