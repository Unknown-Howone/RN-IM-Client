import * as React from "react"
import {useEffect, useRef} from "react"
import {NavigationContainer} from "@react-navigation/native"
import {SafeAreaProvider} from "react-native-safe-area-context"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Home from "./components/Home"
import Fn from "./components/Fn"
import {Alert, LogBox} from "react-native"

// 忽略警告
LogBox.ignoreAllLogs()

// 引入底部导航
const Tab = createBottomTabNavigator()

// App总组件
const App = () => {
    // 整个APP的登陆状态
    const [isLogin, setIsLogin] = React.useState(false)
    // 登陆后的用户名
    const [userName, setUserName] = React.useState("")
    // 登陆后的id
    const [id, setId] = React.useState("")
    const ws = useRef(null)

    useEffect(() => {
        // 登录成功且未连接,则与后台进行websocket连接
        if (isLogin && ws.current === null) {
            ws.current = new WebSocket(`ws://127.0.0.1:8080/serve`)
            ws.current.onopen = () => {
                ws.current.send(id)
            }
        } else if (!isLogin) {
            if (ws.current !== null) {
                // 注册连接关闭事件,在连接断开后执行
                ws.current.onclose = () => {
                    Alert.alert("网络断开")
                    // 设置为null,不然下次再登陆不会进行连接请求
                    ws.current = null
                }
                // 客户端这里只是发起断开的请求
                ws.current.close()
            }
        }
    }, [isLogin])

    return (
        <SafeAreaProvider>
            {/*组件路由的容器*/}
            <NavigationContainer>
                {/*进入App默认路由到Home页面*/}
                <Tab.Navigator initialRouteName={Home}>
                    <Tab.Screen name="Fn" options={{
                        title: "聊天", headerStyle: {
                            backgroundColor: "#f4511e",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        }
                    }}>
                        {() => <Fn ws={ws} isLogin={isLogin} id={id}/>}
                    </Tab.Screen>
                    <Tab.Screen name="Home" options={{
                        title: "个人", headerStyle: {
                            backgroundColor: "#f4511e",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        }
                    }}>
                        {() => <Home ws={ws} isLogin={isLogin} setIsLogin={setIsLogin} userName={userName}
                                     setUserName={setUserName} id={id} setId={setId}/>}
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default App