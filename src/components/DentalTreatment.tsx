import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TextInput, TouchableOpacity, Button, Picker, ScrollView
} from 'react-native';
import { database } from "../storage/Database";
import styles from './Style';
import { v4 as uuid } from 'uuid';
import LinearGradient from 'react-native-linear-gradient';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import { EventTypes } from '../enums/EventTypes';
import radioButtons from './shared/RadioButtons';
import { formatTextDisplay } from './shared/EventFieldDisplay';

export const extraOralExaminationPicker = (value, action, language) => {
    return (
        <Picker
            selectedValue={value}
            onValueChange={value => action(value)}
            style={[styles.picker, { width: 180 }]}
        >
            <Picker.Item value='' label={LocalizedStrings[language].type} />
            <Picker.Item value={LocalizedStrings[language].lymphnodes} label={LocalizedStrings[language].lymphnodes} />
            <Picker.Item value={LocalizedStrings[language].tmj} label={LocalizedStrings[language].tmj} />
            <Picker.Item value={LocalizedStrings[language].swelling} label={LocalizedStrings[language].swelling} />
            <Picker.Item value={LocalizedStrings[language].other} label={LocalizedStrings[language].other} />

        </Picker>
    )
}

export const DentalTreatmentDisplay = (metadataObj, language) => {
  return (
    <View>
      <Text>{LocalizedStrings[language].provider}: {metadataObj.doctor} </Text>
      <Text>{LocalizedStrings[language].previousDentalTreatment}: {formatTextDisplay(metadataObj.previousTreatment, metadataObj.previousTreatmentText, language)} </Text>
      <Text>{LocalizedStrings[language].complaint}: {metadataObj.complaint} </Text>
      <Text>{LocalizedStrings[language].historyOfComplaint}: {metadataObj.historyOfComplaint} </Text>
      <Text>{LocalizedStrings[language].extraOralExamination}: {metadataObj.extraOralExamination} </Text>
      <Text>{LocalizedStrings[language].extraOralExamination}: {formatTextDisplay(metadataObj.extraOralExamination, metadataObj.extraOralExaminationText, language)} </Text>
      <Text>{LocalizedStrings[language].intraOralExamination}: {metadataObj.intraOralExamination} </Text>
      <Text>{LocalizedStrings[language].treatmentPlan}: {metadataObj.treatmentPlan}</Text>
      <Text>{LocalizedStrings[language].treatment}: {metadataObj.treatment}</Text>
      <Text>{LocalizedStrings[language].referralToSpecialist}: {formatTextDisplay(metadataObj.referralToSpecialist, metadataObj.referralToSpecialistText, language)} </Text>
      <Text>{LocalizedStrings[language].followup}: {formatTextDisplay(metadataObj.followup, metadataObj.followupText, language)} </Text>
    </View>
    )
}

