import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Dimensions, Pressable  } from "react-native";
import { aimagDB, db } from "@/app/database/aimag";
import { aimagImages } from "@/app/database/zurag";
import {Image} from "expo-image";
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, Link, useRouter } from "expo-router";

export default function App() {

  const router = useRouter();
  const [aimags, setAimags] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
   const [aimagwiki, setAimagwiki] = useState("");
   const [aimagname, setAimagname] = useState("");

  useEffect(() => {
    aimagDB();
    const rows = getAimags();
    setAimags(rows);
    

  }, []);



  const getAimags = () => {
    return db.getAllSync("SELECT * FROM aimag WHERE agone=1");
  };

      const handleOpenModal = (wiki, aname) => {
      setModalVisible(true);
      setAimagwiki(wiki);
      setAimagname(aname);
      console.log(aimags);
    };


    const handleCloseModal = () => {
      setModalVisible(false);
    };


  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Аймгийн жагсаалт
      </Text>

      <Pressable onPress = {()=>  router.navigate('/aimagochih/page')}>

       <Image   style={styles.aymag}
        source={ require('@/assets/zurag/gazriinzurag1050x510.png')}  
      />

       {/* Аймгийн зургууд давхарласан байрлалтай */}

       {aimags.map((itemaimag, i) => (
  <Image
    key={i}                                      // 🔥 LIST-ИЙН KEY
    source={aimagImages[itemaimag.aimags]}            // зураг Index-ээр авна
    style={styles.aymag}
  />
))}

      
</Pressable>
      <FlatList
        data={aimags}
        keyExtractor={(item) => item.aid.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity  onPress={() => handleOpenModal(item.awiki, item.aname)}>
          <View
            style={{
              padding: 12,
              backgroundColor: "#eee",
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.aname}
            </Text>
            <Text>{item.awiki}</Text>
          </View>
          </TouchableOpacity>
        )}
      />

         <Modal
      animationType="slide" // or "fade", "none"
      transparent={true} // Set to true for an overlay effect
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)} // For Android back button
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{aimagname}</Text>

            <WebView style={{width:Dimensions.get('window').width - 50, height:350}}
      
      source={{ uri: aimagwiki }} // Replace with your target website
    />
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => handleCloseModal()}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>

          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </View>
  );
}


    const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
  
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        width: Dimensions.get('window').width - 30,
        height:  Dimensions.get('window').height - 100,

        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },

      imageBox:{
    position: "absolute", // газрын зураг дээр давхарлана
    top: Math.random() * 400,   // AI байрлалын жишээ (Хожим точк тавьж болно)
    left: Math.random() * 250,
    alignItems:"center"
  },
  aymag:{
     width: '100%', aspectRatio: 2 

  },
  text:{
    backgroundColor:"rgba(0,0,0,0.4)",
    color:"#fff",
    fontSize:12,
    paddingHorizontal:5,
    borderRadius:4,
    marginTop:2
  }
    });