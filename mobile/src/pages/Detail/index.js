import React from 'react'
import {Feather} from '@expo/vector-icons'
import {View  , Image , Text , TouchableOpacity , Linking} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function Detail(){
    const navigation = useNavigation()
    const message = "Olá APAD, estou entrando em contato pois gostaria de ajudar com o caso 'Cadelinha atropelada' com R$ 120,00 "

    function navigateToIncidents(){ 
        navigation.navigate("Incidents")
    }
    function sendMail(){
        MailComposer.composeAsync({
            subject: "Herói do caso: Cadelinha atropelada",
            recipients: ["teste@gmail.com"],
            body: message
        })
    }
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=551211111111&text=${message}`)
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
                    <Text style={styles.incidentValue}>APAD</Text>

                    <Text style={styles.incidentProperty}>Caso</Text>
                    <Text style={styles.incidentValue}>teste 454545</Text>

                    <Text style={styles.incidentProperty}>Valor</Text>
                    <Text style={styles.incidentValue}>R$ 600,00</Text>                   
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