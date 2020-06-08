import React,{useEffect, useState,ChangeEvent} from 'react';
import {Feather as Icons} from '@expo/vector-icons'
import {StyleSheet,View , ImageBackground,Text, Image} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native' // biblioteca para navegar enter páginas
import RNPickerSelect from 'react-native-picker-select';

import axios from 'axios';

interface IBGEUfElements{
    sigla: string;
  }
  
  interface IBGECytiElements{
      nome: string;
  }

const Home = () => {
    const navigation = useNavigation();

    const[ufs, setUfs] = useState<string[]>([]);
    const[cities, setCities] = useState<string[]>([]);

    const [selectedUf,setSelectedUf] = useState("0");
    const [selectedCity,setSelectedCity] = useState("0");


    useEffect(() =>{
        axios.get<IBGEUfElements[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response =>{
          const ufs = response.data.map(uf => uf.sigla);
          setUfs(ufs);
       });
      },[]);
       
      useEffect(() =>{
          axios.get<IBGECytiElements[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
          .then(response =>{
              const cities = response.data.map(city => city.nome);
              setCities(cities);
           });
          },[selectedUf]);

    function handleselectedUf(uf : string){
            setSelectedUf(uf);
        }
     function handleselectedCity(city : string){
            setSelectedCity(city);
        }

    function handleNavigationPoints(){
        navigation.navigate('Points',{
            uf: selectedUf,
            city: selectedCity
        });
    } 

    return (
        <ImageBackground 
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{width:274,height:368}}

        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')}/>
                <Text style={styles.title}>Seu Marktplace de Coleta De Residúos</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiênte</Text>
            </View>
            <View style={styles.footer}>
            <RNPickerSelect
                style={{viewContainer: styles.input}}
                placeholder={{label: 'Selecione o Estado'}}
                    onValueChange={(value) =>handleselectedUf(value)}
                     items={ufs.map((uf) =>
                        ( { label: uf,
                            key: uf,
                            value: uf  })
                     )}
            />
               <RNPickerSelect
                style={{viewContainer: styles.input}}
                placeholder={{label:'Selecione a Cidade'}}
                    onValueChange={(value) =>handleselectedCity(value)}
                     items={cities.map((city) =>
                       ( { label: city,
                           key: city,
                           value: city })
                    )}
            />
                <RectButton style={styles.button} onPress={handleNavigationPoints} >
                    <View style={styles.button}>
                        <Text style={styles.buttonIcon}>
                            <Icons name="arrow-right" color="#FFF" size={24}></Icons>
                        </Text>
                    </View>
                    <Text style={styles.buttonText}> Entrar</Text>
                </RectButton>

            </View>
        </ImageBackground>
    );
}
export default Home;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding:'5%',
     
    },
    main:{
        flex:1,
        justifyContent: "center",
    },
    title:{
        fontFamily: 'Ubuntu_700Bold',
        width:'90%',
        fontSize:32,
        color:'#322153',
        marginTop: 64

    },
    description:{
        width:'90%',
        fontFamily: 'Roboto_500Medium',
        fontSize:16,
        color:'#6c6C80',
        marginTop: 10
    },
    footer:{
        justifyContent:"flex-end"
    },
    button:{
        flexDirection: "row",
        backgroundColor:"#34cb79",
        borderRadius:8,
        alignItems:"center",
        
    },
    buttonIcon:{
        padding:20,
        backgroundColor:"rgba(0,0,0,0.05)",
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8,
    },
    buttonText:{
        flex:1,
        textAlign:"center",        color: "white",
        fontSize:24,        
    },
    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        justifyContent: "center",
      },


});