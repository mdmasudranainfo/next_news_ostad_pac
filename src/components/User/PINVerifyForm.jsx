"use client"
import {useState} from "react";
import {ErrorToast, IsEmpty, SuccessToast} from "@/utility/FormHelper";
import SubmitButton from "@/components/SubmitButton";
import {useRouter} from "next/navigation";

const PINVerifyForm = () => {

    const [data, setData] = useState({email:sessionStorage.getItem('email'),otp:""});
    const [submit, setSubmit] = useState(false);
    const router=useRouter();
    const inputOnChange = (name,value) => {
        setData((data)=>({
            ...data,
            [name]:value
        }))
    }

    const formSubmit = async (e) => {
      e.preventDefault();
      if(IsEmpty(data.otp)){
          ErrorToast("Valid PIN Code Required")
      }
      else{
          setSubmit(true);
          const options = {
              method: 'POST',
              headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
              body: JSON.stringify(data)
          }

          let res=await fetch("/api/user/recover/verifyOTP",options);
          let ResJson=await res.json();

          setSubmit(false);

          if(ResJson['status']==="success"){
              SuccessToast("Verification Success");
              sessionStorage.setItem('otp',data.otp);
              router.push("/user/resetPassword")
          }
          else{
              ErrorToast("Request Fail")
          }

      }
    }

    return (
       <div className="row h-100 justify-content-center center-screen">
           <div className="col-md-4 col-lg-4 col-sm-12 col-12 ">
               <form onSubmit={formSubmit} className="card animated fadeIn p-5 gradient-bg">
                   <h5 className="mb-3">Verification PIN</h5>
                   <label className="form-label">6 Digit Code</label>
                   <input onChange={(e)=>{inputOnChange("otp",e.target.value)}} type="text" className="form-control mb-2"/>
                   <SubmitButton className="btn btn-danger mt-3" submit={submit} text="Verify"/>
               </form>
           </div>
       </div>
    );
};
export default PINVerifyForm;