import React, {useEffect} from "react"
import {Alert, Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View} from "react-native"
import EmptyList from "../EmptyList"
import {Avatar} from "@rneui/themed"

// 好友列表组件
const Pals = props => {
    // 好友列表数据
    const [DATA,setDATA] = React.useState([])
    const url = "http://localhost:8080/"
    // avatar是数组,每个元素是一个对象(用户id:头像的url)
    const [avatar,setAvatar] = React.useState([])

    // 获取用户头像映射
        const getMap = () => {
            fetch(
                url + "allAvatar",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(response => {
                return response.json()
            }).then(data => {
                let temp = []
                for (let index in data) {
                    temp = [...temp,{uid:data[index]["uid"],pic:data[index]["pic"]}]
                }
                setAvatar(temp)
            }).catch(error => Alert.alert(error))
        }

        // 遍历映射关系,得到id对应的头像url,拼接并返回
        const getUrl = (id) => {
            for (let i=0;i<avatar.length;i++) {
                if (id === avatar[i]["uid"]) {
                    // alert(avatar[i]["pic"])
                    return url + "static/img/" + avatar[i]["pic"]
                }
            }
        }

    // 获取好友列表
    const getList = () => {
        fetch(
            url + "list",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(props.extraData.id)
            }).then(response => {
            return response.json()
        }).then(data => {
            let temp = []
            for (let index in data) {
                temp = [...temp,{id:data[index]["pal_id"],title:data[index]["pal_name"]}]
            }
            setDATA(temp)
        }).catch(error => Alert.alert(error))
    }

    // 登陆之后对服务端请求好友列表信息
    useEffect(() => {
        if (props.extraData.isLogin) {
            getMap()
            getList()
        } else {
            // 退出之后清空好友列表
            setDATA([])
            setAvatar([])
        }
    }, [props.extraData.isLogin])

    // 点击按钮主动请求好友列表,主要用于刷新新添加的好友
    const reFlesh = () => {
        getMap()
        getList()
    }

    const Item = ({ id,title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}{"("+id+")"}</Text>
            {/*根据id遍历映射表获取头像url*/}
            <Avatar size={64} rounded source={{uri: getUrl(id)}}/>
            <Button title={"跟TA聊天->"} onPress={()=>{props.navigation.navigate("Chat",{id:id,ws:props.extraData.ws})}}/>
        </View>
    )

    const renderItem = ({ item }) => (
        <Item title={item.title} id={item.id}/>
    )


    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Button title={"刷新列表"} onPress={reFlesh}/>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={EmptyList}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        width:"100%"
    },
    item: {
        backgroundColor: "pink",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    }
})

export default Pals