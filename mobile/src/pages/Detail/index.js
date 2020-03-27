import React from 'react'
import {Feather} from '@expo/vector-icons'
import {View  , Image , Text , TouchableOpacity , Linking} from 'react-native'
import { useNavigation , useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function Detail(){
    const route = useRoute();

    const incident = route.params.incident;
    const navigation = useNavigation()
    const message = `Olá ${incident.nome}, estou entrando em contato pois gostaria de ajudar com o caso ${incident.title} com ${Intl.NumberFormat('pt-BR' , {style:"currency" , currency: "BRL"} ).format(incident.value)} `

    function navigateToIncidents(){ 
        navigation.navigate("Incidents")
    }
    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity style={styles.detailsButton}
                    onPress={navigateToIncidents} >                      
                        <Feather name="arrow-left" size={30} color="#E02041"/>
                    </TouchableOpacity>      
            </View>

            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.nome} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>Caso</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>Valor</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR' , {style:"currency" , currency: "BRL"} ).format(incident.value)}</Text>                  
            </View>

            <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>

                    <Text style={styles.heroDescription}>Entre em contato: </Text>
                    
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.action}
                        onPress={sendWhatsapp} >                      
                           <Text style={styles.actionText}>WhatsApp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action}
                    onPress={sendMail} >                      
                       <Text style={styles.actionText}>
                           Email
                       </Text>
                    </TouchableOpacity>
                    </View>
            </View>
        </View>
    )
}