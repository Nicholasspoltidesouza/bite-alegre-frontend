import React from "react"
import { View, Text } from "react-native";

interface SearchUsers {
    name : string;
    nickname : string;
    profilePhoto : string;
}

const SearchUsers: React.FC = () => {
    return (
    <View>
        <Text>Componente de pesquisa de usuários</Text>

    </View>
    )
}

export default SearchUsers