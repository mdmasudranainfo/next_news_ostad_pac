"use client"
import {useState} from "react";
import {ErrorToast, IsEmpty, SuccessToast} from "@/utility/FormHelper";
import SubmitButton from "@/components/SubmitButton";
import {useRouter} from "next/navigation";
const SetPasswordForm = () => {
    const [data, setData] = useState({password:"",c_password:"",email:sessionStorage.getItem("email"),otp:sessionStorage.getItem("otp")});
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
      if(IsEmpty(data.password)){
          ErrorToast("Password Required")
      }
      else if(IsEmpty(data.c_password)){
          ErrorToast("Confirm Password Required")
      }
      else if(data.c_password!==data.password){
          ErrorToast("Password & Confirm Password Should be Same")
      }
      else{
          setSubmit(true);
          const options = {
              method: 'POST',
              headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
              body: JSON.stringify(data)
          }

          let res=await fetch("/api/user/recover/resetPassword",options);
          let ResJson=await res.json();

          setSubmit(false);

          if(ResJson['status']==="success"){
              SuccessToast("Request Success");
              sessionStorage.clear();
              router.push("/user/login")
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

                   <h5 className="mb-3">Set Password</h5>
                   <label className="form-label">Password</label>
                   <input value={data.password} onChange={(e)=>{inputOnChange("password",e.target.value)}} type="password" className="form-control mb-2"/>

                   <label className="form-label">Confirm Password</label>
                   <input value={data.c_password} onChange={(e)=>{inputOnChange("c_password",e.target.value)}} type="password" className="form-control mb-1"/>

                   <SubmitButton className="btn btn-danger mt-3" submit={submit} text="Confirm"/>

               </form>
           </div>
       </div>
    );
};
export default SetPasswordForm;