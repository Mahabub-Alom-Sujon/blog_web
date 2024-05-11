import toast from 'react-hot-toast';
let EmailRegx = /\S+@\S+\.\S+/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
class FormHelper {
    IsEmpty(value) {
        return value.length === 0;
    }
    IsMobile(value){
        return MobileRegx.test(value);
    }
    IsEmail(value) {
        return !EmailRegx.test(value);
    }
    ErrorToast(msg) {
        toast.error(msg);
    }
    SuccessToast(msg) {
        toast.success(msg);
    }
    SetEmail(value) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("email", value);
        } else {
            console.error("localStorage is not available.");
        }
    }
    GetEmail() {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem("email");
        } else {
            console.error("localStorage is not available.");
            return null;
        }
    }
    setOTP(OTP) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("OTP",OTP)
        } else {
            console.error("localStorage is not available.");
        }
        localStorage.setItem("OTP",OTP)
    }
    getOTP() {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem("OTP")
        } else {
            console.error("localStorage is not available.");
            return null;
        }
    }
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
}
export const {IsEmpty, IsMobile, IsEmail, ErrorToast, SuccessToast,SetEmail,GetEmail,setOTP,getOTP,getBase64} = new FormHelper();