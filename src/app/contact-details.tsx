import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, ScrollView } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import { COLORS } from "../constants/colors";
import BackButton from "../components/BackButton";
import { getUser, saveUser } from "../services/storage";
import { useLoading } from "../components/LoadingOverlay";

const countries = [
 { name:"Nigeria", code:"+234", flag:"🇳🇬" },
 { name:"Afghanistan", code:"+93", flag:"🇦🇫" },
 { name:"Albania", code:"+355", flag:"🇦🇱" },
 { name:"Algeria", code:"+213", flag:"🇩🇿" },
 { name:"Andorra", code:"+376", flag:"🇦🇩" },
 { name:"Angola", code:"+244", flag:"🇦🇴" },
 { name:"Argentina", code:"+54", flag:"🇦🇷" },
 { name:"Armenia", code:"+374", flag:"🇦🇲" },
 { name:"Australia", code:"+61", flag:"🇦🇺" },
 { name:"Austria", code:"+43", flag:"🇦🇹" },
 { name:"Azerbaijan", code:"+994", flag:"🇦🇿" },
 { name:"Bahamas", code:"+1", flag:"🇧🇸" },
 { name:"Bahrain", code:"+973", flag:"🇧🇭" },
 { name:"Bangladesh", code:"+880", flag:"🇧🇩" },
 { name:"Barbados", code:"+1", flag:"🇧🇧" },
 { name:"Belarus", code:"+375", flag:"🇧🇾" },
 { name:"Belgium", code:"+32", flag:"🇧🇪" },
 { name:"Belize", code:"+501", flag:"🇧🇿" },
 { name:"Benin", code:"+229", flag:"🇧🇯" },
 { name:"Bhutan", code:"+975", flag:"🇧🇹" },
 { name:"Bolivia", code:"+591", flag:"🇧🇴" },
 { name:"Bosnia and Herzegovina", code:"+387", flag:"🇧🇦" },
 { name:"Botswana", code:"+267", flag:"🇧🇼" },
 { name:"Brazil", code:"+55", flag:"🇧🇷" },
 { name:"Brunei", code:"+673", flag:"🇧🇳" },
 { name:"Bulgaria", code:"+359", flag:"🇧🇬" },
 { name:"Burkina Faso", code:"+226", flag:"🇧🇫" },
 { name:"Burundi", code:"+257", flag:"🇧🇮" },
 { name:"Cambodia", code:"+855", flag:"🇰🇭" },
 { name:"Cameroon", code:"+237", flag:"🇨🇲" },
 { name:"Canada", code:"+1", flag:"🇨🇦" },
 { name:"Cape Verde", code:"+238", flag:"🇨🇻" },
 { name:"Central African Republic", code:"+236", flag:"🇨🇫" },
 { name:"Chad", code:"+235", flag:"🇹🇩" },
 { name:"Chile", code:"+56", flag:"🇨🇱" },
 { name:"China", code:"+86", flag:"🇨🇳" },
 { name:"Colombia", code:"+57", flag:"🇨🇴" },
 { name:"Comoros", code:"+269", flag:"🇰🇲" },
 { name:"Congo", code:"+242", flag:"🇨🇬" },
 { name:"Costa Rica", code:"+506", flag:"🇨🇷" },
 { name:"Cote d'Ivoire", code:"+225", flag:"🇨🇮" },
 { name:"Croatia", code:"+385", flag:"🇭🇷" },
 { name:"Cuba", code:"+53", flag:"🇨🇺" },
 { name:"Cyprus", code:"+357", flag:"🇨🇾" },
 { name:"Czech Republic", code:"+420", flag:"🇨🇿" },
 { name:"Democratic Republic of Congo", code:"+243", flag:"🇨🇩" },
 { name:"Denmark", code:"+45", flag:"🇩🇰" },
 { name:"Djibouti", code:"+253", flag:"🇩🇯" },
 { name:"Dominica", code:"+1", flag:"🇩🇲" },
 { name:"Dominican Republic", code:"+1", flag:"🇩🇴" },
 { name:"Ecuador", code:"+593", flag:"🇪🇨" },
 { name:"Egypt", code:"+20", flag:"🇪🇬" },
 { name:"El Salvador", code:"+503", flag:"🇸🇻" },
 { name:"Equatorial Guinea", code:"+240", flag:"🇬🇶" },
 { name:"Eritrea", code:"+291", flag:"🇪🇷" },
 { name:"Estonia", code:"+372", flag:"🇪🇪" },
 { name:"Eswatini", code:"+268", flag:"🇸🇿" },
 { name:"Ethiopia", code:"+251", flag:"🇪🇹" },
 { name:"Fiji", code:"+679", flag:"🇫🇯" },
 { name:"Finland", code:"+358", flag:"🇫🇮" },
 { name:"France", code:"+33", flag:"🇫🇷" },
 { name:"Gabon", code:"+241", flag:"🇬🇦" },
 { name:"Gambia", code:"+220", flag:"🇬🇲" },
 { name:"Georgia", code:"+995", flag:"🇬🇪" },
 { name:"Germany", code:"+49", flag:"🇩🇪" },
 { name:"Ghana", code:"+233", flag:"🇬🇭" },
 { name:"Greece", code:"+30", flag:"🇬🇷" },
 { name:"Grenada", code:"+1", flag:"🇬🇩" },
 { name:"Guatemala", code:"+502", flag:"🇬🇹" },
 { name:"Guinea", code:"+224", flag:"🇬🇳" },
 { name:"Guinea-Bissau", code:"+245", flag:"🇬🇼" },
 { name:"Guyana", code:"+592", flag:"🇬🇾" },
 { name:"Haiti", code:"+509", flag:"🇭🇹" },
 { name:"Honduras", code:"+504", flag:"🇭🇳" },
 { name:"Hungary", code:"+36", flag:"🇭🇺" },
 { name:"Iceland", code:"+354", flag:"🇮🇸" },
 { name:"India", code:"+91", flag:"🇮🇳" },
 { name:"Indonesia", code:"+62", flag:"🇮🇩" },
 { name:"Iran", code:"+98", flag:"🇮🇷" },
 { name:"Iraq", code:"+964", flag:"🇮🇶" },
 { name:"Ireland", code:"+353", flag:"🇮🇪" },
 { name:"Israel", code:"+972", flag:"🇮🇱" },
 { name:"Italy", code:"+39", flag:"🇮🇹" },
 { name:"Jamaica", code:"+1", flag:"🇯🇲" },
 { name:"Japan", code:"+81", flag:"🇯🇵" },
 { name:"Jordan", code:"+962", flag:"🇯🇴" },
 { name:"Kazakhstan", code:"+7", flag:"🇰🇿" },
 { name:"Kenya", code:"+254", flag:"🇰🇪" },
 { name:"Kiribati", code:"+686", flag:"🇰🇮" },
 { name:"Kuwait", code:"+965", flag:"🇰🇼" },
 { name:"Kyrgyzstan", code:"+996", flag:"🇰🇬" },
 { name:"Laos", code:"+856", flag:"🇱🇦" },
 { name:"Latvia", code:"+371", flag:"🇱🇻" },
 { name:"Lebanon", code:"+961", flag:"🇱🇧" },
 { name:"Lesotho", code:"+266", flag:"🇱🇸" },
 { name:"Liberia", code:"+231", flag:"🇱🇷" },
 { name:"Libya", code:"+218", flag:"🇱🇾" },
 { name:"Liechtenstein", code:"+423", flag:"🇱🇮" },
 { name:"Lithuania", code:"+370", flag:"🇱🇹" },
 { name:"Luxembourg", code:"+352", flag:"🇱🇺" },
 { name:"Madagascar", code:"+261", flag:"🇲🇬" },
 { name:"Malawi", code:"+265", flag:"🇲🇼" },
 { name:"Malaysia", code:"+60", flag:"🇲🇾" },
 { name:"Maldives", code:"+960", flag:"🇲🇻" },
 { name:"Mali", code:"+223", flag:"🇲🇱" },
 { name:"Malta", code:"+356", flag:"🇲🇹" },
 { name:"Marshall Islands", code:"+692", flag:"🇲🇭" },
 { name:"Mauritania", code:"+222", flag:"🇲🇷" },
 { name:"Mauritius", code:"+230", flag:"🇲🇺" },
 { name:"Mexico", code:"+52", flag:"🇲🇽" },
 { name:"Micronesia", code:"+691", flag:"🇫🇲" },
 { name:"Moldova", code:"+373", flag:"🇲🇩" },
 { name:"Monaco", code:"+377", flag:"🇲🇨" },
 { name:"Mongolia", code:"+976", flag:"🇲🇳" },
 { name:"Montenegro", code:"+382", flag:"🇲🇪" },
 { name:"Morocco", code:"+212", flag:"🇲🇦" },
 { name:"Mozambique", code:"+258", flag:"🇲🇿" },
 { name:"Myanmar", code:"+95", flag:"🇲🇲" },
 { name:"Namibia", code:"+264", flag:"🇳🇦" },
 { name:"Nauru", code:"+674", flag:"🇳🇷" },
 { name:"Nepal", code:"+977", flag:"🇳🇵" },
 { name:"Netherlands", code:"+31", flag:"🇳🇱" },
 { name:"New Zealand", code:"+64", flag:"🇳🇿" },
 { name:"Nicaragua", code:"+505", flag:"🇳🇮" },
 { name:"Niger", code:"+227", flag:"🇳🇪" },
 { name:"North Korea", code:"+850", flag:"🇰🇵" },
 { name:"North Macedonia", code:"+389", flag:"🇲🇰" },
 { name:"Norway", code:"+47", flag:"🇳🇴" },
 { name:"Oman", code:"+968", flag:"🇴🇲" },
 { name:"Pakistan", code:"+92", flag:"🇵🇰" },
 { name:"Palau", code:"+680", flag:"🇵🇼" },
 { name:"Palestine", code:"+970", flag:"🇵🇸" },
 { name:"Panama", code:"+507", flag:"🇵🇦" },
 { name:"Papua New Guinea", code:"+675", flag:"🇵🇬" },
 { name:"Paraguay", code:"+595", flag:"🇵🇾" },
 { name:"Peru", code:"+51", flag:"🇵🇪" },
 { name:"Philippines", code:"+63", flag:"🇵🇭" },
 { name:"Poland", code:"+48", flag:"🇵🇱" },
 { name:"Portugal", code:"+351", flag:"🇵🇹" },
 { name:"Qatar", code:"+974", flag:"🇶🇦" },
 { name:"Romania", code:"+40", flag:"🇷🇴" },
 { name:"Russia", code:"+7", flag:"🇷🇺" },
 { name:"Rwanda", code:"+250", flag:"🇷🇼" },
 { name:"Saint Kitts and Nevis", code:"+1", flag:"🇰🇳" },
 { name:"Saint Lucia", code:"+1", flag:"🇱🇨" },
 { name:"Saint Vincent and the Grenadines", code:"+1", flag:"🇻🇨" },
 { name:"Samoa", code:"+685", flag:"🇼🇸" },
 { name:"San Marino", code:"+378", flag:"🇸🇲" },
 { name:"Sao Tome and Principe", code:"+239", flag:"🇸🇹" },
 { name:"Saudi Arabia", code:"+966", flag:"🇸🇦" },
 { name:"Senegal", code:"+221", flag:"🇸🇳" },
 { name:"Serbia", code:"+381", flag:"🇷🇸" },
 { name:"Seychelles", code:"+248", flag:"🇸🇨" },
 { name:"Sierra Leone", code:"+232", flag:"🇸🇱" },
 { name:"Singapore", code:"+65", flag:"🇸🇬" },
 { name:"Slovakia", code:"+421", flag:"🇸🇰" },
 { name:"Slovenia", code:"+386", flag:"🇸🇮" },
 { name:"Solomon Islands", code:"+677", flag:"🇸🇧" },
 { name:"Somalia", code:"+252", flag:"🇸🇴" },
 { name:"South Africa", code:"+27", flag:"🇿🇦" },
 { name:"South Korea", code:"+82", flag:"🇰🇷" },
 { name:"South Sudan", code:"+211", flag:"🇸🇸" },
 { name:"Spain", code:"+34", flag:"🇪🇸" },
 { name:"Sri Lanka", code:"+94", flag:"🇱🇰" },
 { name:"Sudan", code:"+249", flag:"🇸🇩" },
 { name:"Suriname", code:"+597", flag:"🇸🇷" },
 { name:"Sweden", code:"+46", flag:"🇸🇪" },
 { name:"Switzerland", code:"+41", flag:"🇨🇭" },
 { name:"Syria", code:"+963", flag:"🇸🇾" },
 { name:"Taiwan", code:"+886", flag:"🇹🇼" },
 { name:"Tajikistan", code:"+992", flag:"🇹🇯" },
 { name:"Tanzania", code:"+255", flag:"🇹🇿" },
 { name:"Thailand", code:"+66", flag:"🇹🇭" },
 { name:"Timor-Leste", code:"+670", flag:"🇹🇱" },
 { name:"Togo", code:"+228", flag:"🇹🇬" },
 { name:"Tonga", code:"+676", flag:"🇹🇴" },
 { name:"Trinidad and Tobago", code:"+1", flag:"🇹🇹" },
 { name:"Tunisia", code:"+216", flag:"🇹🇳" },
 { name:"Turkey", code:"+90", flag:"🇹🇷" },
 { name:"Turkmenistan", code:"+993", flag:"🇹🇲" },
 { name:"Tuvalu", code:"+688", flag:"🇹🇻" },
 { name:"Uganda", code:"+256", flag:"🇺🇬" },
 { name:"Ukraine", code:"+380", flag:"🇺🇦" },
 { name:"United Arab Emirates", code:"+971", flag:"🇦🇪" },
 { name:"United Kingdom", code:"+44", flag:"🇬🇧" },
 { name:"United States", code:"+1", flag:"🇺🇸" },
 { name:"Uruguay", code:"+598", flag:"🇺🇾" },
 { name:"Uzbekistan", code:"+998", flag:"🇺🇿" },
 { name:"Vanuatu", code:"+678", flag:"🇻🇺" },
 { name:"Vatican City", code:"+39", flag:"🇻🇦" },
 { name:"Venezuela", code:"+58", flag:"🇻🇪" },
 { name:"Vietnam", code:"+84", flag:"🇻🇳" },
 { name:"Yemen", code:"+967", flag:"🇾🇪" },
 { name:"Zambia", code:"+260", flag:"🇿🇲" },
 { name:"Zimbabwe", code:"+263", flag:"🇿🇼" },
];

