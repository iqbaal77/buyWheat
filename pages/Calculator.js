// Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Screen to register the user

import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  Switch,
} from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import Mynumberinput from './components/Mynumberinput';
import {Picker} from '@react-native-community/picker';
import {getUniqId} from './utilities/utils';
// Connction to access the pre-populated user_db.db
import firestore from '@react-native-firebase/firestore';

firestore()
  .settings({persistence: true});

// firestore()
//   .collection('Users')
//   .doc('wQOMbaUkEgTD7MF8foBo')
//   .update({
//     name: 'empty',
//   })
//   .then(() => {
//     console.log('User added!');
//   });

const Calculator = ({route}) => {
  const allCountObj = {
    totalKilo: 0,
    perBagWeight: 0,
    remainingWeight: 0,
    totalMun: 0,
    totalKiloOfMn: 0,
    totalAmount: 0,
  };
  const [totalBagCount, setTotalBagCount] = useState(0);
  const [perBag, setPerBag] = useState(0);
  const [totalKilo, setTotalKilo] = useState(0);
  const [perBagWeight, setPerBagWeight] = useState(1);
  const [perBagWeightT, setPerBagWeightT] = useState(1);
  const [remainingWeight, setRemainingWeight] = useState(0);
  const [totalMun, setTotalMun] = useState(0);
  const [totalKiloOfMn, setTotalKiloOfMn] = useState(0);
  const [wheatRate, setWheatRate] = useState(2200);
  const [totalAmount, setTotalAmount] = useState(0);
  const [list, setList] = useState([]);
  const [addDisabled, setAddDisabled] = useState(true);
  const [perBagWeightFlag, setPerBagWeightFlag] = useState(true);
  const [grandTotal, setGrandTotal] = useState(allCountObj);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [wholeRecord, saveWholeRecord] = useState(allCountObj);
  const [selectedItem, setSelectedItem] = useState('');
  const [editFlag, setEditFlag] = useState(false);
  useEffect(() => {
    setPerBag(0);
    setTotalKilo(grandTotal.totalKilo);
    setRemainingWeight((+grandTotal.remainingWeight).toFixed(3));
    setPerBagWeight(grandTotal.perBagWeight || 1);
    const {toMn, toKg} = getManFromKg(grandTotal.remainingWeight);
    setTotalMun(toMn);
    setTotalKiloOfMn(toKg);
    setTotalAmount(grandTotal.totalAmount);
  }, [grandTotal]);
  const userAction = (val) => {
    setAddDisabled(true);
    setPerBagWeightFlag(true);
    if (!perBag) {
      alert('فی توڑا گندم خالی ہے');
      return;
    }
    if (!perBagWeight) {
      alert('Please fill per bag weight');
      return;
    }
    if (!wheatRate) {
      alert('Please fill wheat rate');
      return;
    }
    const obj = {
      id: getUniqId(),
      perBag,
      totalKilo,
      perBagWeight,
      remainingWeight,
      totalMun,
      totalKiloOfMn,
      wheatRate,
      totalAmount,
    };
    if (editFlag) {
      const deleteFlag = val === 'delete';
      let allRecords = list.map((item, index) =>
        deleteFlag
          ? item.id === selectedItem.id
            ? list.splice(index, 1)[0]
            : item
          : Object.assign({}, item, item.id === selectedItem.id ? obj : item),
      );
      allRecords = deleteFlag ? list : allRecords;
      setList(allRecords);
      setEditFlag(false);
      const result = allRecords.reduce((sum, currentVal) => {
        return {
          totalKilo: currentVal.totalKilo + sum.totalKilo,
          perBagWeight: currentVal.perBagWeight + sum.perBagWeight,
          remainingWeight: +currentVal.remainingWeight + +sum.remainingWeight,
          totalMun: currentVal.totalMun + sum.totalMun,
          totalKiloOfMn: +currentVal.totalKiloOfMn + +sum.totalKiloOfMn,
          totalAmount: currentVal.totalAmount + sum.totalAmount,
        };
      });
      setGrandTotal((prev) => ({
        ...prev,
        ...result,
      }));
    } else {
      setList([...list, obj]);
      setGrandTotal((prev) => ({
        ...prev,
        totalKilo: prev.totalKilo + totalKilo,
        perBagWeight: perBagWeight + prev.perBagWeight,
        remainingWeight: +remainingWeight + +prev.remainingWeight,
        totalMun: totalMun + prev.totalMun,
        totalKiloOfMn: +totalKiloOfMn + +prev.totalKiloOfMn,
        totalAmount: totalAmount + prev.totalAmount,
      }));
    }
  };

  const getManFromKg = (KGs) => {
    let totalM = KGs / 40;
    let toMn = parseInt(totalM.toString().split('.')[0]);
    let toKg = (KGs % 40).toFixed(3);
    return {toMn, toKg};
  };
  const totalBagCountFn = (val) => {
    setTotalBagCount(val);
    let bagWeight = perBagWeight;
    if (perBagWeightFlag) {
      bagWeight = perBagWeightT;
      setPerBagWeight(bagWeight);
    }
    let totalWheatKg = val * perBag;
    setTotalKilo(totalWheatKg);
    let remain = (totalWheatKg - bagWeight).toFixed(3);
    setRemainingWeight(remain);
    const {toMn, toKg} = getManFromKg(remain);
    setTotalKiloOfMn(toKg);
    setTotalMun(toMn);
    let makeTotal = (wheatRate / 40) * remain;
    setTotalAmount(makeTotal);
  };
  const perBagFn = (val) => {
    let bagWeight = perBagWeight;
    if (perBagWeightFlag) {
      bagWeight = perBagWeightT;
      setPerBagWeight(bagWeight);
    }
    setAddDisabled(false);
    setPerBag(val);

    let totalWheatKg = isEnabled ? val * totalBagCount : val;
    setTotalKilo(totalWheatKg);
    let remain = (totalWheatKg - bagWeight).toFixed(3);
    setRemainingWeight(remain);
    const {toMn, toKg} = getManFromKg(remain);
    setTotalKiloOfMn(toKg);
    setTotalMun(toMn);
    let makeTotal = (wheatRate / 40) * remain;
    setTotalAmount(makeTotal);
  };
  const perBagWeightFn = (val) => {
    setAddDisabled(false);
    setPerBagWeightFlag(false);
    let setTotalKgs = isEnabled ? perBag * totalBagCount : perBag;
    setTotalKilo(setTotalKgs);
    setPerBagWeight(val);
    setPerBagWeightT(val);
    let remain = (setTotalKgs - val).toFixed(3);
    setRemainingWeight(remain);
    const {toMn, toKg} = getManFromKg(remain);
    setTotalKiloOfMn(toKg);
    setTotalMun(toMn);
    let makeTotal = (wheatRate / 40) * remain;
    setTotalAmount(makeTotal);
  };
  const wheatRateFn = (val) => {
    setAddDisabled(false);
    setWheatRate(val);
    let makeTotal = (val / 40) * remainingWeight;
    setTotalAmount(makeTotal);
  };
  const onDropdownSelect = (selectedVal) => {
    setSelectedItem(selectedVal);
    perBagFn(selectedVal.perBag);
    setEditFlag(true);
  };
  const saveAll = () => {
    const grandTotalObj = {
      totalKilo,
      remainingWeight,
      perBagWeight,
      totalMun,
      totalKiloOfMn,
      totalAmount,
      totalBags: totalBagCount || list.length,
    };
    saveWholeRecord(grandTotalObj);
    firestore()
      .collection('WheatRecords')
      .add({
        userId: route.params.id,
        singleRecords: isEnabled ? {totalBagCount: 'enabled'} : list,
        grandTotalObj,
        createdAt: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        alert('Records added!');
      })
      .catch(() => {
        alert('Records adding failed!');
      });
  };
  const bagCountElement = (
    <>
      <Mytext text="فئ تو ڑاگندم وزن:" />
      <Mynumberinput
        placeholder="یہاں وزن لکہیں"
        value={perBag}
        onChangeText={(pb) => perBagFn(pb)}
        style={{padding: 10}}
      />
    </>
  );
  const btnsElement = (
    <>
      {editFlag ? (
        <>
          <Mybutton
            disabled={addDisabled}
            title="Delete"
            customClick={() => userAction('delete')}
          />
          <Mybutton
            disabled={addDisabled}
            title={'Edit'}
            customClick={userAction}
          />
        </>
      ) : (
        <Mybutton
          disabled={addDisabled}
          title={'Add'}
          customClick={userAction}
        />
      )}
    </>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Picker
                  selectedValue={selectedItem}
                  style={{height: 50, width: 300}}
                  onValueChange={(itemValue, itemIndex) =>
                    onDropdownSelect(itemValue)
                  }>
                  {list?.length ? (
                    list
                      .map((obj, index) => (
                        <Picker.Item
                          key={obj.id}
                          label={`(${
                            index + 1
                          }):- گندم: ${obj.perBag.toString()} توڑا: ${obj.perBagWeight.toString()} باقی: ${obj.remainingWeight.toString()} رقم: ${obj.totalAmount.toString()}`}
                          value={obj}
                          color="#f4511e"
                        />
                      ))
                      .reverse()
                  ) : (
                    <Picker.Item label={'لیسٹ میں کٗچھ نہیں'} value="No Bag" />
                  )}
                </Picker>
                {/*<Text style={{marginTop: 12, fontWeight: 'bold', fontSize: 20}} > {list.length || '0'}</Text>*/}
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f4511e' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  style={{margin: 0, padding: 0}}
                  value={isEnabled}
                />
              </View>
              {btnsElement}
              {isEnabled ? (
                <>
                  <Mytext text="ٹوٹل توڑوں کی تعداد:" />
                  <Mynumberinput
                    placeholder="یہاں ٹوٹل لکہیں"
                    value={totalBagCount}
                    onChangeText={(pbc) => totalBagCountFn(pbc)}
                    style={{padding: 10}}
                  />
                  {bagCountElement}
                </>
              ) : (
                <>{bagCountElement}</>
              )}
              <Mytext text="ٹو ٹل کلو:" />
              <Mytext text={totalKilo} />
              <Mytext text="فی تو ڑا وزن:" />
              <Mynumberinput
                placeholder="Per bag weight"
                value={perBagWeight}
                precision={3}
                step={0.25}
                onChangeText={(pbw) => perBagWeightFn(pbw)}
                style={{padding: 10}}
              />
              <Mytext text="با قی وزن:" />
              <Mytext text={remainingWeight} />
              <Mytext text="ٹوٹل من:" />
              <Mytext
                text={totalMun + ' (Mun)  /  ' + totalKiloOfMn + ' (Kg)'}
                fontSize={50}
              />
              <Mytext text="گندم ریٹ:" />
              <Mynumberinput
                placeholder="Wheat rate"
                value={wheatRate}
                onChangeText={(wr) => wheatRateFn(wr)}
                style={{padding: 10}}
              />
              <Mytext text="ٹوٹل قیمت:" />
              <Mytext text={totalAmount.toFixed(1) + '  -/ Rs'} />

              <Mybutton
                disabled={!route?.params?.id}
                title="Save All"
                customClick={saveAll}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
          حاجی افضل آٹا چکی
        </Text>
        <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
          دیسی فوڈز
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Calculator;
