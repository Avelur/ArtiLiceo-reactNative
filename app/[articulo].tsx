import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

const ArticuloPage = () => {
    const { articulo } = useLocalSearchParams();
    
    return(
        <Text>{articulo}</Text>
    )
}

export default ArticuloPage;