function splitSavedPhone(contact:string){
 const cleaned = contact.replace(/\s/g, "");
 const detected = countries
  .slice()
  .sort((a,b)=>b.code.length - a.code.length)
  .find((item)=>cleaned.startsWith(item.code));

 if(!detected){
  return { country:countries[0], phone:cleaned.replace(/[^\d]/g, "") };
 }

 return {
  country:detected,
  phone:cleaned.slice(detected.code.length).replace(/[^\d]/g, ""),
 };
}

export default function ContactDetails(){
 const [phone,setPhone] = useState("");
 const [user,setUser] = useState<any>(null);
 const [country,setCountry] = useState(countries[0]);
 const [countryOpen,setCountryOpen] = useState(false);
 const [countrySearch,setCountrySearch] = useState("");
 const { withLoading } = useLoading();

 useEffect(()=>{
  async function load(){
   const saved = await getUser();
   const savedPhone = splitSavedPhone(saved?.contact || "");

   setUser(saved);
   setCountry(savedPhone.country);
   setPhone(savedPhone.phone);
  }

  load();
 },[]);

 async function continueNext(){
  const value = phone.replace(/[^\d]/g, "");

  if(!value){
   Alert.alert("Phone Required", "Enter your phone number.");
   return;
  }

  await withLoading(async()=>{
   await saveUser({
    ...user,
    contact:`${country.code}${value}`,
   });

   router.push("/pin-setup");
  });
 }

 return(
  <View style={styles.container}>
   <BackButton />

   <Text style={styles.title}>Phone Number</Text>
   <Text style={styles.sub}>Add your phone number to secure your NG PASS account.</Text>

   <Text style={styles.label}>Phone Number</Text>
   <View style={styles.phoneRow}>
    <TouchableOpacity style={styles.countryBtn} onPress={()=>setCountryOpen(true)}>
     <Text style={styles.flag}>{country.flag}</Text>
     <Text style={styles.code}>{country.code}</Text>
    </TouchableOpacity>

    <TextInput
     placeholder="8012345678"
     keyboardType="phone-pad"
     style={styles.phoneInput}
     value={phone}
     onChangeText={setPhone}
    />
   </View>

   <TouchableOpacity style={styles.btn} onPress={continueNext}>
    <Text style={styles.btnText}>Continue</Text>
   </TouchableOpacity>

   <Modal visible={countryOpen} transparent animationType="fade">
    <View style={styles.modalBackdrop}>
     <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>Select Country</Text>
      <TextInput
       placeholder="Search country or code"
       style={styles.searchInput}
       value={countrySearch}
       onChangeText={setCountrySearch}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
       {countries.filter((item)=>{
        const term = countrySearch.trim().toLowerCase();
        if(!term) return true;
        return item.name.toLowerCase().includes(term) || item.code.includes(term);
       }).map((item)=>(
        <TouchableOpacity
         key={`${item.name}-${item.code}`}
         style={styles.countryRow}
         onPress={()=>{
          setCountry(item);
          setCountrySearch("");
          setCountryOpen(false);
         }}
        >
         <Text style={styles.countryFlag}>{item.flag}</Text>
         <Text style={styles.countryName}>{item.name}</Text>
         <Text style={styles.countryCode}>{item.code}</Text>
        </TouchableOpacity>
       ))}
      </ScrollView>
     </View>
    </View>
   </Modal>
  </View>
 )
}

