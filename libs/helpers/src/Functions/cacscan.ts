import { Prisma } from '.prisma/client';
  import { Field, InputType } from '@nestjs/graphql';
import { LoneAnonymousOperationRule } from 'graphql';
import { first } from 'rxjs';
import { isNumberObject } from 'util/types';



const rawScan = "";
const newScan = "M1F4N00O01IIDECSBrandon             DDerullo                   B464US AF00AMN   ME47BCHLBDJJTOTQNU";
const oldScan = "N03R6HLS1F4N00OBrandon             Derullo                   B464AF00AMN   ME02BBFEBCHL6D";


//returns the first character of the input string to allow the export method to run the correct export code
function getCACType(rawScan)
{
    return(
        rawScan.substring(0,1)
    )
}
//Functions to extract information from the raw scans of new CAC formats
function convertNewRawDoDID()
{
    const rawDoDID = newScan.substring(1,8);
    console.log(newScan.substring(1,8));
    alert(newScan.substring(1,8));
    return parseInt(rawDoDID,32).toString(10);
}

function convertNewFirstName()
{
    const firstName = newScan.substring(16,36);
    return firstName.trim()
}
function convertNewLastName()
{
    const lastName = newScan.substring(37,63);
    return lastName.trim()
}

function convertNewMiddleInitial()
{
    const middleInitial = newScan.substring(36,37);
    return middleInitial
}

function convertNewRawDoB()
{
    const str = parseInt(newScan.substring(63,67),32).toString(10)
    console.log(newScan.substring(63,67));
    const newDoB = new Date(1000,1,1);
    newDoB.setDate(newDoB.getDate() + +str);
    console.log(newDoB.toString());
    return newDoB
}

//Functions to extract information from the raw scan data of old CAC formats
function convertOldRawDoDID()
{
    const rawDoDID = oldScan.substring(9,7);
    return parseInt(rawDoDID,32).toString(10);
}

function convertOldFirstName()
{
    const firstName = oldScan.substring(15,35);
    return firstName.trim()
}

function convertOldLastName()
{
    const lastName = oldScan.substring(35,50);
    return lastName.trim()
}

function convertOldMiddleInitial()
{
    const middleInitial = oldScan.substring(88,89);
    return middleInitial
}

function convertOldRawDoB()
{
    const str = parseInt(oldScan.substring(62,66),32).toString(10)
    console.log(str);
    const newDoB = new Date(1000,1,1);
    newDoB.setDate(newDoB.getDate() + +str);
    console.log(newDoB.toString());
    return newDoB
}
function convertOldRawSSN()
{
    const rawSSN = parseInt(oldScan.substring(1,7),32).toString(10);

    console.log(rawSSN);
    return rawSSN
}
//Exports the converted and trimmed strings of data, with room for further different versions of CAC input
export function getdata(scanData)
{
    const cacType = getCACType(scanData)
    if (cacType == "M"){
        console.log(scanData);
    return {
        rawSSN: "",
        assignedDoDID: convertNewRawDoDID(),
        firstName: convertNewFirstName(),
        lastName: convertNewLastName(),
        middleInitial: convertNewMiddleInitial(),
        rawDoB: convertNewRawDoB(),

    };
    }
    else if (cacType == "N"){
        console.log(scanData);
    return{
        rawSSN: convertOldRawSSN(),
        assignedDoDID: convertOldRawDoDID(),
        firstName: convertOldFirstName(),
        lastName: convertOldLastName(),
        middleInitial: convertOldMiddleInitial(),
        rawDoB: convertOldRawDoB(),
    }
    }
    else{
        return{}
    }
    
}

