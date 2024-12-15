import { Stack } from "expo-router";

const RootLayout = () => {
    return <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="BuyerHome" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
        <Stack.Screen name="Order" />
        <Stack.Screen name="Bid/[id]" />
        <Stack.Screen name="AllChats" options={{ title: 'Messages' }} />
    </Stack>
};

export default RootLayout;
