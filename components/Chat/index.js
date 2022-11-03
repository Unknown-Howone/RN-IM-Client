import React, {useEffect, useRef} from "react"
import {Alert, ScrollView, StyleSheet, Text, TextInput, View} from "react-native"
import {Button} from "@rneui/base"

// 聊天组件
const Chat = props => {
    const [text, setText] = React.useState("")
    const [msg, setMsg] = React.useState([])
    const url = "http://localhost:8080/"
    const id = props.extraData.id.toString()
    const palId = props.route.params.id.toString()
    const chatView = useRef(null)

    // 当初始化信息与有新消息时滑倒底部
    useEffect(() => {
        chatView.current.scrollToEnd({animated: true})
    }, [msg])

    // 发送已读信息列表
    const read = readList => {
        fetch(
            url + "read",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([parseInt(id), ...readList])
            }).then(response => {
            return response.json()
        }).then(() => {
        }).catch(() => {
        })
    }

    // 监听新信息
    setTimeout(() => {
        if (props.route.params.ws.current !== null) {
            props.route.params.ws.current.onmessage = e => {
                let data = JSON.parse(e.data)
                let readList = []
                let temp = []
                for (let index in data) {
                    temp = [...temp, {
                        no: data[index]["no"],
                        id: data[index]["id"],
                        palId: data[index]["pal_id"],
                        content: data[index]["content"],
                        time: data[index]["time"],
                        isRead: data[index]["is_read"]
                    }
                    ]
                    readList = [...readList, data[index]["no"]]
                }
                read(readList)
                setMsg([...msg, ...temp])
            }
        }
    }, 100)

    // 初始化聊天信息
    useEffect(() => {
        let body = {"id": id, "palId": palId}
        fetch(
            url + "initChat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(response => {
            return response.json()
        }).then(data => {
            let readList = []
            let temp = []
            for (let index in data) {
                temp = [...temp, {
                    no: data[index]["no"],
                    id: data[index]["id"],
                    palId: data[index]["pal_id"],
                    content: data[index]["content"],
                    time: data[index]["time"],
                    isRead: data[index]["is_read"]
                }
                ]
                // 如果是未读的信息则添加进已读列表
                if (data[index]["is_read"] === 0) {
                    readList = [...readList, data[index]["no"]]
                }
            }
            // 更新信息的阅读状态
            read(readList)
            setMsg(temp)
        }).catch(() => {
            Alert.alert("没有聊天记录!")
        })
    }, [])

    // 发送信息
    const send = () => {
        let body = {"id": id, "palId": palId, "text": text}
        fetch(
            url + "newMsg",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(response => {
            return response.json()
        }).then(() => {
        }).catch(() => {
        })
        setText("")
    }

    return (
        <View>
            <ScrollView style={styles.chat} ref={chatView}>
                {
                    msg.map(v => {
                        // 区分对话双方的对话框样式
                        if (v.id === props.extraData.id) {
                            return (
                                <View key={v.no} style={styles.me}>
                                    <Text style={{fontSize: 20}}>{v.time}</Text>
                                    <Text style={{fontSize: 35}}>{v.content}</Text>
                                </View>
                            )
                        }
                        return (
                            <View key={v.no} style={styles.notMe}>
                                <Text style={{fontSize: 20}}>{v.time}</Text>
                                <Text style={{fontSize: 35}}>{v.content}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <View style={styles.inputView}>
                <TextInput style={styles.input} onChangeText={setText} value={text}/>
                <Button onPress={send} title={"发送"} style={styles.button}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    chat: {
        height: "90%",
    },
    inputView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        bottom: -70,
        backgroundColor: "lightyellow",
        width: "100%"
    },
    input: {
        width: "70%",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        width: 60
    },
    me: {
        backgroundColor: "lightgreen",
        width: "50%",
        position: "relative",
        right: "-47%",
        borderRadius: 8,
        marginBottom: 20
    },
    notMe: {
        backgroundColor: "gray",
        width: "50%",
        borderRadius: 8,
        marginBottom: 20
    }
})

export default Chat