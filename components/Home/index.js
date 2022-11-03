import React, {useEffect} from "react"
import {View} from "react-native"
import Login from "../Login"
import Sign from "../Sign"
import Profile from "../Profile"
import {Button} from "react-native-elements"

// 个人起始组件
const Home = (props) => {
    const [loginShow, setLoginShow] = React.useState("flex")
    const [personShow, setPersonShow] = React.useState("none")
    const [loginState, setLoginState] = React.useState("none")
    const [signState, setSignState] = React.useState("none")
    const [loginBtn, setLoginBtn] = React.useState("⬆️")
    const [signBtn, setSignBtn] = React.useState("⬆️")

    // 检测登陆状态，登陆显示用户信息，未登陆显示登陆注册模块
    useEffect(() => {
        if (props.isLogin) {
            setLoginShow("none")
            setPersonShow("flex")
        } else {
            setLoginShow("flex")
            setPersonShow("none")
        }
    }, [props.isLogin])

    // 更改登陆注册板块的函数
    const toLogin = () => {
        if (loginState === "flex") {
            setLoginState("none")
            setLoginBtn("⬆️")
        } else {
            setLoginState("flex")
            setLoginBtn("⬇️")
        }
    }
    const toSign = () => {
        if (signState === "flex") {
            setSignState("none")
            setSignBtn("⬆️")
        } else {
            setSignState("flex")
            setSignBtn("⬇️")
        }
    }

    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            {/*如果未登陆则显示登陆注册界面*/}
            <View style={{display: loginShow}}>
                {/*登陆*/}
                <Button
                    title={"登陆" + loginBtn}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    onPress={toLogin}
                />
                <View style={{display: loginState}}>
                    <Login setIsLogin={props.setIsLogin} setUserName={props.setUserName} setId={props.setId}/>
                </View>

                {/*注册*/}
                <Button
                    title={"注册" + signBtn}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    onPress={toSign}
                />
                <View style={{display: signState}}>
                    <Sign/>
                </View>
            </View>
            {/*如果登陆则显示个人信息界面*/}
            <View style={{display: personShow}}>
                <Profile ws={props.ws} userId={props.id} isLogin={props.isLogin} setIsLogin={props.setIsLogin} userName={props.userName} setUserName={props.setUserName} setId={props.setId}/>
            </View>
        </View>
    )
}

export default Home