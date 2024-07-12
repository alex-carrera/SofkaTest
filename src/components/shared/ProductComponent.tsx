import { Pressable, Text } from "react-native";
import { globaStyles } from "../../presentation/theme/theme";


interface Props {
    onPress: () => void;
    idNumber: string,
    label: string,
}

export const ProductComponent = ({ onPress, label, idNumber }: Props) => {
    return (
        <Pressable
            onPress={() => onPress()}
            style={globaStyles.product}>
            <Text>{label}</Text>
            <Text style={globaStyles.productText}>{`ID: ${idNumber}`}</Text>
        </Pressable>
    )
}
