import React, {useEffect, useRef} from "react"
import {Alert, Button, Text, TouchableHighlight, View} from "react-native"
import AddPals from "../Addpals"
import {Avatar} from "@rneui/themed"
import { Image } from '@rneui/themed'

// 个人信息组件
const Profile = props => {
    const url = "http://localhost:8080/"
    const [avatarUrl, setAvatarUrl] = React.useState("")
    const [pic, setPic] = React.useState([])

    // 退出后清空App的整体状态
    const logout = () => {
        props.setIsLogin(false)
        props.setUserName("")
        props.setId("")
    }

    // 获取头像
    const getAvatar = () => {
        fetch(
            url + "avatar",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(props.userId)
            }).then(response => {
            return response.json()
        }).then(data => {
            setAvatarUrl(data)
        }).catch(error => Alert.alert(error))
    }

    // 登陆后请求头像
    useEffect(() => {
        // 如果登陆则请求头像
        if (props.isLogin) {
            getAvatar()
        } else {
            // 退出后清空替换图片
            setPic([])
        }
    }, [props.isLogin])

    // 点击头像显示或隐藏备用图片
    const showPic = () => {
        // 如果没有图片资源
        if (pic.length === 0) {
            fetch(
                url + "getPic",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                return response.json()
            }).then(data => {
                setPic(data)
            }).catch(error => Alert.alert(error))
        } else {
            // 在显示图片的情况下点击头像则清空预览
            setPic([])
        }
    }

    // 替换头像
    const change = data => {
        let body = {"id":props.userId,"url":data}
        fetch(
            url + "changeAvatar",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(body)
            }).then(response => {
            return response.json()
        }).then(() => {}).catch(() => {})
        // 替换之后重新获取头像
        getAvatar()
    }

    return (
        <View>
            <Text style={{position: "relative", left: 50, fontSize: 30}}>用户:{props.userName}</Text>
            <View style={{position: "relative", left: 70}}>
                <Avatar size={64} rounded source={{uri: avatarUrl}} onPress={showPic}/>
            </View>
            <View style={{
                flex: 0.5,
                flexDirection: "row",
                alignItems: "center",
                width: 100,
                height: 50,
                marginTop: 50,
                marginBottom: 30
            }}>
                {
                    pic.map(v => {
                        return <Image
                            key={v}
                            style={{width: 50, height: 50, marginRight: 20}}
                            source={{uri: v}}
                            onPress={() => {
                                // 此处要双击实时更换头像
                                // 为了传参数,封装一下高阶函数,而不是直接绑定click
                                change(v)
                            }}
                        />
                    })
                }
            </View>
            <AddPals userId={props.userId} userName={props.userName} isLogin={props.isLogin} ws={props.ws}/>
            <Button title={"退出登陆"} onPress={logout}/>
        </View>
    )
}

export default Profile