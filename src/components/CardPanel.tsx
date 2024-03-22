'use client'
import { useReducer } from "react";
import Card from "./Card";
import Link from "next/link";

export default function CardPanel() {
    const starReducer = (hospitalList:Map<string,number>, action:{star:number, hospitalName:string})=>{
        if(action.star==0){
            hospitalList.delete(action.hospitalName);
        } else {
            hospitalList.set(action.hospitalName,action.star);
        }
        return new Map(hospitalList);
    }

    const initSate = new Map<string,number>([["Chulalongkorn Hospital",5],["Rajavithi Hospital",5],["Thammasat University Hospital",5]])
    const [hospitalList, dispatchStar] = useReducer(starReducer, initSate);

    /**
     * Mock Data for Demonstration Only
     */
    const mockHospitalRepo = [{hid:"001",name:'Chulalongkorn Hospital', img:'/img/chula.jpg'}, 
                        {hid:"002",name:'Rajavithi Hospital', img:'/img/rajavithi.jpg'},
                        {hid:"003",name:'Thammasat University Hospital', img:'/img/thammasat.jpg'}]

    return(
        <div>
            <div className='m-[20px] flex flex-row justify-around flex-wrap'>
                {
                    mockHospitalRepo.map((hospital)=>(
                        <Link href={`/hospital/${hospital.hid}`} className="w-1/5">
                            <Card hospitalName={hospital.name} imgSrc={hospital.img} 
                            onRating={(newValue:number)=>dispatchStar({star:newValue,hospitalName:hospital.name})}/>
                        </Link>
                    ))
                }
            </div>
            <div className="text-center m-3 p-3 text-yellow-100 bg-cyan-700 rounded-md">
                {Array.from(hospitalList).map((hospital) => <div key={hospital[0]} data-testid={hospital[0]} onClick={()=>{dispatchStar({star:0, hospitalName:hospital[0]})}}>
                    {hospital[0]} : {hospital[1]}
                </div>)}
            </div>
        </div>
        
    );
}