import { Pressable, Text } from "react-native";
import { globalColors, globaStyles } from "../../presentation/theme/theme";


interface Props {
    onPress: () => void;
    label: string,
}

export const PrimaryButton = ({ onPress, label }: Props) => {
    return (
        
        <Pressable
            onPress={() => onPress() }
            style={{...globaStyles.primaryButton, backgroundColor: globalColors.primary}}
            >
            <Text style={globaStyles.buttonPrimatyText}>{label}</Text>
            
        </Pressable>
    )
}

export const SecondaryButton = ({ onPress, label }: Props) => {
    return (
        
        <Pressable
            onPress={() => onPress() }
            style={{...globaStyles.primaryButton, backgroundColor: globalColors.secondary}}
            >
            <Text style={globaStyles.buttonPrimatyText}>{label}</Text>
            
        </Pressable>
    )
}

export const WarningButton = ({ onPress, label }: Props) => {
    return (
        
        <Pressable
            onPress={() => onPress() }
            style={{...globaStyles.primaryButton, backgroundColor: globalColors.warning}}
            >
            <Text style={globaStyles.buttonWarningText}>{label}</Text>
            
        </Pressable>
    )
}