const DentalTreatment = (props) => {

    const patientId = props.navigation.getParam('patientId');
    const visitId = props.navigation.getParam('visitId');
    const language = props.navigation.getParam('language', 'en')
    const userName = props.navigation.getParam('userName');


    const [previousTreatment, setPreviousTreatment] = useState(null);
    const [previousTreatmentText, setPreviousTreatmentText] = useState(null);
    const [complaint, setComplaint] = useState(null);
    const [historyOfComplaint, setHistoryOfComplaint] = useState(null);
    const [extraOralExamination, setExtraOralExamination] = useState(null);
    const [extraOralExaminationText, setExtraOralExaminationText] = useState(null);
    const [intraOralExamination, setIntraOralExamination] = useState(null);
    const [treatmentPlan, setTreatmentPlan] = useState(null);
    const [treatment, setTreatment] = useState(null);
    const [referralToSpecialist, setReferralToSpecialist] = useState(null);
    const [referralToSpecialistText, setReferralToSpecialistText] = useState(null);
    const [followup, setFollowup] = useState(null);
    const [followupText, setFollowupText] = useState(null);


    // useEffect(() => {
    //     database.getLatestPatientEventByType(patientId, EventTypes.DentalTreatment).then((response: string) => {
    //         if (response.length > 0) {
    //             const responseObj = JSON.parse(response)
    //             setPreviousTreatment(responseObj.previousTreatment)
    //             setPreviousTreatmentText(responseObj.previousTreatmentText)
    //             setComplaint(responseObj.complaint)
    //             setHistoryOfComplaint(responseObj.historyOfComplaint)
    //             setExtraOralExamination(responseObj.extraOralExamination)
    //             setExtraOralExaminationText(responseObj.extraOralExaminationText)
    //             setIntraOralExamination(responseObj.intraOralExamination)
    //             setTreatmentPlan(responseObj.treatmentPlan)
    //             setTreatment(responseObj.treatment)
    //             setReferralToSpecialist(responseObj.referralToSpecialist)
    //             setReferralToSpecialistText(responseObj.referralToSpecialistText)
    //             setFollowup(responseObj.followup)
    //             setFollowupText(responseObj.followupText)
    //         }
    //     })
    // }, [props])

    const submit = async () => {
        database.addEvent({
            id: uuid(),
            patient_id: patientId,
            visit_id: visitId,
            event_type: EventTypes.DentalTreatmentFull,
            event_metadata: JSON.stringify({
                doctor: userName,
                previousTreatment,
                previousTreatmentText,
                complaint,
                historyOfComplaint,
                extraOralExamination,
                extraOralExaminationText,
                intraOralExamination,
                treatmentPlan,
                treatment,
                referralToSpecialist,
                referralToSpecialistText,
                followup,
                followupText,
            })
        }).then(() => props.navigation.navigate('NewVisit'))
    };

    return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => props.navigation.navigate('NewVisit')}>
            <Text style={styles.text}>{LocalizedStrings[language].back}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].dentalTreatment}</Text>
        </View>

        <View style={styles.responseRow}>
          {radioButtons({ field: previousTreatment, action: setPreviousTreatment, prompt: LocalizedStrings[language].previousDentalTreatment, language })}
        </View>
        {!!previousTreatment ?

          <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
            <TextInput
              placeholder={LocalizedStrings[language].previousDentalTreatment}
              style={styles.inputs}
              onChangeText={(text) => setPreviousTreatmentText(text)}
              value={previousTreatmentText}
            />
          </View> :
          null
        }
        <View style={[styles.responseRow, { paddingBottom: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].complaint}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            style={styles.inputs}
            onChangeText={(text) => setComplaint(text)}
            value={complaint}
          />
        </View>
        <View style={[styles.responseRow, { paddingBottom: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].historyOfComplaint}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            style={styles.inputs}
            onChangeText={(text) => setHistoryOfComplaint(text)}
            value={historyOfComplaint}
          />
        </View>

        <View style={[styles.responseRow, { paddingBottom: 0 }]}>
            <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].extraOralExamination}</Text>
        </View>
        {extraOralExaminationPicker(extraOralExamination, setExtraOralExamination, language)}

        {extraOralExamination == LocalizedStrings[language].other ?
          <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
            <TextInput
              placeholder={LocalizedStrings[language].other}
              style={styles.inputs}
              onChangeText={(text) => setExtraOralExaminationText(text)}
              value={extraOralExaminationText}
            />
          </View> :
          null
        }

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].intraOralExamination}</Text>
            </View>
            <View style={[styles.responseRow, { padding: 0 }]}>
            <TextInput
                style={styles.inputs}
                onChangeText={(text) => setIntraOralExamination(text)}
                value={intraOralExamination}
            />
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].treatmentPlan}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            style={styles.inputs}
            onChangeText={(text) => setTreatmentPlan(text)}
            value={treatmentPlan}
          />
        </View>

        <View style={[styles.responseRow, { paddingVertical: 0 }]}>
          <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].treatment}</Text>
        </View>
        <View style={[styles.responseRow, { padding: 0 }]}>
          <TextInput
            style={styles.inputs}
            onChangeText={(text) => setTreatment(text)}
            value={treatment}
          />
        </View>

        <View style={styles.responseRow}>
          {radioButtons({ field: referralToSpecialist, action: setReferralToSpecialist, prompt: LocalizedStrings[language].referral, language })}
        </View>
        {!!referralToSpecialist ?
          <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
            <TextInput
              style={styles.inputs}
              placeholder={LocalizedStrings[language].referralToSpecialist}
              onChangeText={(text) => setReferralToSpecialistText(text)}
              value={referralToSpecialistText}
            />
          </View> :
          null
        }

        <View style={styles.responseRow}>
          {radioButtons({ field: followup, action: setFollowup, prompt: LocalizedStrings[language].followup, language })}
        </View>
        {!!followup ?
          <View style={[styles.responseRow, { paddingTop: 0, paddingHorizontal: 0 }]}>
            <TextInput
              style={styles.inputs}
              placeholder={LocalizedStrings[language].followup}
              onChangeText={(text) => setFollowupText(text)}
              value={followupText}
            />
          </View> :
          null
        }

        <View style={{ alignItems: 'center' }}>
          <Button
            title={LocalizedStrings[language].save}
            color={'#F77824'}
            onPress={() => submit()} />
        </View>
      </LinearGradient>
    </ScrollView>
    );
};

export default DentalTreatment;