const styles = StyleSheet.create({
 container:{ flex:1, paddingHorizontal:28, backgroundColor:"#F7FAF7" },
 title:{ fontSize:30, fontWeight:"900", marginBottom:14 },
 sub:{ color:"#333", fontSize:17, lineHeight:25, marginBottom:34 },
 label:{ fontSize:17, fontWeight:"900", marginBottom:10 },
 phoneRow:{ flexDirection:"row", gap:10 },
 countryBtn:{
  backgroundColor:COLORS.white,
  borderRadius:16,
  paddingHorizontal:14,
  minWidth:112,
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"center",
  gap:8,
 },
 flag:{ fontSize:24 },
 code:{ fontSize:18, fontWeight:"900" },
 phoneInput:{
  flex:1,
  backgroundColor:COLORS.white,
  padding:18,
  borderRadius:16,
  fontSize:18,
 },
 btn:{ backgroundColor:COLORS.black, padding:19, borderRadius:14, marginTop:"auto", marginBottom:34 },
 btnText:{ color:COLORS.white, textAlign:"center", fontWeight:"900", fontSize:18 },
 modalBackdrop:{ flex:1, backgroundColor:"rgba(0,0,0,0.38)", justifyContent:"center", padding:24 },
 modalCard:{ maxHeight:"72%", backgroundColor:COLORS.white, borderRadius:22, padding:18 },
 modalTitle:{ fontSize:22, fontWeight:"900", marginBottom:14 },
 searchInput:{ backgroundColor:"#F4F6F4", borderRadius:14, padding:14, fontSize:16, marginBottom:8 },
 countryRow:{ flexDirection:"row", alignItems:"center", paddingVertical:14, borderBottomWidth:1, borderBottomColor:"#eee" },
 countryFlag:{ fontSize:24, width:42 },
 countryName:{ flex:1, fontSize:16, fontWeight:"700" },
 countryCode:{ fontSize:16, color:COLORS.gray, fontWeight:"900" },
});
