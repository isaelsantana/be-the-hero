import React , {useEffect , useState} from 'react'
import {Feather} from '@expo/vector-icons'
import {View ,FlatList , Image , Text , TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';
import styles from './styles'
import api from '../../services/api';

export default function Incidents(){
    const [listIncidents , setListIncidents] = useState([])
    const [total , setTotal] = useState(0);
    const navigation =  useNavigation();

    function navigateToDetail(){ 
        navigation.navigate("Detail");
    }

    async function loadIncidents(){
        try{
            const res = await api.get('/incidents')
            setListIncidents(res.data)
            setTotal(res.headers['x-total-count'])
        }catch(err){
            console.log("Erro ao consultar casos")
        }
    }

    useEffect(() => {   
        loadIncidents()    
    }, [])
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>            
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos caos abaixo e salve o dia</Text>

            <FlatList style={styles.incidentList} 
            showsVerticalScrollIndicator={false}           
            data={listIncidents}
            keyExtractor={(x,index) => String(index)}
            renderItem={({item: incident}) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.nome}</Text>

                    <Text style={styles.incidentProperty}>Caso</Text>
                    <Text style={styles.incidentValue}>{incident.description}</Text>

                    <Text style={styles.incidentProperty}>Valor</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR' , {style:"currency" , currency: "BRL"} ).format(incident.value)}</Text>

                    <TouchableOpacity style={styles.detailsButton}
                    onPress={navigateToDetail} >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>
                </View>
            )}
                
            />
          
        </View>
    )
}