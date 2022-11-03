import React from "react"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Pals from "../Pals"
import Chat from "../Chat"

const Stack = createNativeStackNavigator()

// 好友列表与聊天界面到路由组件
const Fn = props => {
    return (
            <Stack.Navigator initialRouteName={Pals}>
                {/*好友列表组件*/}
                <Stack.Screen name="Pals" options={{
                    title: "好友列表", headerStyle: {
                        backgroundColor: "lightyellow",
                    },
                    headerTintColor: "black",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    }
                }}>
                    {prop => <Pals {...prop}  extraData={{id:props.id,isLogin:props.isLogin,ws:props.ws}}/>}
                </Stack.Screen>
                {/*聊天界面*/}
                <Stack.Screen name="Chat" options={{
                    title: "聊天", headerStyle: {
                        backgroundColor: "lightyellow",
                    },
                    headerTintColor: "black",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    }
                }}>
                    {prop => <Chat {...prop} extraData={{id:props.id,isLogin:props.isLogin}}/>}
                </Stack.Screen>
            </Stack.Navigator>
    )
}

export default Fn