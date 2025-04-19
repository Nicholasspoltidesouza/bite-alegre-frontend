import React from "react"
import { View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


interface SearchRestaurantsProps {
    name : string;
    averagePrice : number;
    note : number;
    location : string;
    profilePhoto? : string
}

const SearchRestaurants: React.FC<SearchRestaurantsProps> = ({name, averagePrice, note, location, profilePhoto}) => {
    const iconSize = 24;
    const iconLeft = 18;
    const iconRight = 8;
    const spacing = 8;

    const dynamicPaddingLeft = iconLeft + iconSize + spacing;
    const dynamicPaddingRight = iconRight + iconSize + spacing;
    
    return (
    <View>
        <View>
            profilePhoto={profilePhoto}
            name={name}
            averagePrice={averagePrice}
            <MaterialIcons name="star" size={iconSize} color="#FF914B" />
            note={note}
            location={location}
        </View>
        <Text>Componente de pesquisa de restaurantes</Text>

    </View>
    )
}

export default SearchRestaurants