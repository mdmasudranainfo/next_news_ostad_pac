"use client"

import React, {useEffect, useState} from 'react';
import SubmitButton from "@/components/SubmitButton";
import Cookies from "js-cookie";
import Link from "next/link";
import {ErrorToast, IsEmpty, SuccessToast} from "@/utility/FormHelper";
import {useRouter} from "next/navigation";

const CommentForm = (props) => {
    let [data, setData] = useState({postID:parseInt(props.postID),descriptions:""});
    let [login,SetLogin]=useState(false);
    const router=useRouter();

    const [submit, setSubmit] = useState(false);
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }

    useEffect(() => {
        if(Cookies.get('token')){
            SetLogin(true);
        }
        else {
            SetLogin(false);
        }
    }, []);



    const formSubmit = async (e) => {
        e.preventDefault();
        if(IsEmpty(data.descriptions)){
            ErrorToast("Comments Description Required !")
        }
        else{
            setSubmit(true);
            const options = {
                method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }

            let res=await fetch("/api/comments/manage",options);
            let ResJson=await res.json();

            setSubmit(false);

            if(ResJson['status']==="success"){
                SuccessToast("Request Success");
                router.refresh();
            }
            else{
                ErrorToast("Request Fail")
            }

        }
    }


    return (
        <div className="container">
           <div className="row">
               <div className="col-12 p-4">
                   <h5 className="mb-3">Write Yours</h5>
                   <textarea rows={6} onChange={(e)=>{inputOnChange("descriptions",e.target.value)}}  className="form-control mb-2"/>
                   {login? <SubmitButton className="btn btn-danger mt-3" onClick={formSubmit} submit={submit} text="Submit"/>:<Link className="btn btn-outline-danger"  href="/user/login">Please Login First</Link>}
               </div>
           </div>
        </div>
    );
};
export default CommentForm;