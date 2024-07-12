import { View } from "react-native"
import { ProductsScreen } from "./Products/ProductsScreen"
import { globaStyles } from "../theme/theme"

export const HomeScreen = () => {
    return (
        <View style={globaStyles.container}>
            <ProductsScreen/>
        </View>
    )
}
